const express = require('express');
const router = express.Router();
const {addAdmin, getAllAdmin, getSingleAdmin} = require('../controller/admin')
const  multerUpload = require('../middleware/multer')

router.post("/admin", multerUpload.single('image'), addAdmin);
router.get("/admin", getAllAdmin);
router.get("/admin/:adminId", getSingleAdmin);


module.exports = router;