const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized. Token missing.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password -token");
    if (!user) {
      return next(new ErrorResponse("Not authorized. User not found.", 401));
    }

    req.user = { id: user._id };
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized. Invalid or expired token.", 401));
  }
};

module.exports = authMiddleware;
