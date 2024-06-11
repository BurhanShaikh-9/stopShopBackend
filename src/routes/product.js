const express = require('express');
const router = express.Router();
const {addProduct, getAllProduct, getSingleProduct, getProductBySearchTag, getPaginatedProducts} = require('../controller/product')
const  multerUpload = require('../middleware/multer')

router.post("/product", multerUpload.single('image'), addProduct);
router.get("/product", getAllProduct);
router.get("/paginated-products", getPaginatedProducts);
router.get("/product/:productId", getSingleProduct);
router.get("/product/search/:searchProduct", getProductBySearchTag);


module.exports = router;