const config = require('./../../config/config');
const initDebug = require('debug')('server:init');
const debug = require('debug')('server:request');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

let jsList = [];
let pushedJs = [];
fs.readdir(path.join(config.public, 'js'), (err, items) => {
  if (err) {
    debug('cannot get js files', err);
    return;
  }
  debug('found js files', items);
  jsList = items.map(item => ('/js/' + item));
  jsList.forEach(item => {
    if (item.indexOf('/js/app') !== -1 || item.indexOf('/js/vendor') !== -1) {
      if (item.indexOf('.gz') === -1) {
        pushedJs.push(item);
      }
    }
  });
});

module.exports = (app) => {
  initDebug('enabling js files push');

  app.get('/', (req, res, next) => {
    debug('js files to push', pushedJs);
    pushedJs.forEach(jsFile => {
      let pushingStream = res.push(jsFile, {
        status: 200,
        method: 'GET',
        request: {
          accept: '*/*',
        },
        response: {
          'content-type': 'application/javascript',
          'content-encoding': 'gzip',
        },
      });
      pushingStream.on('error', err => {
        debug('push error', err);
      });
      const readStream = fs.createReadStream(
        path.join(config.public, jsFile + '.gz')
      );
      readStream.pipe(pushingStream);
      debug('pushed', jsFile);
    });
    next();
  });

  app.get('*.js', (req, res, next) => {
    if (jsList.indexOf(req.url + '.gz') !== -1) {
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
    }
    next();
  });
};
