const mongoose = require("mongoose");
const cartScheme = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        products: [
            {
                itemId: { type: String },
                quantity: { type: Number }
            }
        ],
        totalAmount: {
            type: Number
        }
    }
);

module.exports = mongoose.model("carts", cartScheme);