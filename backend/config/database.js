const mongoose = require('mongoose');

module.exports = async(app) =>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Database connected');
    } catch(err){
        console.error(err.message);
        process.exit();
    }
}