const mongoose = require('mongoose');

//const CONNECTION_STRING = 'mongodb://localhost:27017/ang-blog-app';

module.exports = async(app) =>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Database connected');
    } catch(err){
        console.error(err.message);
        process.exit();
    }
}