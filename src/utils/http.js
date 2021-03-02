const _ = require("lodash");
const axios = require("axios");
const config = require("../../config.json");
const querystring = require('querystring');

class Http {
  _axios;
  _headers = {
    "api-key": config.apiKey,
    'User-Agent': 'okhttp/3.12.1',
  }
  constructor(baseURL = config.baseUrl) {
    this._axios = axios.create({ baseURL });
  }

  async get(url, _axiosConfig = null) {
    try {
      let axiosConfig = _axiosConfig || {};
      axiosConfig.headers = this._appendHeader(axiosConfig.headers);
      const result = await this._axios.get(url, axiosConfig);
      return result.data;
    } catch (error) {
      this._throwError(error);
    }
  }

  async post(url, data = null, _axiosConfig = null) {
    try {
      let axiosConfig = _axiosConfig || {};
      let payload = null;
      axiosConfig.headers = this._appendHeader(axiosConfig.headers);
      if (data) {
        axiosConfig.headers['Content-Type'] = "application/x-www-form-urlencoded";
        payload = querystring.stringify(data)
      }
      const result = await this._axios.post(url, payload, axiosConfig);
      return result.data;
    } catch (error) {
      this._throwError(error);
    }
  }

  async put(url, data = null, _axiosConfig = null) {
    try {
      let axiosConfig = _axiosConfig || {};
      let payload = null;
      axiosConfig.headers = this._appendHeader(axiosConfig.headers);
      if (data) {
        axiosConfig.headers['Content-Type'] = "application/x-www-form-urlencoded";
        payload = querystring.stringify(data)
      }
      const result = await this._axios.put(url, payload, axiosConfig);
      return result.data;
    } catch (error) {
      this._throwError(error);
    }
  }

  async delete(url, _axiosConfig = null) {
    try {
      let axiosConfig = _axiosConfig || {};
      axiosConfig.headers = this._appendHeader(axiosConfig.headers);
      const result = await this._axios.delete(url, axiosConfig);
      return result.data;
    } catch (error) {
      this._throwError(error);
    }
  }

  _throwError(error) {
    throw (
      _.get(error, "response.data") ||
      _.get(error, "response") ||
      _.get(error, "message") ||
      error
    );
  }

  _appendHeader(headers = {}) {
    return { ...this._headers, ...headers }
  }
}

module.exports = { Http };
