const fs         = require("fs");
const path       = require("path");
const crypto     = require("crypto");
const { nanoid } = require("nanoid");
const chalk      = require("chalk");

const getCipherKey     = require("../helpers/getCipherKey");
const AppendInitVector = require("../helpers/AppendInitVector");

const ENC_DIR = "data/encrypted/"

function encrypt(file, password) {
  const initVector = crypto.randomBytes(16);

  const CIPHER_KEY       = getCipherKey(password);
  const rs               = fs.createReadStream(file);
  const cipher           = crypto.createCipheriv("aes256", CIPHER_KEY, initVector);
  const appendInitVector = new AppendInitVector(initVector);

  const SAVE_DIR = path.join(ENC_DIR, [path.parse(file).name, nanoid(), "enc"].join("."));

  const ws = fs.createWriteStream(SAVE_DIR);

  rs.pipe(cipher).pipe(appendInitVector).pipe(ws);

  console.log(chalk.green(chalk.bold("SAVED TO")), chalk.bold(SAVE_DIR));
}

module.exports = encrypt;