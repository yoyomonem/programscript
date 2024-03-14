import { evaluate } from "./runtime/interpreter.ts";
import Parser from "./frontend/parser.ts";
import chalk from "npm:chalk@latest";

repl();

function repl() {
    const parser = new Parser();
    console.log(chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
    console.log(chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
    console.log(chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
    console.log(chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
    console.log(chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
    console.log(chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
    console.log(chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
    console.log(chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
    console.log(`${chalk.yellow("^^^^^^^^")}~??????77~${chalk.yellow("^^^^^^^^^")}~7?JJ?7~${chalk.yellow("^^^^^")}`);
    console.log(`${chalk.yellow("^^^^^^^^")}?@@@@@@@@@#P7${chalk.yellow("^^^^")}~5&@@@@@@&P~${chalk.yellow("^^^")}`);
    console.log(`${chalk.yellow("^^^^^^^^")}?@@@B?JYP#@@@P${chalk.yellow("^^^")}P@@@57?Y#BY~${chalk.yellow("^^^")}`);
    console.log(`${chalk.yellow("^^^^^^^^")}?@@@P${chalk.yellow(":^::^")}G@@@Y${chalk.yellow("^^")}B@@@Y~${chalk.yellow("^:^^:^^^^")}`);
    console.log(`${chalk.yellow("^^^^^^^^")}?@@@P${chalk.yellow(":^^^:")}5@@@5${chalk.yellow(":^")}7#@@@&BPJ!${chalk.yellow("^^^^^")}`);
    console.log(`${chalk.yellow("^^^^^^^^")}?@@@P${chalk.yellow("^^")}~!J&@@&7${chalk.yellow("^^^^")}?P#&@@@@BJ${chalk.yellow("^^^")}`);
    console.log(`${chalk.yellow("^^^^^^^^")}?@@@&BBBG5J!${chalk.yellow("^^^^")}!JGP!${chalk.yellow("^^::")}J@@@G${chalk.yellow("^^")}`);
    console.log(`${chalk.yellow("^^^^^^^^")}?@@@P${chalk.yellow(":^^^:^^^^^^")}J&@@@#GG#@@@&7${chalk.yellow("^^")}`);
    console.log(`${chalk.yellow("^^^^^^^^")}?###5${chalk.yellow("^^^^^^^^^^^^")}~JPB#&&&BGJ~${chalk.yellow("^^^")}`);
    console.log(`${chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^:^^^")}~~~${chalk.yellow("^^:^^^^")}`);
    console.log(chalk.yellow("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
    console.log(chalk.bold("ProgramScript"));
    console.log("REPL v0.1")
    console.log(`enter "exit" (you can also enter "exit()" for it to look like a function call) or press Ctrl+C to close the REPL terminal`);
    console.log(chalk.bold("it's recommended to use exit to close the REPL terminal so you can see the REPL saying \"have a nice day\"!"));
    while (true) {
        const src = prompt(">");
        if (src == "exit" || src == "exit()" || src == "stop" || src == "ProgramScript.respondTo(\"stop everything!\")") {
            console.log("Exited ProgramScript REPL. Have a nice day!");
            console.log(chalk.green("ProgramScript exited with code 0"));
            Deno.exit(0);
        }
        const program = parser.produceAST(src as string);
        console.log(program);
        const result = evaluate(program);
        console.log(result);
        console.log("------\n");
    }
}
