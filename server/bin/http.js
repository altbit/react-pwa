#!/usr/bin/env node

const config = require('./../../config/config');
const app = require('./../app');
const debug = require('debug')('server:http');
const fs = require('fs');
const path = require('path');

app.set('port', config.server.http.port);

let server = null;
if (config.server.http.version === 2) {
  const http = require('spdy');
  server = http.createServer({
    key: fs.readFileSync(path.join(config.root, config.server.http.ssl.keyFile)),
    cert:  fs.readFileSync(path.join(config.root, config.server.http.ssl.certFile)),
  }, app);
} else {
  const http = require('http');
  server = http.createServer(app);
}
server.listen(config.server.http.port);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = 'Port ' + config.server.http.port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  debug('Listening on port ' + server.address().port);
});