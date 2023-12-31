const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password:{
            type: String,
        },
        userType:{
            type: Number
        }
    }
);

module.exports = mongoose.model("users", userSchema);