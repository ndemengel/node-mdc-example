var express = require('express');
var session = require('express-session');

var accessLogger = require('./middlewares/log-ctx');
var mainRoutes = require('./routes/index');
var actionRoutes = require('./routes/actions');

var app = express();

app.use(session({
  cookie: {
    httpOnly: false, // for demo purpose
  },
  resave: true,
  saveUninitialized: true,
  secret: 'demo'
}));

app.use(accessLogger);

app.use('/actions', actionRoutes);
app.use('/', mainRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler: print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
