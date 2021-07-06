import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie'

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Link,
  useBreakpointValue,
  useColorModeValue,
  Center,
  Box
} from '@chakra-ui/react';

const cookies = new Cookies();

const objToArray = obj => {
  const output = []
  for (const item in obj) {
    output.push(obj[item]);
  }
  return output;
}

export default function Conversations({ getUserInfo }) {
  const user_id = cookies.get('user_id')

  const [conversations, setConversations] = useState([]);
  const [conversationsArray, setConversationsArray] = useState([]);
  const [userInfo, setUserInfo] = useState({});


  
  const getConversations = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${2}/chats`);
      const data = await response.json();
      setConversations(objToArray(data));
    } catch (err) {
      console.log(err.message);
    }
  }
  
  
  useEffect(() => {
    getConversations(user_id);
  }, []);

  const conversationsArr = conversations.map(async conversation => {

    const message = conversation.messages[0].text;
    const other_user = conversation.user1_id === Number(user_id) ? conversation.user2_id : conversation.user1_id;

    const response = await getUserInfo(Number(other_user));
    const otherUserName = await response.json();
    
    return (
      <Box
        key={conversation.id}
        maxW={'640px'}
        w={'full'}
        boxShadow={'md'}
        rounded={'lg'}
        p={6}
        textAlign={'left'}
        >
        <Text>{otherUserName}</Text>
        <Text>{message}</Text>
      </Box>
    )
  })


  
  
  // const getUserData = () => {
  // hardcoded for now
  // const data = 1;
  // console.log("line 27");
  // return axios.get(`http://localhost:8000/users/chats`, data)
  //   .then(res => {
  //     // console.log(res.data.conversations);
  //     console.log("in Conversations.jsx, axios request");
  //   })
  //   .catch(err => console.log(err))
  // }

  // const { conversations } = getUserData()
  // getUserData()

  return (
    <Center>
      <Stack direction="column">
          {conversationsArr}
      </Stack>
    </Center>
  );
};