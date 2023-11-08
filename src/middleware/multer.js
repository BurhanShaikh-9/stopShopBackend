const multer = require('multer');

// const storage = multer.diskStorage({});
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads/');
    // },
    // filename: (req, file, cb) => {
    //     console.log(file, 'fileeee');
    //     cb(null, Date.now() + '-' + file.originalname);
    // }
});


const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image")) {
        return cb(new Error("Only image files are allowed"), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({ storage: storage, fileFilter });

module.exports = upload;