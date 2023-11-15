const express = require('express');
const router = express.Router();
const {addAdmin, getAllAdmin, getSingleAdmin} = require('../controller/admin')
const  multerUpload = require('../middleware/multer')
const { authenticateToken } = require('../middleware/jwtCookie');



router.post("/admin", authenticateToken, multerUpload.single('image'), addAdmin);
router.get("/admin", authenticateToken, getAllAdmin);
router.get("/admin/:adminId", authenticateToken, getSingleAdmin);


module.exports = router;