'use strict';

var express = require('express');
var actions = require('../dummy-actions');

var router = express.Router();

router.get('/:action', function (req, res) {
  var actionNumber = req.params.action;
  var action = actions[actionNumber - 1];
  action(function whenDone() {
    res.redirect('/?lastAction=' + actionNumber);
  });
});

module.exports = router;
