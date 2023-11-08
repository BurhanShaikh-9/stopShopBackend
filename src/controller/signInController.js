const AdminModel = require("../model/admin");
const UserModel = require("../model/user");
const bcrypt = require('bcrypt');


const signIn = async (req, res) => {
    const { email, password } = req.body;
    let passwordMatch = false;
    let isAdmin = false;

    try {
        const existingAdmin = await AdminModel.findOne({ email });
        const existingUser = await UserModel.findOne({ email });
        if (!existingAdmin && !existingUser) {
            return res.status(400).json({ message: "Incorrect Email" });
        }

        if (existingUser && existingUser.userType === 1) {
            passwordMatch = await bcrypt.compare(password, existingUser.password);
        }
        else if (existingAdmin && existingAdmin.userType === 2) {
            passwordMatch = await bcrypt.compare(password, existingAdmin.password);
            isAdmin = true;
        }
        if (passwordMatch) {
            console.log(passwordMatch, 'passwordMatchedd');
            const { password, ...newExistingAdmin } = !isAdmin ? existingUser.toObject() : existingAdmin.toObject();

            return res.status(200).json({ message: "Sign In Successful", user: newExistingAdmin });
        } else {
            return res.status(401).json({ message: "Incorrect Password" });
        }


    }
    catch (error) {
        console.log(error, 'error');
        res.status(500).json({
            message: "An error occurred while Signing.",
            error,
        });
    }
}

module.exports = {
    signIn
}