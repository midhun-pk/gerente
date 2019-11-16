/**
 * Module dependencies
 */
import init from 'express';
import makeDb from './make-db';
import config from './config';

const start = async () => {
	try {
        const db = await makeDb();
		const app = init();
		app.listen(config.port, config.host, () => {
			const server = 'http://' + config.host + ':' + config.port;
			console.log(config.app.title);
			console.log('Server         : ' + server);
			console.log('Database       : ' + db.databaseName);
		});
	} catch( error ) {
        console.log(error);
        process.exit();
	}
};

export default start;