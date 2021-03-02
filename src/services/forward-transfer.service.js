const { HttpAuth } = require('../utils/http-auth');

class ForwardTransferService {
  static _http = new HttpAuth();

  static async transfer(
    recepientAccountNumber,
    recepientAccountName,
    recepientBank,
    amount,
    remark,
    senderBank
    ) {
    const payload = {
      account_number: recepientAccountNumber,
      beneficiary_name: recepientAccountName,
      beneficiary_bank: recepientBank,
      amount,
      service_type: 7,
      remark,
      fee: 0,
      flip_link: null, 
      sender_bank: senderBank,
    }
    const FTData = await this._http.post('v2/forward-transfers', payload);
    if (FTData && FTData.flip_receiver_bank_code) {
      const flip_receiver_bank = await this.flipBank(FTData.flip_receiver_bank_code);
      FTData.flip_receiver_bank = flip_receiver_bank;
    }
    return FTData;
  }

  static async detail(id) {
    if (typeof(id) == 'string') {
      id = id.replace("FT", "");
    }
    return await this._http.get(`v2/forward-transfers/${id}`);
  }

  static async flipBank(id) {
    return this._http.get(`v1/bank-code/${id}`);
  }

  static async confirm(id) {
    if (typeof(id) == 'string') {
      id = id.replace("FT", "");
    }
    return this._http.put(`v2/forward-transfers/${id}/confirm`)
  }

  static async cancel(id) {
    if (typeof(id) == 'string') {
      id = id.replace("FT", "");
    }
    return this._http.put(`v2/forward-transfers/${id}/cancel`)
  }
}

module.exports = { ForwardTransferService }