const express = require("express");
const { getMyself } = require("../controllers/myselfContainer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/myself", authMiddleware, getMyself);

module.exports = router;
