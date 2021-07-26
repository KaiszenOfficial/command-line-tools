const commander = require("commander");
const pjson = require("./package.json");

const decrypt = require("./utils/decrypt");
const encrypt = require("./utils/encrypt");

commander
  .version(pjson.version)
  .description(pjson.description);

commander
  .option("-t, --type [type]", "Type of action [encrypt, decrypt]", )
  .option("-f, --file <text>", "File name or file path of the file to encrypt/decrypt")
  .option("-p, --password <text>", "Password for encryption")
  .parse();

const { type, file, password } = commander.opts();
console.log(type, file, password);

if (type == "encrypt") {
	encrypt(file, password);
}

if (type == "decrypt") {
  decrypt(file, password)
}
