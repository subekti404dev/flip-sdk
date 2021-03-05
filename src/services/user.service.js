const { HttpAuth } = require('../utils/http-auth');

class UserService {
  _http;
  constructor(accessToken) {
    this._http = new HttpAuth({accessToken});
  }

  async getInfo() {
    const data = await this._http.get('v1/user/info');
    return data;
  }

  async sendOTP() {
    const data = await this._http.post('v2/user/send-otp', { channel: 'via-wa-by-service' });
    return data;
  }

  async createPIN(pin, otp) {
    const data = await this._http.post('v2/user/create-pin', { pin, token: otp });
    return data;
  }
}

module.exports = { UserService }