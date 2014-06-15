"use strict";

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Ticker = function() {
  setInterval(function tick() {
    this.emit('tick');
  }.bind(this), 1000);

};

util.inherits(Ticker, EventEmitter);

var ticker = new Ticker();