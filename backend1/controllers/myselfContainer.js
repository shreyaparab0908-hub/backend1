const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/asyncHandler");

const getMyself = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password -token");

  if (!user) {
    return next(new ErrorResponse("User not found.", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = {
  getMyself,
};
