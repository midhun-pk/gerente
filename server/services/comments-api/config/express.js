/**
 * Module dependencies
 */
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';

/*
 * Initialize local variables.
 */
let initLocalVariables = (app) => {
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.host = config.host;
    app.locals.port = config.port;
};


/*
 * Initialize application middleware
 */
let initMiddleware = (app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
};

/*
 * Initialize express
 */
const init = () => {
    const app = express();
    initLocalVariables(app);
    initMiddleware(app);
    return app;
};

export default init;