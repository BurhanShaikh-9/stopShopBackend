const express = require('express');
const router = express.Router();
const {createCart, getCartByUser} = require('../controller/cart')

router.patch("/cart", createCart);
router.get("/cart/:userId", getCartByUser);

module.exports = router;