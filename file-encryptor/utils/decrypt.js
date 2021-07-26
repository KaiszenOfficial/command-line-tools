const crypto     = require("crypto");
const fs         = require("fs");
const { nanoid } = require("nanoid");
const chalk      = require("chalk");

const getCipherKey = require("../helpers/getCipherKey");

const DEC_DIR = "data/decrypted/"

function decrypt(file, password) {
  const rsInitVect = fs.createReadStream(file, { end: 15 });

  let initVector;
  rsInitVect.on("data", (chunk) => {
    initVector = chunk;
  });

  // Once we’ve got the initialization vector, we can decrypt the file.
  rsInitVect.on("close", () => {
    const CIPHER_KEY = getCipherKey(password);
    const rs         = fs.createReadStream(file, { start: 16 });
    const decipher   = crypto.createDecipheriv("aes256", CIPHER_KEY, initVector);

    const SAVE_DIR = path.join(DEC_DIR, [path.parse(file).name, nanoid(), "txt"].join("."));

    const ws = fs.createWriteStream(SAVE_DIR);

    rs.pipe(decipher).pipe(ws);

    console.log(chalk.green(chalk.bold("SAVED TO")), chalk.bold(SAVE_DIR));
  });
}

module.exports = decrypt;
