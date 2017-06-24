const config = require('./../../config/config');
const debug = require('debug')('server:init');
const path = require('path');

module.exports = (app) => {
  debug('setting up error handling');

  app.get('*', (req, res) => {
    // For unknown API routes show an error
    if (req.url.indexOf('/api/') === 0) {
      const error = new Error('Not Found');
      error.status = 401;
      throw error;
    }
    // Other unknown GET routes should be processed by front-end
    res.render(path.join(config.public, 'index.html'));
  });

  app.use(() => {
    const error = new Error('Not Found');
    error.status = 404;
    throw error;
  });

  app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status);
    let message = error.message;
    switch (status) {
      case 500:
        console.log(error);
        message = 'Internal Server Error';
        break;
      case 404:
        message = 'Not Found';
        break;
    }
    res.json({
      success: false,
      error: {
        message,
      },
    });
  });
};
