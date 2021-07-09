import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function SocketHelper() {
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null)

  const userId = cookies.get('user_id')

  // console.log("inside conversation.jsx");
  // console.log("test", socket && socket.connected);
  // console.log("userId", userId);

  useEffect(() => {
    setSocket(io("ws://localhost:8000", {
      query: {
        userId: userId
      }
    }))
  }, [])

  // useEffect(() => {
  //   socket?.on("welcome", message => {
  //     setSocketId(message);
  //   })
  // }, [socket])

  socket?.on("welcome", () => {
    return setSocketId(socket.id);
  })
  if (socketId) {
    return socketId;
  }

  // if (socket) {
  //   console.log('this is the socket:', socket.id);
  //   return {socket};
  // }
}