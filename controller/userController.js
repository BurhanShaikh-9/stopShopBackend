// const jwt = require('jsonwebtoken');
// const accessToken = jwt.sign({ user }, jwtSecret, { expiresIn: '15m' });
// const refreshToken = jwt.sign({ user }, refreshSecret, { expiresIn: '7d' }); 
// const express = require("express");
const bcrypt = require('bcrypt');
const modelUser = require('../model/user.js')

const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingAdmin = await modelUser.findOne({ email });
        if (existingAdmin) {
            return res
                .status(400)
                .json({ message: "An admin with this email already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new modelUser({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save();
        res.status(201).json({
            message: "Admin registered successfully.",
        });
        
    }
    catch (error) {
        console.log(error, 'error');
        res.status(500).json({
            message: "An error occurred while registering the admin.",
            error,
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await modelUser.find().select('-password');;
        res.status(200).json(users);
    } catch (error) {
        console.error(error, 'error');
        res.status(500).json({
            message: "An error occurred while fetching users.",
            error,
        });
    }
};

module.exports = {
    addUser,
    getAllUsers
};