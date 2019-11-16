/**
 * Module dependencies
 */
import mongodb from 'mongodb';
import config from '../../../config/config';

const MongoClient = mongodb.MongoClient;
export const client = new MongoClient(config.db.uri, config.db.options);

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