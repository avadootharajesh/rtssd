const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized user, token failed");
    }
  }

  // If there's no token in the Authorization header
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized user, token failed");
  }
});

module.exports = { auth };
