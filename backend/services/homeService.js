const User=require('../models/User');

async function getAllUsers(){
    return await User.find({}).lean();
}

module.exports={
    getAllUsers
}