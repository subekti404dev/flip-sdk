const { HttpAuth } = require('../utils/http-auth');
const _ = require("lodash");

class DigitalProductTransferService {
  _http;
  constructor(accessToken) {
    this._http = new HttpAuth({accessToken});
  }

  async getWalletProducts() {
    const result = await this._http.get('v2/digital-products?product_type=5');
    return result.products;
  }

  async getMinimumPrice(flip_product_id) {
    try {
      const payload = {
        sender_bank: '',
        flip_product_id,
        account_number: '087722171686',
        price: '0'
      }
      const FTData = await this._http.post('v2/digital-product-transfers', payload);
      return FTData;
    } catch (error) {
      const message = _.get(error, 'errors[0].message');
      if (!message) {
        throw error;
      } else {
        const minimum_price = message.match(/\d+/g);
        if (minimum_price && minimum_price.length > 0) return parseInt(minimum_price[0]);
        throw message;
      }
    }
  }

  async transfer(
    sender_bank,
    flip_product_id,
    account_number,
    price = null
  ) {
    if (!price) {
      price = await this.getMinimumPrice(flip_product_id);
    }
    const payload = {
      sender_bank,
      flip_product_id,
      account_number,
      price
    }
    const FTData = await this._http.post('v2/digital-product-transfers', payload);
    if (FTData && FTData.flip_receiver_bank_code) {
      const flip_receiver_bank = await this.flipBank(FTData.flip_receiver_bank_code);
      FTData.flip_receiver_bank = flip_receiver_bank;
    }
    return FTData;
  }

  async detail(id) {
    if (typeof (id) === 'string') {
      id = id.replace("FT", "");
    }
    return await this._http.get(`v2/digital-product-transfers/${id}`);
  }

  async flipBank(id) {
    return this._http.get(`v1/bank-code/${id}`);
  }

  async confirm(id) {
    if (typeof (id) === 'string') {
      id = id.replace("FT", "");
    }
    return this._http.put(`v2/digital-product-transfers/${id}/confirm`)
  }

  async cancel(id) {
    if (typeof (id) === 'string') {
      id = id.replace("FT", "");
    }
    return this._http.put(`v2/digital-product-transfers/${id}/cancel`)
  }
}

module.exports = { DigitalProductTransferService }