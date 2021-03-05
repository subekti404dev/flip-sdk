const { AccountService } = require('./account.service')
const { BreakService } = require('./break.service')
const { DigitalProductTransferService } = require('./digital-product-transfer.service')
const { ForwardTransferService } = require('./forward-transfer.service')
const { InquiryService } = require('./inquiry.service')
const { LoginService } = require('./login.service')
const { TransactionService } = require('./transaction.service')
const { UserService } = require('./user.service')
const { WithdrawalService } = require('./withdrawal.service')

module.exports = {
  AccountService,
  BreakService,
  DigitalProductTransferService,
  ForwardTransferService,
  InquiryService,
  LoginService,
  TransactionService,
  UserService,
  WithdrawalService
}