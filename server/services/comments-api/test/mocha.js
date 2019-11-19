import makeDb, { closeDb } from './db';
import { MongoMemoryServer } from 'mongodb-memory-server';
const mongod = new MongoMemoryServer({ autoStart: false });

/**
 * Setup
 */
before(async () => {
    if (!mongod.runningInstance) {
        await mongod.start();
    }
    global.__MONGO_URI__ = await mongod.getConnectionString();
    global.__MONGO_DB_NAME__ = 'mocha';
    const db = await makeDb();
    db.dropDatabase();
});

/**
 * Teardown
 */
after(async () => {
    await closeDb();
    mongod.stop();
});