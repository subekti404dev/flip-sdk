const _ = require("lodash");
const axios = require("axios");
const config = require("../../config.json");
const { credential } = require("./credential");
const { Http } = require('./http');
const { LoginService } = require('../services/login.service')

class HttpAuth extends Http {

  constructor(baseURL = config.baseUrl) {
    super(baseURL);
    this._axios.interceptors.request.use((request) => {
      if (credential.accessToken && !request['headers']['Authorization']) {
        request['headers']['Authorization'] = `Bearer ${credential.accessToken}`;
      }
      return request;
    })

    this._axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (_.get(error, "response.status") === 401 || !credential.accessToken) {
          try {
            const { token } = await LoginService.refreshToken();
            credential.token = { accessToken: token }
            error.config["headers"]["Authorization"] = `Bearer ${token}`;
            return this._axios.request(error.config);
          } catch (error) {
            return Promise.reject("Relogin Failed :(");
          }
        }

        return Promise.reject(error);
      }
    );
  }

}

module.exports = { HttpAuth };
