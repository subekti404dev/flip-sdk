const { HttpAuth } = require('../utils/http-auth');

class TransactionService {
  static _http = new HttpAuth();

  static async getTransactions(page = 1, pagination = 20) {
    const arrData = [];
    const data = await this._http.get(`v2/transactions?page=${page}&pagination=${pagination}&include_international_transfer=true`);
    for (const key in data) {
      arrData.push(data[key]);
    }
    return arrData;
  }


}

module.exports = { TransactionService }