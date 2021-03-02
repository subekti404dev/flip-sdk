const fs = require("fs");
const path = require("path");
const credentialDirPath = path.join(__dirname, "..", "..", ".token");
const credentialFilePath = path.join(credentialDirPath, "flip.json");
const moment = require("moment");

class Credential {
  _accessToken;
  _updatedAt;
  constructor() {
    const data = {
      accessToken: null,
      updatedAt: null
    };
    if (!fs.existsSync(credentialDirPath)) fs.mkdirSync(credentialDirPath);
    if (!fs.existsSync(credentialFilePath))
      fs.writeFileSync(credentialFilePath, JSON.stringify(data, null, 3));
    const json = require(credentialFilePath);
    this._accessToken = json.accessToken;
    this._updatedAt = json.updatedAt;
  }

  get accessToken() {
    return this._accessToken;
  }

  set token(data = {}) {
    if (data.accessToken) this._accessToken = data.accessToken;
    this._updatedAt = moment().format('YYYY/MM/DD HH:mm:ss');
    fs.writeFileSync(
      credentialFilePath,
      JSON.stringify({
        accessToken: this._accessToken,
        updatedAt: this._updatedAt,
      },
        null,
        3));
  }
}

module.exports = {
  credential: new Credential(),
};
