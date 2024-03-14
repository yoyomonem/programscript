// let x = 45 + (foo * bar)
// [ LetToken, IdentifierTk, EqualsToken, NumberToken ]

import chalk from "npm:chalk@latest";

export enum TokenType {
    Null,
    Let,
    Identifier,
    Equals,
    Number,
    OpenParenthesis,
    CloseParenthesis,
    BinaryOperator,
    EOF,
}

export interface Token {
    value: string;
    type: TokenType;
}

const RESERVED_KEYWORDS: Record<string, TokenType> = {
    let: TokenType.Let,
    null: TokenType.Null
};

function token(value = "", type: TokenType): Token {
    return {
        value,
        type
    };
}

function isAlphabetic(src: string): boolean {
    return src.toUpperCase() != src.toLowerCase();
}

function isInteger(src: string): boolean {
    const c = src.charCodeAt(0);
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

function isSkippable(src: string) {
    return src == " " || src == "\n" || src == "\t";
}

export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");
    while (src.length > 0) {
        if (src[0] == "(") {
            tokens.push(token(src.shift(), TokenType.OpenParenthesis));
        } else if (src[0] == ")") {
            tokens.push(token(src.shift(), TokenType.CloseParenthesis));
        } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/" || src[0] == "%") {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] == "=") {
            tokens.push(token(src.shift(), TokenType.Equals));
        } else {
            if (isInteger(src[0])) {
                let num = "";
                while (src.length > 0 && isInteger(src[0])) {
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.Number));
            } else if (isAlphabetic(src[0])) {
                let id = "";
                while (src.length > 0 && isAlphabetic(src[0])) {
                    id += src.shift();
                }
                const reservedKeyword = RESERVED_KEYWORDS[id];
                if (typeof reservedKeyword == "undefined") {
                    tokens.push(token(id, TokenType.Identifier));
                } else {
                    tokens.push(token(id, reservedKeyword));
                }
            } else if (isSkippable(src[0])) {
                src.shift();
            } else {
                console.error(`${chalk.bold(`${chalk.red("ProgramScript Error!")}:`)} Unrecognized character: ${src[0]}`);
                console.error(chalk.red("ProgramScript exited with code 1"));
                Deno.exit(1);
            }
        }
    }
    tokens.push(token("EndOfFile", TokenType.EOF));
    return tokens;
}
