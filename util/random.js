'use strict';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function executeAfterRandomTimeout(fn) {
  setTimeout(fn, randomInt(1, 10) * 100);
}

module.exports = {
  executeAfterRandomTimeout: executeAfterRandomTimeout,
  randomInt: randomInt
};
