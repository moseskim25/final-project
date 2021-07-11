import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';

  import { MdLocationOn, MdLink, MdDateRange } from 'react-icons/md';
  import { FaEdit } from 'react-icons/fa'
  import React, { useEffect, useState } from 'react';
  import Cookies from 'universal-cookie';
  import { useSpring } from 'framer-motion';
  import './styles/UserProfile.scss';
  const cookies = new Cookies();
  
  export default function UserProfile({ getUserInfo, getUserInterests }) {

    const user_id = cookies.get('user_id');
    const [userInfo, setUserInfo] = useState('');
    const [userInterests, setUserInterests] = useState([]);

    const displayUserInterests = userInterests.map(interest => 
      <div className='user_interest'>
        #{interest.name}
      </div>
    )

    useEffect(() => {
      getUserInfo(user_id)
      .then((res) => {
        setUserInfo(res.data);
      })

      getUserInterests(user_id)
      .then(res => setUserInterests(res.data))
    }, [])
    
    return (
      <Center py={6} position={'relative'}>
        <Box
          maxW={'640px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'lg'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={userInfo.profile_image}
            alt={'Avatar Alt'}
            mb={4}
            position={'relative'}
          />
          <Heading fontSize={'3xl'}  fontFamily={'body'}>
            {userInfo.first_name} {userInfo.last_name}
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'} mb={4}>
            Fullstack Developer
          </Text>
          <Stack display='flex' direction='column' justify='center' fontSize={'sm'} fontWeight={'500'}>
            <Center color='pink.500'>
              <MdLocationOn/>
              <Text ml={1}>
                {userInfo.postal_code}
              </Text>
            </Center>
            <Center color='pink.500'>
              <MdLink/>
              <Text ml={1}>
                {userInfo.email}
              </Text>
            </Center>
            <Center color='pink.500'>
              <MdDateRange/>
              <Text ml={1}>
                Joined {userInfo.created_at ? userInfo.created_at.slice(0, 10) : null}
              </Text>
            </Center>
          </Stack>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            {displayUserInterests}
          </Stack>
        </Box>
      </Center>
    );
  }