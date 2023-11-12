const express = require('express');
const router = express.Router();
const {createCart, getCartByUser} = require('../controller/cart')
const { authenticateToken } = require('../middleware/jwtCookie');

router.patch("/cart",authenticateToken, createCart);
router.get("/cart/:userId",authenticateToken, getCartByUser);

module.exports = router;