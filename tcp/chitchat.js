"use strict";
var net = require('net');
var _ = require('lodash');

var chatters = [];

function handleNewConnection(socket) {
  console.log('got new connection');
  chatters.push(socket);

  function relayDataToOtherChatters(sourceSocket, data) {
    chatters
      .filter(function (socket) { return socket !== sourceSocket })
      .forEach(function (socket) { socket.write(data) });
  }

  function handleIncomingData(data) {
    console.log('someone said', data.toString());
    relayDataToOtherChatters(socket, data);
  }

  function handleConnectionClosed() {
    console.log('someone said goodbye');
    _.remove(chatters, function (s) { return socket === s });
  }

  function handleError(error) {
    console.warn('someone had a problem', error);
  }

  socket.on('data', handleIncomingData);
  socket.on('end', handleConnectionClosed);
  socket.on('error', handleError);
};

net.createServer(handleNewConnection).listen(3000);