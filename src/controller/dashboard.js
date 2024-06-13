const Product = require("../model/product");

const getProductsData = async (req, res) => {
    try {
        const activeProducts = await Product.find({ isDeleted: 0 });
        const allProducts = await Product.find();
        const deactiveProducts = await Product.find({ isDeleted: 1 });
        res.status(200).json({
            activeProducts: activeProducts.length,
            deactiveProducts: deactiveProducts.length,
            allProducts: allProducts.length
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching dashboard products data.",
            error,
        });
    }
};

module.exports = {
    getProductsData
};