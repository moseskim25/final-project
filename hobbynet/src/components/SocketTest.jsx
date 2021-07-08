import React, { useState, useEffect } from 'react'
import { chakra, Flex, Avatar, useColorModeValue, Text, Stack, Center } from '@chakra-ui/react';
import { io } from "socket.io-client";

export default function Conversation(props) {
  const [socket, setSocket] = useState(null);

  console.log("inside conversation.jsx");
  console.log(socket);

  useEffect(() => {
    setSocket(io("ws://localhost:8000"))
  }, [])

  useEffect(() => {
    socket?.on("welcome", message => {
      console.log("message", message);
    })
  }, [socket])

  return (
    <p>Hello</p>
  )
}