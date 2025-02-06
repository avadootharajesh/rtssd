const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();
const { AUTH_MAIL, AUTH_PASS } = process.env;

const { generateOTP } = require("./generateOtp.util");

const otpStorage = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: false,
  host: "smtp.gmail.com",
  auth: {
    user: AUTH_MAIL,
    pass: AUTH_PASS,
  },
  logger: true,
  debug: true,
  connectionTimeout: 60000,
  greetingTimeout: 30000,
});

const mailOptions = (email, otp) => {
  return {
    from: AUTH_MAIL,
    to: email,
    subject: "Email Verification",
    text: `Your verification code is ${otp}`,
  };
}

const sendmail = async (req, res) => {
  const { email } = req.body;
  const code = generateOTP();
  otpStorage[email] = code;

  const mailOptions = mailOptions(email, code);

  try {
    const response = await transporter.sendMail(mailOptions);
    if (response.accepted && response.accepted.length > 0) {
      console.log("Email sent successfully", "Response : ", response);
      res.status(200).json({ status: 200, message: "Email sent successfully" });
    } else {
      console.log("Email not sent");
      res.status(400).json({ message: "Email not sent" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
    console.log("Email not sent");
  }
};

const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  if (otpStorage[email] && otp === otpStorage[email]) {
    delete otpStorage[email];
    res.status(200).json({ status: 200, message: "Email Verified" });

    console.log("Email Verified");
  } else {
    res.status(400).json({ status: 400, message: "Invalid OTP" });
    console.log("Invalid OTP");
  }
};

const testConnection = async () => {
  try {
    const response = await transporter.verify();
    console.log("Connection successful", response);
  } catch (error) {
    console.log("Connection failed", error);
  }
};

module.exports = { sendmail, verifyEmail, testConnection };
