const express = require('express');
const router = express.Router();
const {addProduct, getAllProduct, getSingleProduct} = require('../controller/product')
const  multerUpload = require('../middleware/multer')

router.post("/product", multerUpload.single('image'), addProduct);
router.get("/product", getAllProduct);
router.get("/product/:productId", getSingleProduct);


module.exports = router;