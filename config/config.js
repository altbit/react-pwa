const args = require('minimist')(process.argv.slice(2));
var path = require('path');

let env = args.env
  ? args.env
  : (process.env.NODE_ENV
    ? process.env.NODE_ENV
    : 'development'
);

const appGlobalConfig = require('./app.json');
let appEnvConfig = null;
let appLocalConfig = null;
try {
  appEnvConfig = require(`./app.env.${env}.json`);
  appLocalConfig = require('./app.local.json');
} catch (e) {}

let appConfig = Object.assign(
  { env },
  appGlobalConfig,
  appEnvConfig,
  appLocalConfig
);

const serverGlobalConfig = require('./server.json');
let serverLocalConfig = null;
try {
  serverLocalConfig = require('./server.local.json');
} catch (e) {}

let serverConfig = Object.assign(
  {},
  serverGlobalConfig,
  serverLocalConfig
);

module.exports = {
  env,
  root: path.join(__dirname, '../'),
  public: path.join(__dirname, '../public'),
  app: appConfig,
  server: serverConfig,
};
