const { Http } = require('../utils/http');
const config = require('../../config.json');

class LoginService {
  _http
  constructor() {
    this._http = new Http();
  }

  async login(email, password) {
    const data = await this._http.post('v2/user/login', {
      via: 'email',
      platform: 'android',
      version: config.appVersion,
      otp: null,
      device_id: null,
      email,
      password
    });
    return data;
  }

  async refreshToken(accessToken) {
    if (!accessToken) throw new Error("Please login first");
    const headers = { 'Authorization': `Bearer ${accessToken}` };
    const data = await this._http.put('v2/user/generate-new-token', {
      platform: "android",
      version: config.appVersion,
      device_id: null
    }, { headers })
    return data;
  }
}

module.exports = { LoginService }