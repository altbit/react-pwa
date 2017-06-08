const config = require('./../../config/config');
const initDebug = require('debug')('server:init');
const debug = require('debug')('server:request');
const bodyParser = require('body-parser');

module.exports = (app) => {
  initDebug('bootstrap app');

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(require('morgan')('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(require('express-validator')());
  app.use(require('cookie-parser')());

  app.use((req, res, next) => {
    debug(req.body);
    res.header("Access-Control-Allow-Origin", config.server.origin);
    res.header("Access-Control-Request-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
};
