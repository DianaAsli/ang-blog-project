const {
    register,
    login
} = require('../services/userService');

const authController = require('express').Router();

authController.post('/register', async (req, res, next) => {
    try {
        if (req.body.email == '' || req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        }
        const {
            email,
            username,
            password
        } = req.body;

        const token = await register(email, username, password);
        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })
        res.status(201).json({
            message: 'User registered successfully'
        })
    } catch (err) {
        next(err);
    }
});

authController.post('/login', async (req, res, next) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(200).json({
            message: 'Login successful'
        })
    } catch (err) {
        next(err);
    }
});

authController.post('/logout', (req, res, next) => {
    if (!req.cookies.token) {
        return res.status(400).json({
            message: 'No token to clear'
        })
    }
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logout successful'
    })
})


module.exports = authController;