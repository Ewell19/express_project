const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const httpStatusCodes = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }
};

module.exports = auth;
