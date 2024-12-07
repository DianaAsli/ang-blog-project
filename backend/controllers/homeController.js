const homeController = require('express').Router();

homeController.get('/', (req,res)=>{
    res.send('API working');
})

module.exports=homeController;