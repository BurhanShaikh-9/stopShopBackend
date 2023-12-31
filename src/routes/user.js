const express = require("express");
const router = express.Router();
const {addUser, getAllUsers, getSingleUser} = require('../controller/user');

router.post("/user", addUser);
router.get("/user", getAllUsers);
router.get("/user/:userId", getSingleUser);

module.exports = router;