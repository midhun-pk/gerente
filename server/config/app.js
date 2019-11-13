/**
 * Module dependencies
 */
const express = require('./express');
const mongoose = require('./mongoose');
const config = require('./config');

const start = async () => {
    try {
        await mongoose.connect();
        const app = express.init();
        app.listen(config.port, config.host, () => {
            const server = 'http://' + config.host + ':' + config.port;
            console.log(config.app.title);
            console.log('Server         : ' + server);
            console.log('Database       : ' + config.db.uri);
        });
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    start
};