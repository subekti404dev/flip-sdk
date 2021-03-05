const {
  LoginService,
  AccountService,
  BreakService,
  DigitalProductTransferService,
  ForwardTransferService,
  InquiryService,
  TransactionService,
  UserService,
  WithdrawalService
} = require('./services');
const { banks } = require('./constants/bank')

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
    const loginService = new LoginService();
    const data = await loginService.login(email, password);
    this.updateAccessToken(data.token);
    return data;
  }

  async refreshToken() {
    const loginService = new LoginService();
    const data = await loginService.refreshToken(this._accessToken);
    this.updateAccessToken(data.token);
    return data;
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
}

module.exports = {
  FlipSDK
}