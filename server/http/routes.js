const config = require('./../../config/config');
const debug = require('debug')('server:init');
const express = require('express');
const path = require('path');
const fs = require('fs');

const userRouter = require('./../routers/user');

module.exports = (app) => {
  debug('adding routes');

  app.get('*.js', (req, res, next) => {
    if (fs.existsSync(path.join(config.public, req.url + '.gz'))) {
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
    }
    next();
  });
  app.use(express.static(config.public));

  app.use(userRouter.tokenMiddleware);

  app.use('/api/', userRouter.router);
};
