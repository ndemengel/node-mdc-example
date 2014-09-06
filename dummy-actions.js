'use strict';

var logger = require('./util/log').createLogger('actions');
var rand = require('./util/random');


//// Dummy Intermediate Actions

var intermediateActionNames = ['A', 'B', 'C'];

function createIntermediateAction(actionName) {
  return function (done) {
    logger.info('Executing intermediate action ' + actionName + '...');
    done();
  };
}

var intermediateActions = intermediateActionNames.map(createIntermediateAction);


//// Dummy Actions

function createAction(number) {
  return function (done) {
    logger.info('Executing action ' + number + '...');
    rand.executeAfterRandomTimeout(function () {
      var intermediateAction = intermediateActions[rand.randomInt(0, 3)];
      intermediateAction(done);
    });
  };
}

var actions = [];

for (var i = 0; i < 3; i++) {
  actions.push(createAction(i));
}

module.exports = actions;
