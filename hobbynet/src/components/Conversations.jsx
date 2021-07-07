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


export default function Conversations({ getUserInfo }) {
  const user_id = cookies.get('user_id')

  const [state, setState] = useState({
    conversations: [],
    messages: [],
    chatContactsInfo: {}
  })

  const sortConversationData = (data) => {
    const conversationIds = data.map(message => message.conversation_id)
    // const conversationIdsDistinct = conversationIds.filter((value, index, self) => self.indexOf(value) === index);
    // console.log("conversationIdsDistinct", conversationIdsDistinct);
    // const conversationsMessages = conversationIdsDistinct.map(conversationId => {
    //   return {}
    // })
    setState(prev => ({ ...prev, conversations: conversationIds, messages: data }))
  }

  const getConversationMessages = (user_id) => {
    console.log("THIS IS USER_ID", user_id);
    fetch(`http://localhost:8000/users/${user_id}/chats`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        sortConversationData(res)
        // console.log("data", res);
        // const userConversations = res
        // setState(prev => ({ ...prev, conversations: , messages: , userInfo:  }))
      })
  }

  // creates array of convo previews
  const conversationsArr = conversations.map(async conversation => {

    const messages = getMessages(conversation.id);
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
        {/* <Text>{messages[0].text}</Text> */}
        <Text>TestTest</Text>
      </Box>
    )
  })

  useEffect(() => {
    // getConversations(user_id)
    getConversationMessages(user_id)

  }, []);

  return (
    <Center>
      <Stack direction="column">
        {/* {conversationsArr} */}
      </Stack>
    </Center>
  );
};


  // set state as one object DONE
  // to do: Promise.all in useEffect
  // just one fetch which gets all conversations and related messages 
  // sort these into the Boxes

  // const getMessages = async (conversation_id) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/users/${2}/chats/${conversation_id}`);
  //     const data = await response.json();
  //     setMessages(data);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
  // const getConversations = (user_id) => {
  //   fetch(`http://localhost:8000/users/${2}/chats`)
  //     .then(res => {
  //       const data = res.json()
  //       setConversations(prevState => ([...prevState, data]]))
  //   // setConversations(prev => [...prev, data]);
  //   console.log("data", data);
  //   console.log("1. conversations", conversations);
  //   getMessages(conversations[0]);
  //   console.log("2. messages", messages);
  // })
  //     .catch (err => console.log(err.message))

  // try {
  //   // const response = await fetch(`http://localhost:8000/users/${2}/chats`);
  //   // const data = await response.json();
  //   // const conversationIdsArr = data.map(obj => obj.id)
  //   await setConversations(data);
  //   await console.log("1. conversations", conversations);
  //   await getMessages(conversations[0]);
  //   await console.log("2. messages", messages);
  // } catch (err) {
  //   console.log(err.message);
  // }



// creates array of convo previews
// const conversationsArr = conversations.map(async conversation => {

//   const messages = getMessages(conversation.id);
//   const other_user = conversation.user1_id === Number(user_id) ? conversation.user2_id : conversation.user1_id;

//   const response = await getUserInfo(Number(other_user));
//   const otherUserName = await response.json();

//   return (
//     <Box
//       key={conversation.id}
//       maxW={'640px'}
//       w={'full'}
//       boxShadow={'md'}
//       rounded={'lg'}
//       p={6}
//       textAlign={'left'}
//     >
//       <Text>{otherUserName}</Text>
//       {/* <Text>{messages[0].text}</Text> */}
//       <Text>TestTest</Text>
//     </Box>
//   )
// })


// 


// const getUserData = () => {
//   // hardcoded for now
//   const data = 2;
//   console.log("line 41");
//   return axios.get(`http://localhost:8000/users/${}/chats`, data)
//     .then(res => {
//       // console.log(res.data.conversations);
//       console.log("in Conversations.jsx, axios request");
//     })
//     .catch(err => console.log(err))
// }

// // const { conversations } = getUserData()
// useEffect(() => {

//   getUserData()
// }, [])


////// OLD STUFf //////

// const [conversations, setConversations] = useState([]);
//   const [messages, setMessages] = useState([]);
//   // const [conversationsArray, setConversationsArray] = useState([]);
//   const [userInfo, setUserInfo] = useState({});