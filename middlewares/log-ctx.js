var cls = require('continuation-local-storage');
var cuid = require('cuid');

var logContext = cls.createNamespace('app-log-ctx');

module.exports = function(req, res, next) {
  logContext.bindEmitter(req);
  logContext.bindEmitter(res);

  logContext.run(function() {
    logContext.set('requestId', cuid());
    logContext.set('sessionId', req.sessionID);
    next();
  });
};
