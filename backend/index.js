const express = require('express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes')

require('dotenv').config();

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    routesConfig(app);

    app.listen(process.env.PORT, ()=>console.log('Server is listening on port 3000'))
}