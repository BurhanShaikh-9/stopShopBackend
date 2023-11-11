const mongoose = require("mongoose");
const productScheme = new mongoose.Schema(
    {
        image: {
            type: String,
        },
        productName: {
            type: String,
        },
        productColor:{
            type: String
        },
        productSize: {
            type: String,
        },
        productAmount:{
            type: Number,
        },
        productQuantity:{
            type: Number
        },
        productSearchTags:{
            type: String
        },
        isDeleted:{
            type: Number
        }
    }
);

module.exports = mongoose.model("products", productScheme);