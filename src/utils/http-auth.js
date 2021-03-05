const _ = require("lodash");
const config = require("../../config.json");
const { Http } = require('./http');

class HttpAuth extends Http {
  constructor(options = {}) {
    const baseURL = options.baseURL || config.baseUrl;
    const accessToken = options.accessToken || config.accessToken;
    super(baseURL);

    this._axios.interceptors.request.use((request) => {
      if (accessToken && !request['headers']['Authorization']) {
        request['headers']['Authorization'] = `Bearer ${accessToken}`;
      }
      return request;
    });
  }
}

module.exports = { HttpAuth };
