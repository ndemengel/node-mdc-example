var bunyan = require('bunyan');
var cls = require('continuation-local-storage');

var logContext = cls.getNamespace('app-log-ctx');

function decorateLogMethod(logMethod) {
  return function() {
    var args = Array.prototype.slice.call(arguments); // clone
    args.unshift({
      requestId: logContext.get('requestId'),
      sessionId: logContext.get('sessionId')
    });
    return logMethod.apply(undefined, args);
  };
}

function decorateChildMethod(childCreator) {
  return function() {
    return new Logger(childCreator.apply(undefined, arguments));
  };
}

function Logger(bunyanLogger) {
  for (var key in bunyanLogger) {
    var attribute = bunyanLogger[key];

    if (typeof attribute === 'function') {
      var originalMethod = attribute.bind(bunyanLogger);

      if (['trace', 'debug', 'info', 'warn', 'error', 'fatal'].indexOf(key) !== -1) {
        this[key] = decorateLogMethod(originalMethod);
      } else if (key === 'child') {
        this[key] = decorateChildMethod(originalMethod);
      } else {
        this[key] = originalMethod;
      }

    } else {
       this[key] = attribute;
    }
  }
}

function createLogger(name) {
  return new Logger(bunyan.createLogger({ name: name }));
}

module.exports.createLogger = createLogger;
