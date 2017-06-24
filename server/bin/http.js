#!/usr/bin/env node

const config = require('./../../config/config');
const app = require('./../app');
const debug = require('debug')('server:http');
const http2 = require('spdy');
const fs = require('fs');

app.set('port', config.server.port);
const server = http2.createServer({
  key: fs.readFileSync(__dirname + '/../keys/server.key'),
  cert:  fs.readFileSync(__dirname + '/../keys/server.crt'),
}, app);
server.listen(config.server.port);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = 'Port ' + config.server.port;
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