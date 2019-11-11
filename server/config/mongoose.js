/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const config = require('./config');

mongoose

/**
 * Connect to mongodb
 */
const connect = async () => {
    const client = await mongoose.connect(config.db.uri, config.db.options);
    return client.connection.db;
}

module.exports = {
    connect
};