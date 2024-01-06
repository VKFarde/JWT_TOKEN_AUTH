const crypto = require("crypto");
const genkey = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex")
    .slice(0, len);
};
const key = genkey(64);
module.exports = key;
