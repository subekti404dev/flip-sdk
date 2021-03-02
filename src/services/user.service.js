const { HttpAuth } = require('../utils/http-auth');

class UserService {
  static _http = new HttpAuth();

  static async getInfo() {
    const data = await this._http.get('v1/user/info');
    return data;
  }


}

module.exports = { UserService }