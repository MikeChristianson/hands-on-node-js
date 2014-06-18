"use strict";

var util = require('util');
var fs = require('fs');
var Promise = require('bluebird');

Promise.promisifyAll(fs);

fs.statAsync('../a.txt').then(function (stats) {
  console.log(stats.size);
}).catch(function(e){
  console.error("unable to read file", e);
});