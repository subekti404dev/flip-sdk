const { HttpAuth } = require('../utils/http-auth');

class BreakService {
  static _http = new HttpAuth();

  static async isBreak() {
    const data = await this._http.get('v1/site/is-istirahat');
    return data;
  }


}

module.exports = { BreakService }