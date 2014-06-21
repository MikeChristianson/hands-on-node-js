"use strict";
var net = require('net');
var _ = require('lodash');

var chatters = [];

function handleNewConnection(socket) {
  console.log('got new connection');
  chatters.push(socket);

  function relayDataToOtherChatters(sourceSocket, data) {
    _.chain(chatters)
      .filter(function (socket) { return socket !== sourceSocket })
      .forEach(function (socket) { socket.write(data) });
  }

  function handleIncomingData(data) {
    console.log('got this from someone', data);
    relayDataToOtherChatters(socket, data);
  }

  function handleConnectionClosed(data) {
    console.log('someone said goodbye', data);
  }

  socket.on('data', handleIncomingData);
  socket.on('end', handleConnectionClosed);
};

net.createServer(handleNewConnection).listen(3000);