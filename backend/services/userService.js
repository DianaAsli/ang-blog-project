const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'werdtghujklmJBHGF4567RTDHHDTFVG'

async function register(email, username, password){
 const existingEmail = await User.findOne({email}).collation({
    locale:'en',
    strength:2
 });
 const existingUsername = await User.findOne({username}).collation({
    locale:'en',
    strength:2
 });

 if(existingEmail){
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

 const token = createSession(user)
 return token;
}

function createSession({
   _id,
   username,
   email
}){
   const payload={
      _id, 
      username,
      email
   }
   const token = jwt.sign(payload,JWT_SECRET);
   return token;
}

function verifyToken(token){
   return jwt.verify(token, JWT_SECRET);
}

module.exports={
    register
}