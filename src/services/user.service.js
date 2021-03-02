const { HttpAuth } = require('../utils/http-auth');

class UserService {
  static _http = new HttpAuth();

  static async getInfo() {
    const data = await this._http.get('v1/user/info');
    return data;
  }

  static async sendOTP() {
    const data = await this._http.post('v2/user/send-otp', { channel: 'via-wa-by-service' });
    return data;
  }

  static async createPIN(pin, otp) {
    const data = await this._http.post('v2/user/create-pin', { pin, token: otp });
    return data;
  }

}

module.exports = { UserService }