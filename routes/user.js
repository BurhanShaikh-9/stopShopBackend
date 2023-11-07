const express = require("express");
const router = express.Router();
const {addUser, getAllUsers} = require('../controller/userController');

router.post("/user", addUser);
router.get("/user", getAllUsers);
module.exports = router;