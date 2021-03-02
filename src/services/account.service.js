const { HttpAuth } = require('../utils/http-auth');

class AccountService {
  static _http = new HttpAuth();

  static async getContacts() {
    const data = await this._http.get('v2/beneficiary-accounts');
    return data;
  }

  static async deleteContacts(id) {
    let ids = [];
    if (typeof (id) === 'string') ids.push(id);
    if (typeof (id) === 'object' && id.length > 0) ids = id;

    const data = await this._http.put('v2/beneficiary-accounts', {
      beneficiary_account_id_list: ids
    });
    return data;
  }


}

module.exports = { AccountService }