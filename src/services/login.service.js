const { Http } = require('../utils/http');
const config = require('../../config.json');
const { credential } = require('../utils/credential');

class LoginService {
  static _http = new Http();

  static async login(email, password) {
    const data = await this._http.post('v2/user/login', {
      via: 'email',
      platform: 'android',
      version: config.appVersion,
      otp: null,
      device_id: null,
      email,
      password
    });
    if (data && data.token) {
      credential.token = { accessToken: data.token }
    }
    return data;
  }

  static async refreshToken() {
    if (!credential.accessToken) throw new Error("Please login first");
    const headers = { 'Authorization': `Bearer ${credential.accessToken}` };
    const data = await this._http.put('v2/user/generate-new-token', {
      platform: "android",
      version: config.appVersion,
      device_id: null
    }, { headers })
    return data;
  }
}

module.exports = { LoginService }