const commander = require("commander");
const chalk     = require("chalk");
const pjson     = require("./package.json");

const passwordManager = require("./utils/passwordManager");

commander.version(pjson.version).description(pjson.description);

commander
  .option("-l, --length <number>", "Length of password", "8")
  .option("-nn, --no-numbers", "Remove numbers")
  .option("-ns, --no-symbols", "Remove symbols")
  .parse();

const { length, numbers, symbols } = commander.opts();

const password = passwordManager.generate(length, numbers, symbols);

console.log(chalk.blue('password generated...'));
console.log(chalk.inverse(password));
