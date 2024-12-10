const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'werdtghujklmJBHGF4567RTDHHDTFVG';

async function register(email, username, password) {
   const existingEmail = await User.findOne({
      email
   }).collation({
      locale: 'en',
      strength: 2
   });
   const existingUsername = await User.findOne({
      username
   }).collation({
      locale: 'en',
      strength: 2
   });

   if (existingEmail) {
      const error = new Error('Email is taken');
      error.status = 409;
      throw error;
   }

   if (existingUsername) {
      const error = new Error('Username is taken');
      error.status = 409;
      throw error;
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

async function login(email, password) {
   const user = await User.findOne({email}).collation({
      locale:'en',
      strength:2
   })
   if(!user){
      throw new Error('Incorrect email or password');
   }

   const hasMatch = await bcrypt.compare(password, user.hashedPassword);

   if(!hasMatch){
      throw new Error('Incorrect email or password');
   }
   const token = createSession(user);
   return token;
}

function createSession({
   _id,
   username,
   email
}) {
   const payload = {
      _id,
      username,
      email
   }
   const token = jwt.sign(payload, JWT_SECRET);
   return token;
}

function verifyToken(token) {
   return jwt.verify(token, JWT_SECRET);
}

module.exports = {
   register,
   login,
   verifyToken,
   createSession
}