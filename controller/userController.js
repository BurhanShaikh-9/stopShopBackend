// const jwt = require('jsonwebtoken');
// const accessToken = jwt.sign({ user }, jwtSecret, { expiresIn: '15m' });
// const refreshToken = jwt.sign({ user }, refreshSecret, { expiresIn: '7d' }); 
// const express = require("express");

const modelUser = require('../model/user.js')

const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new modelUser({
            username,
            email,
            password
        })

        await newUser.save();
        res.status(201).json({
            message: "Admin registered successfully.",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while registering the admin.",
            error,
        });
    }
}

module.exports = {
    addUser,
};