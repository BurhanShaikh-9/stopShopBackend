const express = require("express");
const router = express.Router();
const {signIn} = require('../controller/signIn');

router.post("/signIn", signIn);

module.exports = router;

