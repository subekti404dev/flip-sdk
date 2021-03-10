const { HttpAuth } = require('../utils/http-auth');
const _ = require("lodash");

class TopupService {
  _http;
  constructor(accessToken) {
    this._http = new HttpAuth({ accessToken });
  }

  async topup(
    amount,
    sender_bank = 'tabungan_pensiunan_nasional',
    remark = null
  ) {
    try {
      const payload = {
        amount,
        sender_bank,
        remark,
      }
      const TopupData = await this._http.post('v2/top-up-transfers', payload);
      if (TopupData && TopupData.flip_receiver_bank_code) {
        const flip_receiver_bank = await this.flipBank(TopupData.flip_receiver_bank_code);
        TopupData.flip_receiver_bank = flip_receiver_bank;
      }
      return TopupData;
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
  }

  async confirm(id) {
    try {
      if (typeof (id) === 'string') {
        id = id.replace("TU", "");
      }
      return this._http.put(`v2/top-up-transfers/${id}/confirm`)
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
  }

  async cancel(id) {
    try {
      if (typeof (id) === 'string') {
        id = id.replace("TU", "");
      }
      return this._http.put(`v2/top-up-transfers/${id}/cancel`)
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
  }

  async flipBank(id) {
    try {
      return this._http.get(`v1/bank-code/${id}`);
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
  }

}

module.exports = { TopupService }