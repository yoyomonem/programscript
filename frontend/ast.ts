// deno-lint-ignore-file no-empty-interface

export type NodeType =
    | "Program"
    | "NumericLiteral"
    | "NullLiteral"
    | "Identifier"
    | "BinaryExpression";

export interface Statement {
    type: NodeType;
}

export interface Program extends Statement {
    type: "Program";
    body: Statement[];
}

export interface Expression extends Statement { /* intentionally left blank */ }

export interface BinaryExpression extends Expression {
    kind: "BinaryExpression";
    leftHandSide: Expression;
    rightHandSide: Expression;
    operator: string;
}

export interface Identifier extends Expression {
    kind: "Identifier";
    symbol: string;
}

export interface NumericLiteral extends Expression {
    kind: "NumericLiteral";
    value: number;
}

export interface NullLiteral extends Expression {
    kind: "NullLiteral";
    value: "null";
}
