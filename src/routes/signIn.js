const express = require("express");
const router = express.Router();
const {signIn} = require('../controller/signInController');

router.post("/signIn", signIn);

module.exports = router;

