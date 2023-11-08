const cloudinary = require("../middleware/cloudinary");
const Admin = require("../model/admin");
const bcrypt = require('bcrypt');


const addAdmin = async (req, res) => {
    const {
        image,
        username,
        email,
        phone,
        password,
    } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await cloudinary.uploader.upload(req.file.path);

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists." });
        } else {
            if (!req.file) {
                return res.status(400).json({ error: "No image file provided" });
            }
            else {
                const admin = new Admin({
                    username,
                    email,
                    password: hashedPassword,
                    image: result.secure_url,
                    phone,
                    userType: 2
                });

                await admin.save();
                res.status(201).json({ message: "Admin added successfully." });

            }
        }
    }
    catch (error) {
        console.log(error, 'error');
        res.status(500).json({
            message: "An error occurred while adding the admin.",
            error,
        });
    }
}

const getAllAdmin = async (req, res) => {
    try {
        const users = await Admin.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error(error, 'error');
        res.status(500).json({
            message: "An error occurred while fetching users.",
            error,
        });
    }
};

const getSingleAdmin = async (req, res) => {
    const userId = req.params.adminId;

    try {
        const user = await Admin.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error, 'error');
        res.status(500).json({
            message: "An error occurred while fetching the Admin.",
            error,
        });
    }
};

module.exports = {
    addAdmin,
    getAllAdmin,
    getSingleAdmin
};