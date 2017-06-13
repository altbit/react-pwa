const config = require('./../../config/config');
const debug = require('debug')('service:mongo');
const mongoose = require('mongoose');

class MongoService {

  constructor() {
    this.connection = null;
  }

  init() {
    debug('init connection...');

    // Use native promises
    mongoose.Promise = global.Promise;

    mongoose.connect(config.server.mongo.uri);
    this.connection = mongoose.connection;

    this.getConnection().on('error', console.error.bind(console, 'connection error:'));
    this.getConnection().once('open', () => {
      debug('connected');
    });
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new MongoService();