// backend\index.js
// Imports

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.route");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");

// Configurations

dotenv.config();
app.use(express.json());
app.use(cookieParser());
// for deplyment too
app.use(cors(
  {
    origin: "http://localhost:5000",
    credentials: true,
  },
  {
    origin: "https://artssd.onrender.com/",
    credentials: true,
  }
));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Definitions of varables and routes

const PORT = process.env.BACKEND_PORT || 5001;

// Connect to MongoDB

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Operations

app.use("/api/user", userRoute);

// App deployment to backend

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
