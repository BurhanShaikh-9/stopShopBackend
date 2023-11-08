const mongoose = require("mongoose");
const adminScheme = new mongoose.Schema(
    {
        image: {
            type: String,
        },
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: Number,
        },
        password: {
            type: String,
        },
        userType: {
            type: Number
        }
    }
);

module.exports = mongoose.model("admins", adminScheme);