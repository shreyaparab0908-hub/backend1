const express = require("express");
const { getHelloWorld } = require("../controllers/helloContainer");

const router = express.Router();

router.get("/hello", getHelloWorld);

module.exports = router;