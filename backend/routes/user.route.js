const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = express.Router();
const { registeruser, loginuser } = require("../controllers/user.controller");
const { auth } = require("../middleware/authToken.middleware");

const { sendmail, verifyEmail } = require("../utils/sendmail.util");
const { sendOtp, verifyOtp } = require("../utils/sendotp");

// router.use(auth);
router.post("/register", registeruser);
router.post("/login", loginuser);

router.post("/sendmail", sendmail);
router.post("/verifymail", verifyEmail);

router.post("/sendotp", sendOtp);
router.post("/verifyotp", verifyOtp);
router.get("/authkey", auth, (req, res) => {
  console.log("Auth key:", req.cookies);
  if (!req.cookies || !req.cookies.authKey) {
    console.error("Auth key missing in cookies!");
    return res.status(400).json({ message: "Auth key not found in cookies" });
  }

  res.status(200).json({ authkey: req.cookies.authKey });
});

// exports
module.exports = router;
