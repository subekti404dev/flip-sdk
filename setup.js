require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Base64 } = require('js-base64');
const { setupService } = require('./src/services/setup.service');
const Device = require('./src/utils/device');
const { question } = require('./src/utils/question');
const { credential } = require('./src/utils/credential');

const tokenPath = './.token';
const deviceFile = path.join(tokenPath, 'device.json');

const setup = async () => {
  try {
    const loginRes = await setupService.login();
    const otp = await question('Masukkan OTP: ');
    const otpRes = await setupService.otp(loginRes.authId, otp);
    const device = new Device();
    const addDeviceRes = await setupService.addDevice(otpRes.authId, device);
    let userId;
    if (addDeviceRes.id_token) {
      const data = JSON.parse(Base64.decode(addDeviceRes.id_token.split('.')[1]));
      if (data['uid']) userId = data['uid'];
    }
    credential.token = {
      userId,
      accessToken: addDeviceRes.access_token,
      refreshToken: addDeviceRes.refresh_token,
      idToken: addDeviceRes.id_token
    }
    if (!fs.existsSync(tokenPath)) fs.mkdirSync(tokenPath);
    fs.writeFileSync(deviceFile, JSON.stringify(device, null, 3));

  } catch (error) {
    console.log(error)
  }
}

setup()
