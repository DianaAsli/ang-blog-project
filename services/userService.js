const bcrypt = require('bcypt');
const User = require('../backend/models/User');

async function register(email, username, password){
 const existing = await User.findOne({email}).collation({
    locale:'en',
    strength:2
 });
 const existingUsername = await User.findOne({username}).collation({
    locale:'en',
    strength:2
 });

 if(existing){
    throw new Error('Email is taken');
 }

 if(existingUsername){
    throw new Error('Username is taken')
 }

 const hashedPassword = await bcrypt.hash(password, 10);
 const user = await User.create({
    email,
    username,
    hashedPassword
 })
}

module.exports={
    register
}