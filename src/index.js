const {
  LoginService,
  AccountService,
  BreakService,
  DigitalProductTransferService,
  ForwardTransferService,
  InquiryService,
  TransactionService,
  UserService,
  WithdrawalService,
  TopupService
} = require('./services');
const { banks } = require('./constants/bank');
const _ = require('lodash');

class FlipSDK {
  _accessToken;
  constructor(options = {}) {
    const { accessToken } = options;
    this._accessToken = accessToken;
  }

  get banks() {
    return banks;
  }

  async updateAccessToken(accessToken) {
    this._accessToken = accessToken;
  }

  async login(email, password) {
    try {
      const loginService = new LoginService();
      const data = await loginService.login(email, password);
      this.updateAccessToken(data.token);
      return data;
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
  }

  async refreshToken() {
    try {
      const loginService = new LoginService();
      const data = await loginService.refreshToken(this._accessToken);
      this.updateAccessToken(data.token);
      return data;
    } catch (error) {
      const errorMessage = _.get(error, 'errors[0].message');
      throw new Error(`Error Flip: ${errorMessage}`);
    }
  }

  get accountService() {
    return new AccountService(this._accessToken);
  }

  get breakService() {
    return new BreakService(this._accessToken);
  }

  get digitalProductTransferService() {
    return new DigitalProductTransferService(this._accessToken);
  }

  get forwardTransferService() {
    return new ForwardTransferService(this._accessToken);
  }

  get inquiryService() {
    return new InquiryService(this._accessToken);
  }

  get transactionService() {
    return new TransactionService(this._accessToken);
  }

  get userService() {
    return new UserService(this._accessToken);
  }

  get WithdrawalService() {
    return new WithdrawalService(this._accessToken);
  }

  get TopupService() {
    return new TopupService(this._accessToken);
  }
}

module.exports = {
  FlipSDK
}