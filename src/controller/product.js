const cloudinary = require("../middleware/cloudinary");
const Product = require("../model/product");
const bcrypt = require('bcrypt');


const addProduct = async (req, res) => {
    const {
        productName,
        productColor,
        productSize,
        productAmount,
        productQuantity,
        productSearchTags
    } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided" });
        }

        console.log(req.file, 'prooo')
        const result = await cloudinary.uploader.upload(req.file.path);

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

const getPaginatedProducts = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;

    try {
        const skip = (page - 1) * limit;
        const query = { isDeleted: 0 };

        if (search) {
            query.$or = [
                { productName: { $regex: search, $options: 'i' } },
                // { productColor: { $regex: search, $options: 'i' } },
                // { productSize: { $regex: search, $options: 'i' } },
                // { productSearchTags: { $regex: search, $options: 'i' } },
            ];
        }

        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            products,
        });
    } catch (error) {
        console.error(error, 'error');
        res.status(500).json({
            message: "An error occurred while fetching products.",
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

const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findOneAndUpdate(
            { _id: productId, isDeleted: 0 },
            { isDeleted: 1 },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found or already deleted" });
        }

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        console.error(error, 'error');
        res.status(500).json({
            message: "An error occurred while deleting the product.",
            error,
        });
    }
};

module.exports = {
    addProduct,
    getProductBySearchTag,
    getSingleProduct,
    getAllProduct,
    getPaginatedProducts,
    deleteProduct
};