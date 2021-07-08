"use strict";

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on("connection", (socket) => {
  // when connect
  console.log("a user connected.");
  io.emit("welcome", "hello this is socket")
});