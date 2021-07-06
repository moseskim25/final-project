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
  for (const item of obj) {
    output.push(item);
  }
  return output;
}

export default function Conversations(props) {
  const user_id = cookies.get('user_id')

  const [conversations, setConversations] = useState([]);
  console.log("conversations", conversations);

  const getConversations = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${1}/chats`);
      const data = await response;
      console.log('data is:', data);
      setConversations(objToArray(data.messages));
    } catch (err) {
      console.log(err.message);
    }
  }


  useEffect(() => {
    getConversations();
  }, [])

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
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Center py={6} position={'relative'}>
        <Box
          maxW={'640px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'left'}
        >
          <h3>Sally McGee</h3>
          <p>{conversations[0]}</p>
        </Box>
      </Center>
    </Flex>
  );
}
    // <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
    //   <Flex p={8} flex={1} align={''} justify={'center'}>
    //     <Stack spacing={6} w={'full'} maxW={'lg'}>

    //       <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
    //         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    //         Amet non, voluptatibus soluta voluptas suscipit fugit laudantium!
    //       </Text>
    //       <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
    //         <Button
    //           rounded={'full'}
    //           bg={'pink.400'} pla
    //           color={'white'}
    //           _hover={{
    //             bg: 'pink.500',
    //           }}>
    //           <Link href='/register'>
    //             Register Now!
    //           </Link>
    //         </Button>
    //         <Button rounded={'full'}>How It Works</Button>
    //       </Stack>
    //       <Stack direction="row" spacing="5px" fontSize={{ base: 'sm', lg: 'md' }} color={'gray.500'}>
    //         <Text>
    //           Already Registered?
    //         </Text>
    //         {/* add link here w/ react-router */}
    //         <Link as="b">
    //           Login
    //         </Link>
    //       </Stack>
    //     </Stack>
    //   </Flex>

    // </Stack>