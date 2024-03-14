// deno-lint-ignore-file no-fallthrough
import { /* type ValueType, */ RuntimeValue, NumberValue, NullValue } from "./values.ts";
import { /* type NodeType, */ Statement, NumericLiteral, BinaryExpression, Program } from "../frontend/ast.ts";
import chalk from "npm:chalk@latest";

function evaluateProgram(program: Program): RuntimeValue {
    let lastEvaluated: RuntimeValue = {
        type: "null",
        value: "null"
    } as NullValue;
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement);
    }
    return lastEvaluated;
}

function evaluateNumericBinaryExpression(leftHandSide: NumberValue, rightHandSide: NumberValue, operator: string): NumberValue {
    let result: number = 0;
    switch (operator) {
        case "+":
            result = leftHandSide.value + rightHandSide.value;
        case "-":
            result = leftHandSide.value - rightHandSide.value;
        case "*":
            result = leftHandSide.value * rightHandSide.value
        case "/":
            // TODO: Check for division by zeros
            result = leftHandSide.value / rightHandSide.value;
        case "%":
            result = leftHandSide.value % rightHandSide.value;
        default:
            console.error(`${chalk.bold(`${chalk.red("ProgramScript Interpreter Error!")}:`)} Unrecognized operator: ${operator}`);
            console.error(chalk.red("ProgramScript exited with code 1"));
    }
    return {
        type: "number",
        value: result
    } as NumberValue;
}

function evaluateBinaryExpression(binaryOperator: BinaryExpression): RuntimeValue {
    const leftHandSide = evaluate(binaryOperator.leftHandSide);
    const rightHandSide = evaluate(binaryOperator.rightHandSide);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        return evaluateNumericBinaryExpression(leftHandSide as NumberValue, rightHandSide as NumberValue, binaryOperator.operator);
    }
    return {
        type: "null",
        value: "null"
    } as NullValue;
}

export function evaluate(astNode: Statement): RuntimeValue {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: ((astNode as NumericLiteral).value),
                type: "number"
            } as NumberValue;
        case "NullLiteral":
            return {
                value: "null",
                type: "null"
            } as NullValue;
        case "BinaryExpression":
            return evaluateBinaryExpression(astNode as BinaryExpression);
        case "Program":
            return evaluateProgram(astNode as Program);
        default:
            console.error(`${chalk.bold(`${chalk.red("ProgramScript Interpreter Error!")}:`)} AST node:\n`, astNode, "\nis not yet set up for interpreting.");
            console.error(chalk.red("ProgramScript exited with code 1"));
            Deno.exit(1);
    }
}
