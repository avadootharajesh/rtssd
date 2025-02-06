// send otp to mobile number
// otp sender to mobile number

const dotenv = require("dotenv");
dotenv.config();
const otpStore = {};

const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const generateOTP = () => {
  try {
    let otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  } catch (error) {
    throw new Error("Failed to generate OTP");
  }
};

const axios = require("axios");
const unirest = require("unirest");
const FAST2SMS_API_KEY = process.env.FAST2SMSAPIKEY;

function SendOtp(phoneNumber, otp) {
  return new Promise((resolve, reject) => {
    const response = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

    // Build the query parameters
    response.query({
      authorization: FAST2SMS_API_KEY, // Use the API key from environment variable
      variables_values: otp,
      route: "otp",
      numbers: phoneNumber,
    });

    // Set request headers
    response.headers({ "cache-control": "no-cache" });

    // Send the request
    response.end(function (res) {
      if (res.error) {
        console.error("Error sending OTP:", res.error); // Log detailed error
        reject(res.error);
      } else {
        console.log("OTP sent successfully:", res.body); // Log success response
        resolve(res.body);
      }
    });
  });
}

const sendOtp = async (req, res) => {
  const { mobileNumber } = req.body;

  const otp = generateOTP();

  otpStore[mobileNumber] = otp;

  try {
    const response = await SendOtp(mobileNumber, otp);
    console.log("response", response);
    res
      .status(200)
      .json({ ok: true, message: "OTP sent successfully", response });
  } catch (error) {
    res.status(400).json({ ok: false, message: "Failed to send OTP" });
  }
};

const verifyOtp = async (req, res) => {
  const { mobileNumber, otp } = req.body;
  if (otpStore[mobileNumber] === Number(otp)) {
    delete otpStore[mobileNumber];
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

module.exports = { sendOtp, verifyOtp };
