import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'


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


export default function Conversations(props) {
  const { user } = props

  const { conversations, setConversations } = useState({ messages: "default" });


  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${1}/chats`);
        const data = await response.json();
        console.log("data", data);
        setConversations(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getConversations();

  }, [conversations])

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
          <p>{conversations || ""}</p>
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