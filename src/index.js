require('dotenv').config();

const { AccountService } = require('./services/account.service')
const { LoginService } = require('./services/login.service')
const { UserService } = require('./services/user.service')
const { TransactionService } = require('./services/transaction.service')
const { InquiryService } = require('./services/inquiry.service')
const { ForwardTransferService } = require('./services/forward-transfer.service')
const { BreakService } = require('./services/break.service')
const { WithdrawalService } = require('./services/withdrawal.service')
const { DigitalProductTransferService } = require('./services/digital-product-transfer.service')

// LoginService.login(process.env.EMAIL, process.env.PASSWORD).then(console.log).catch(console.log)
// LoginService.refreshToken().then(console.log).catch(console.log)
// UserService.getInfo().then(console.log).catch(console.log)
// AccountService.getContacts().then(console.log).catch(console.log)
// TransactionService.getTransactions(1, 3).then((data) => {console.log(data)}).catch(console.log)

async function main() {
  // const result = await DigitalProductTransferService.transfer(
  //   'bca', 'ovo_20', '087722171686'
  // )
  const result = await DigitalProductTransferService.getWalletProducts()
  return result
  // const isBreak = await BreakService.isBreak();
  // console.log({isBreak});
  // return isBreak
  // const recipient = {
  //   bank: 'cimb',
  //   accountNumber: '8099087722171686'
  // };
  // const amount = 10000;
  // const remark = 'Imanuel Urip Subek';
  // const data = await InquiryService.inquiryAndValidate(
  //   recipient.bank,
  //   recipient.accountNumber,
  //   amount,
  //   remark
  // );
  // return data;
  // const { inquiryData, validateData } = data;
  // if (inquiryData.status === 'SUCCESS' && validateData.validation_result) {
  //   // console.log('OK')
  //   const { name } = inquiryData;
  //   const transferData = await ForwardTransferService.transfer(
  //     recipient.accountNumber,
  //     name,
  //     recipient.bank,
  //     amount,
  //     remark,
  //     'bca'
  //   )
  //   return transferData;
  // } else {
  //   throw new Error('Something wrong !!');
  // }

}

main().then(console.log).catch(console.log);