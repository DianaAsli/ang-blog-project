const express = require('express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes')
const errorHandler = require('./util/parser');
const cookieParser = require('cookie-parser');
const cors=require('cors');

require('dotenv').config();

start();

async function start() {
    const app = express();
    
    app.use(express.json()); 
    app.use(cookieParser());
    
    app.use(cors({
        origin:'http://localhost:4200',
        methods:['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders:['Content-Type', 'Authorization'],
        credentials: true
    }));
    
    await databaseConfig(app);
    routesConfig(app);

    app.use(errorHandler);

    app.listen(3000, ()=>console.log('Server is listening on port 3000'))
}