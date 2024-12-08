const { getAllUsers } = require('../services/homeService');

const homeController = require('express').Router();

homeController.get('/', (req,res)=>{
    res.send('API working');
})

homeController.get('/users', async (req, res,next) => {
    try {
        const users = await getAllUsers();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
});

module.exports=homeController;