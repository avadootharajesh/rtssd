const errorHandler = require("express-async-handler");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendmail = require("../utils/sendmail.util");

const getAllUsers = errorHandler(async (req, res) => {
    try {
        const users = await userModel.find();
        console.log("Users Fetched Successfully for the ADMIN");
        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching users for the ADMIN" });
    }
});

module.exports = { getAllUsers }