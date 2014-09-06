'use strict';

var express = require('express');
var session = require('express-session');

var loggingContext = require('./middlewares/log-ctx');
var mainRoutes = require('./routes/index');
var actionRoutes = require('./routes/actions');


//// App

var app = express();
app.disable('x-powered-by');


//// Middlewares

app.use(session({
  cookie: {
    // for demo purposes, allows for clearing session cookie from client JS
    httpOnly: false
  },
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  secret: 'demo'
}));

// here lies the magic!
app.use(loggingContext);


//// Routes

app.use('/actions', actionRoutes);
app.use('/', mainRoutes);


//// Error handling

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler: print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
