
const express = require('express');
const router = express.Router();
const {getProductsData} = require('../controller/dashboard')


router.get("/dashboard/products", getProductsData);



module.exports = router;