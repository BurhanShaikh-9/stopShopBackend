const cloudinary = require("../middleware/cloudinary");
const Product = require("../model/product");
const bcrypt = require('bcrypt');


const addProduct = async (req, res) => {
    const {
        image,
        productName,
        productColor,
        productSize,
        productAmount,
        productQuantity,
        productSearchTags
    } = req.body;

    try {

        const result = await cloudinary.uploader.upload(req.file.path);
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided" });
        }
        else {
            const product = new Product({
                image: result.secure_url,
                productName,
                productColor,
                productSize,
                productAmount,
                productQuantity,
                productSearchTags,
                isDeleted: 0
            });

            await product.save();
            res.status(201).json({ message: "Product added successfully." });
        }

    }
    catch (error) {
        console.log(error, 'error');
        res.status(500).json({
            message: "An error occurred while adding the product.",
            error,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: 0 });
        res.status(200).json(products);
    } catch (error) {
        console.error(error, 'error');
        res.status(500).json({
            message: "An error occurred while fetching users.",
            error,
        });
    }
};

const getSingleProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findOne({ _id: productId, isDeleted: 0 });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error, 'error');
        res.status(500).json({
            message: "An error occurred while fetching the Product.",
            error,
        });
    }
};

const getProductBySearchTag = async (req, res) => {
    const searchTag = req.params.searchProduct;

    try {
        const products = await Product.find({
            productSearchTags: { $regex: new RegExp(searchTag, 'i') },
        });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error, 'error');
        res.status(500).json({
            message: "An error occurred while fetching the Product.",
            error,
        });
    }
};

module.exports = {
    addProduct,
    getProductBySearchTag,
    getSingleProduct,
    getAllProduct
};