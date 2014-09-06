'use strict';

var express = require('express');
var logger = require('../util/log').createLogger('actions');


//// Utils

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function executeAfterRandomTimeout(fn) {
  setTimeout(fn, randomInt(1, 10) * 100);
}


//// Dummy Intermediate Actions

function createIntermediateAction(number) {
  return function (done) {
    logger.info('Executing intermediate action ' + number + '...');
    done();
  };
}

var intermediateActions = [];

for (var i = 0; i < 3; i++) {
  intermediateActions.push(createIntermediateAction(i));
}


//// Dummy Actions

function createAction(number) {
  return function (done) {
    logger.info('Executing action ' + number + '...');
    executeAfterRandomTimeout(function () {
      var intermediateAction = intermediateActions[randomInt(0, 3)];
      intermediateAction(done);
    });
  };
}

var actions = [];

for (var i = 0; i < 3; i++) {
  actions.push(createAction(i));
}


//// Router

var router = express.Router();

router.get('/:action', function (req, res) {
  var actionNumber = req.params.action;
  var action = actions[actionNumber - 1];
  action(function whenDone() {
    res.redirect('/?lastAction=' + actionNumber);
  });
});

module.exports = router;
