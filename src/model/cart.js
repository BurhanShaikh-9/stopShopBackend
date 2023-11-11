const mongoose = require("mongoose");
const cartScheme = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        products:[
            {
                itemId: Number,
                quantity: Number
            }
        ],
        totalAmount: Number
    }
);

module.exports = mongoose.model("carts", cartScheme);