const { HttpAuth } = require('../utils/http-auth');

class BreakService {
  _http;
  constructor(accessToken) {
    this._http = new HttpAuth({accessToken});
  }

  async isBreak() {
    const data = await this._http.get('v1/site/is-istirahat');
    return data;
  }
}

module.exports = { BreakService }