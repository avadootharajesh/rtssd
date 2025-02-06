const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const unirest = require("unirest");

const generateAuthKey = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 10; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
};

const registeruser = async (req, res) => {
  try {
    const {
      username,
      mobileNumber,
      password,
      passcode,
      email,
      firstName,
      middleName,
      lastName,
    } = req.body;

    // Check if user exists
    const existingUser = await userModel.findOne({
      $or: [{ username }, { mobileNumber }],
    });

    if (existingUser) {
      const message =
        existingUser.username === username
          ? "User already exists with the given username."
          : "User already exists with the given mobile number.";
      return res.status(409).json({ message });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const authKey = generateAuthKey();

    // Create new user
    const user = new userModel({
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      fullname: `${firstName} ${middleName ? middleName + " " : ""} ${lastName}`,
      username,
      email,
      password: hashedPassword,
      passcode: passcode,
      authKey: authKey,
      phone: mobileNumber,
      dateofjoining: new Date(),
      isAdmin: false,
    });
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevents access from JavaScript
      secure: process.env.NODE_ENV === "development", // Works only on HTTPS in production
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour expiry
    });
    res.cookie("authKey", authKey, {
      httpOnly: true, // Prevents access from JavaScript
      secure: process.env.NODE_ENV === "development", // Works only on HTTPS in production
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour expiry
    });

    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginuser = async (req, res) => {
  const { email, selectedMethod, key } = req.body;

  try {
    // Find user by email
    const userbymail = await userModel.findOne({ email });
    const userbyusername = await userModel.findOne({ username: email });

    if (!userbymail && !userbyusername) {
      return res.status(404).json({ message: "User not found" });
    }

    let user = userbymail ? userbymail : userbyusername;
    // console.log(user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    if (selectedMethod === "password") {
      const isPasswordValid = await bcrypt.compare(key, user.password);
      if (isPasswordValid) {
        // set cookie
        res.cookie("authToken", token, {
          httpOnly: true, // Prevents access from JavaScript
          secure: process.env.NODE_ENV === "development", // Works only on HTTPS in production
          sameSite: "Strict", // Prevents CSRF attacks
          maxAge: 60 * 60 * 1000, // 1 hour expiry
        })
        res.cookie("authKey", user.authKey, {
          httpOnly: true, // Prevents access from JavaScript
          secure: process.env.NODE_ENV === "development", // Works only on HTTPS in production
          sameSite: "Strict", // Prevents CSRF attacks
          maxAge: 60 * 60 * 1000, // 1 hour expiry
        });
        console.log(user.authKey);
        return res
          .status(200)
          .json({ Message: "Authentication successful", token, user });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } else if (selectedMethod === "passcode") {
      if (user.passcode === key) {
        res.cookie("authToken", token, {
          httpOnly: true, // Prevents access from JavaScript
          secure: process.env.NODE_ENV === "development", // Works only on HTTPS in production
          sameSite: "Strict", // Prevents CSRF attacks
          maxAge: 60 * 60 * 1000, // 1 hour expiry
        })
        res.cookie("authKey", user.authKey, {
          httpOnly: true, // Prevents access from JavaScript
          secure: process.env.NODE_ENV === "development", // Works only on HTTPS in production
          sameSite: "Strict", // Prevents CSRF attacks
          maxAge: 60 * 60 * 1000, // 1 hour expiry
        });
        return res
          .status(200)
          .json({ Message: "Authentication successful", token, user });
      } else {
        return res.status(401).json({ message: "Invalid passcode" });
      }
    } else if (selectedMethod === "authkey") {
      if (user.authKey === key) {
        res.cookie("authToken", token, {
          httpOnly: true, // Prevents access from JavaScript
          secure: process.env.NODE_ENV === "development", // Works only on HTTPS in production
          sameSite: "Strict", // Prevents CSRF attacks
          maxAge: 60 * 60 * 1000, // 1 hour expiry
        })
        res.cookie("authKey", user.authKey, {
          httpOnly: true, // Prevents access from JavaScript
          secure: process.env.NODE_ENV === "development", // Works only on HTTPS in production
          sameSite: "Strict", // Prevents CSRF attacks
          maxAge: 60 * 60 * 1000, // 1 hour expiry
        });
        return res
          .status(200)
          .json({ Message: "Authentication successful", token, user });
      } else {
        return res.status(401).json({ message: "Invalid authKey" });
      }
    } else {
      return res.status(400).json({ message: "Invalid selectedMethod" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { registeruser, loginuser };
