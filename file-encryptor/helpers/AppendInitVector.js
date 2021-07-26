const { Transform } = require("stream");

class AppendInitVector extends Transform {
  constructor(initVector, opts) {
    super(opts);
    this.initVector = initVector;
    this.append = false;
  }

  _transform(chunk, encoding, cb) {
    if (!this.appended) {
      this.push(this.initVect);
      this.appended = true;
    }
    this.push(chunk);
    cb();
  }
}

module.exports = AppendInitVector;