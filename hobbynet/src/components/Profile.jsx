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
import { FaComment } from 'react-icons/fa'
import React, { Fragment, useEffect, useState } from 'react';
import { useSpring } from 'framer-motion';
import './styles/UserProfile.scss';
import { useParams } from 'react-router-dom'


export default function Profile({ getUserInfo, getUserInterests }) {

  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState('');
  const [userInterests, setUserInterests] = useState([]);

  console.log("userId", userId);

  const displayUserInterests = userInterests.map(interest =>
    <div className='user_interest'>
      #{interest.name}
    </div>
  )

  useEffect(() => {
    getUserInfo(userId)
      .then((res) => {
        setUserInfo(res.data);
      })

    getUserInterests(userId)
      .then(res => setUserInterests(res.data))
  }, [])

  return (
    <>
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

          <Heading fontSize={'3xl'} fontFamily={'body'}>
            {userInfo.first_name} {userInfo.last_name}
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'} mb={4}>
            Fullstack Developer
          </Text>
          <Stack display='flex' direction='row' spacing='40px' justify='center' fontSize={'sm'} fontWeight={'500'}>
            <Center color='pink.500'>
              <MdLocationOn />
              <Text ml={1}>
                {userInfo.postal_code}
              </Text>
            </Center>
            <Center color='pink.500'>
              <MdLink />
              <Text ml={1}>
                {userInfo.email}
              </Text>
            </Center>
            <Center color='pink.500'>
              <MdDateRange />
              <Text ml={1}>
                Joined {userInfo.created_at}
              </Text>
            </Center>
          </Stack>

          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            {displayUserInterests}
          </Stack>
        </Box>
      </Center>
      <Center py={6} position={'relative'}>
        <Button position={'relative'}>
          <Center>
            <Text ml='1'>
              {`Send ${userInfo.first_name} a message!   `}
            </Text>
            <FaComment style={{ marginLeft: '7px' }}></FaComment>
          </Center>
        </Button>
      </Center>
    </>
  );
}