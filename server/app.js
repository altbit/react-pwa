const express = require('express');

const basicSetup = require('./http/basicSetup');
const routes = require('./http/routes');
const errorHandling = require('./http/errorHandling');
const MongoService = require('./services/Mongo');

const app = express();
basicSetup(app);
routes(app);
errorHandling(app);

MongoService.init();

module.exports = app;