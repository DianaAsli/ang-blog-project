const express = require('express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes')

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    routesConfig(app);

    app.listen(3000, ()=>console.log('Server is listening on port 3000'))
}