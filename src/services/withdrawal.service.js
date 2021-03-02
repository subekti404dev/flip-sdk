const { HttpAuth } = require('../utils/http-auth');

class WithdrawalService {
  static _http = new HttpAuth();
  static async listAccount() {
    const data = await this._http.get('v2/withdrawal-beneficiary-accounts');
    return data;
  }
  static async addAccount(id, bank, account_number, account_holder) {
    const payload = {
      account_holder,
      account_number,
      bank,
      id
    }
    const data = await this._http.post('v2/withdrawal-beneficiary-accounts', payload);
    return data;
  }
  static async transfer(pin, account_number, beneficiary_name, beneficiary_bank, amount) {
    const payload = {
      pin,
      account_number,
      beneficiary_name,
      beneficiary_bank,
      amount
    }
    const data = await this._http.post('v2/withdrawal-transfers', payload);
    return data;
  }
  static async detail(id) {
    if (typeof(id) === 'string') {
      id = id.replace("W", "");
    }
    return await this._http.get(`v2/withdrawal-transfers/${id}`);
  }
}

module.exports = { WithdrawalService }