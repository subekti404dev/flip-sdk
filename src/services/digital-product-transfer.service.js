const { HttpAuth } = require('../utils/http-auth');
const _ = require("lodash");

class DigitalProductTransferService {
  _http;
  constructor(accessToken) {
    this._http = new HttpAuth({ accessToken });
  }

  async getWalletProducts() {
    try {
      const result = await this._http.get('v2/digital-products?product_type=5');
      return result.products;
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
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

  async buy(
    flip_product_id,
    account_number,
    pin,
    price = null,
  ) {
    try {
      if (!price) {
        price = await this.getMinimumPrice(flip_product_id);
      }
      const payload = {
        flip_product_id,
        account_number,
        price,
        pin
      }
      const FTData = await this._http.post('v2/digital-product-transfers', payload);
      return FTData;
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
  }

  async transfer(
    sender_bank,
    flip_product_id,
    account_number,
    price = null
  ) {
    try {
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
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }

  }

  async detail(id) {
    try {
      if (typeof (id) === 'string') {
        id = id.replace("FT", "");
      }
      return await this._http.get(`v2/digital-product-transfers/${id}`);
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

  async confirm(id) {
    try {
      if (typeof (id) === 'string') {
        id = id.replace("FT", "");
      }
      return this._http.put(`v2/digital-product-transfers/${id}/confirm`)
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
  }

  async cancel(id) {
    try {
      if (typeof (id) === 'string') {
        id = id.replace("FT", "");
      }
      return this._http.put(`v2/digital-product-transfers/${id}/cancel`)
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
  }
}

module.exports = { DigitalProductTransferService }