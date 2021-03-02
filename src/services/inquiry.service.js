const { HttpAuth } = require('../utils/http-auth');

class InquiryService {
  static _http = new HttpAuth();

  static inquiryAccount(bank, accountNumber) {
    const url = `v2/accounts/inquiry-account-number?bank=${bank}&account_number=${accountNumber}`;
    return this._http.get(url);
  }

  static validate(bank, accountNumber, accountName, amount, remark) {
    const payload = {
      account_number: accountNumber,
      beneficiary_name: accountName,
      beneficiary_bank: bank,
      amount: amount,
      service_type: null,
      remark: remark,
      fee: 0,
    }
    return this._http.post('v2/transactions/validate', payload)
  }

  static async inquiryAndValidate(bank, accountNumber, amount, remark) {
    const inquiryData = await this.inquiryAccount(bank, accountNumber);
    if (inquiryData) {
      const { id, bank, bank_code, account_number, name, account_holder, status } = inquiryData;
      const validateData = await this.validate(bank, accountNumber, name, amount, remark);
      return { inquiryData, validateData }
    }
  }
}

module.exports = { InquiryService }