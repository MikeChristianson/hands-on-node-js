"use strict";

var util = require('util');
var fs = require('fs');
var Promise = require('bluebird');

Promise.promisifyAll(fs);

fs.statAsync('../a.txt').then(function (stats) {
  console.log('The file is ' + stats.size + ' bytes.');
}).catch(function(e){
  console.error("unable to read file", e);
});

fs.openAsync('../a.txt', 'r').then(function (fd) {
  var buffer = new Buffer(5);
  return fs.readAsync(fd, buffer, 0, buffer.length, 10);
}).then(function (result) {
  console.log('The buffer is "' + result[1].toString() + '".');
}).catch(function(e){
  console.error("unable to read file", e);
});

fs.openAsync('../a.txt', 'r').then(function (fd) {
  var buffer = new Buffer(5);
  return fs.readAsync(fd, buffer, 0, buffer.length, 5).then(function (result) {
    console.log('The buffer is "' + result[1].toString() + '".');
    buffer = new Buffer(5);
    return fs.readAsync(fd, buffer, 0, buffer.length, 10).then(function (result) {
      console.log('The buffer is "' + result[1].toString() + '".');
    });
  }).catch(function (e) {
    console.error("unable to read file", e);
  });
});