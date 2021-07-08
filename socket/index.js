"use strict";

const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 3333;
const INDEX = "../hobbynet/src/components/SocketTest.jsx";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

let userIdToSocketIdMap = {};





io.on("connection", (socket) => {
  // when connect
  console.log("a user connected.");
  io.emit("welcome", "hello this is socket")
});