const config = require('./../config/config');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');

//routes
var userRoutes = require('./routes/user');

var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('*.js', function (req, res, next) {
  if (fs.existsSync(path.join(__dirname, '../public', req.url + '.gz'))) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
  }
  next();
});

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.
app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next();

  token = token.replace('Bearer ', '');


  jwt.verify(token, config.server.jwt.secret, function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email to submit posts'
      });
    } else {
      req.user = user;
      next();
    }
  });

});

var staticPath = path.join(__dirname, '../public');
app.use('/api/', userRoutes);
app.use(express.static(staticPath));

app.get('*', function(req, res) {
  if (req.url.indexOf('/api/') === 0) {
    res.status(404).json({ success: false, error: 'Not Found' });
  }
  res.render(path.join(__dirname, '../public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  console.dir(err);
  res.status(err.status || 500);
  if (err.status === 500) {
    console.error(err.stack);
    res.json({ success: false, error: 'Internal Server Error' });
  } else if (err.status === 404) {
    res.json({ success: false, error: 'Not Found' });
  } else {
    res.json({ success: false, error: err.message })
  }
});

mongoose.connect(config.server.mongo.uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected!');
});

module.exports = app;