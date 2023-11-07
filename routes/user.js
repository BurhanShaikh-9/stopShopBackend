const express = require("express");
const router = express.Router();
const {addUser} = require('../controller/userController');

router.post("/user", addUser);
module.exports = router;