/**
 * Module dependencies
 */
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
let client, db;
/**
 * Connect to mongodb
 */
const makeDb = async () => {
    // eslint-disable-next-line require-atomic-updates
    client = client || (await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true, useUnifiedTopology: true }));
    // eslint-disable-next-line require-atomic-updates
    db = db || (await client.db(global.__MONGO_DB_NAME__));
    return db;
};

export async function closeDb() {
    await client.close();
}

export default makeDb;