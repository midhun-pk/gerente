/**
 * Module dependencies
 */
const express = require('express'),
      bodyParser = require('body-parser'),
      config = require('./config');

/*
 * Initialize local variables.
 */
let initLocalVariables = (app) => {
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.host = config.host;
    app.locals.port = config.port;
}


/*
 * Initialize application middleware
 */
let initMiddleware = (app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
}

/*
 * Initialize express
 */
const init = () => {
    const app = express();
    initLocalVariables(app);
    initMiddleware(app);
    return app;
};

module.exports = {
    init
};