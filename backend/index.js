const express = require('express');
const databaseConfig = require('./config/database');

start();

async function start() {
    const app = express();

    await databaseConfig(app);

    app.listen(3000, ()=>console.log('Server is listening on port 3000'))
}