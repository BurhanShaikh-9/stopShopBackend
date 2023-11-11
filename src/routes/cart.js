const express = require('express');
const router = express.Router();
const {createCart} = require('../controller/cart')

router.post("/cart", createCart);

module.exports = router;