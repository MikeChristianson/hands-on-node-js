"use strict";
var net = require('net');
var _ = require('lodash');

var chatters = [];

function handleNewConnection(socket) {
  console.log('got new connection');
  chatters.push(socket);

  socket.on('data', _.partial(handleIncomingData, socket));
  socket.on('end', _.partial(handleConnectionClosed, socket));
  socket.on('error', handleError);
};

net.createServer(handleNewConnection).listen(3000);

function relayDataToOtherChatters(sourceSocket, data) {
  chatters
    .filter(function (socket) { return socket !== sourceSocket })
    .forEach(function (socket) { socket.write(data) });
}

function handleIncomingData(socket, data) {
  console.log('someone said', data.toString());
  relayDataToOtherChatters(socket, data);
}

function handleConnectionClosed(socket) {
  console.log('someone said goodbye');
  _.remove(chatters, function (s) { return socket === s });
}

function handleError(error) {
  console.warn('someone had a problem', error);
}

