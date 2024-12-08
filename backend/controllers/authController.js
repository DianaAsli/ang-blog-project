const {
    register
} = require('../services/userService');

const authController = require('express').Router();

authController.post('/register', async (req, res, next) => {
    try {
        if(req.body.email=='' || req.body.username=='' || req.body.password==''){
            throw new Error('All fields are required')
        }
        if(req.body.password!=req.body.repass){
            throw new Error('Passwords don\'t match');
        }
        const {
            email,
            username,
            password
        } = req.body;

       const token = await register(email, username, password);
        res.cookie('token', token)
        res.status(201).json({
            message: 'User registered successfully'
        })
    } catch (err) {
        next(err);
    }
})

module.exports = authController;