const config = require('./../../config/config');
const debug = require('debug')('server:init');
const express = require('express');
const path = require('path');
const fs = require('fs');
const AuthService = require('./../services/Auth');

const userRouter = require('./../routers/user');

const guestRoutes = [
  '/api/users/signup',
  '/api/users/signin',
];

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

  app.use(AuthService.tokenMiddleware(guestRoutes));

  app.use('/api/', userRouter);
};
