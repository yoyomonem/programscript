// deno-lint-ignore-file no-explicit-any
import {
    Statement,
    Program,
    Expression,
    BinaryExpression,
    Identifier,
    NumericLiteral,
    NullLiteral
} from "./ast.ts";
import { tokenize, Token, TokenType } from "./lexer.ts";
import chalk from "npm:chalk@latest";

export default class Parser {
    private tokens: Token[] = [];

    private notEOF(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }

    private parseStatement(): Statement {
        return this.parseExpression();
    }

    private parseExpression(): Expression {
        return this.parseAdditiveExpression();
    }

    private parseAdditiveExpression(): Expression {
        let leftHandSide = this.parseMultiplicativeExpression();
        while (this.at().value == "+" || this.at().value == "-") {
            const operator = this.eat().value;
            const rightHandSide = this.parseMultiplicativeExpression();
            leftHandSide = {
                kind: "BinaryExpression",
                leftHandSide,
                rightHandSide,
                operator
            } as BinaryExpression;
        }
        return leftHandSide;
    }

    private parseMultiplicativeExpression(): Expression {
        let leftHandSide = this.parsePrimaryExpression();
        while (this.at().value == "*" || this.at().value == "/" || this.at().value == "%") {
            const operator = this.eat().value;
            const rightHandSide = this.parsePrimaryExpression();
            leftHandSide = {
                kind: "BinaryExpression",
                leftHandSide,
                rightHandSide,
                operator
            } as BinaryExpression;
        }
        return leftHandSide;
    }

    private parsePrimaryExpression(): Expression {
        const tk = this.at().type;
        switch (tk) {
            case TokenType.Identifier:
                return {
                    kind: "Identifier",
                    symbol: this.eat().value
                } as Identifier;
            case TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value)
                } as NumericLiteral;
            case TokenType.OpenParenthesis: {
                this.eat();
                const value = this.parseExpression();
                this.expect(
                    TokenType.CloseParenthesis,
                    "Unexpected token found while parsing parenthesized expression, expected closing parenthesis."
                );
                return value;
            }
            case TokenType.Null:
                this.eat();
                return {
                    kind: "NullLiteral",
                    value: "null"
                } as NullLiteral;
            default:
                console.error(`${chalk.bold(`${chalk.red("ProgramScript Parser Error!")}:`)} Unexpected token found by ProgramScript during parsing!:`, this.at());
                console.error(chalk.red("ProgramScript exited with code 1"));
                Deno.exit(1);
        }
    }

    private at() {
        return this.tokens[0] as Token;
    }

    private eat() {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    private expect(type: TokenType, ...error: any[]) {
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type != type) {
            console.error(`${chalk.bold(`${chalk.red("ProgramScript Parser Error!")}:`)}`, ...error, "\nExpected:", type, "\nGot:", prev);
            Deno.exit(1);
        }
        return prev;
    }

    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        const program: Program = {
            type: "Program",
            body: []
        };
        while (this.notEOF()) {
            program.body.push(this.parseStatement());
        }
        return program;
    }
}
