import React, { useState, useEffect } from 'react'
import { chakra, Flex, Avatar, useColorModeValue, Text, Stack, Center } from '@chakra-ui/react';
import { io } from "socket.io-client";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Conversation(props) {
  const [socket, setSocket] = useState(null);
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

  useEffect(() => {
    socket?.on("welcome", message => {
      console.log("message", message);
      console.log("socket.id", socket.id);
    })
  }, [socket])

  return (
    <p>Hello</p>
  )
}