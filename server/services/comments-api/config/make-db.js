/**
 * Module dependencies
 */
import mongodb from 'mongodb';
import config from './config';

const MongoClient = mongodb.MongoClient;
const client = new MongoClient(config.db.uri, config.db.options);

/**
 * Connect to mongodb
 */
const makeDb = async () => {
    if (!client.isConnected()) {
        await client.connect();
    }
    return client.db(config.db.name);
};

export default makeDb;