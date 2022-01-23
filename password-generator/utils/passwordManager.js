const chalk   = require('chalk');
const alpha   = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-+=";

const selectCharacters = (hasNumbers, hasSymbols) => {
  let chars = alpha;
  hasNumbers ? (chars += numbers) : "";
  hasSymbols ? (chars += symbols) : "";

  return chars;
};

exports.generate = (length = 8, hasNumbers, hasSymbols) => {
  console.log(chalk.blue('setting configuration...'));
  const chars = selectCharacters(hasNumbers, hasSymbols);
  console.log(chalk.blue('generating password...'));
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
