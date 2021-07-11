import React, { useState, useEffect } from 'react'
import { chakra, Flex, Avatar, useColorModeValue, Text, Stack, Center } from '@chakra-ui/react';


export default function Conversation(props) {

  const { name, lastMessage, img } = props;
  
  return (
    name ? (
      <Flex
        boxShadow={'lg'}
        maxW={'640px'}
        direction={{ base: 'column-reverse', md: 'row' }}
        width={'full'}
        rounded={'xl'}
        p={10}
        position={'relative'}
        _hover={{ bg: "gray.50" }}
        mb={5}
      >
        <Avatar
          src={img}
          height={'80px'}
          width={'80px'}
          alignSelf={'center'}
          m={{ base: '0 17px 35px 0', md: '0 25px 0 50px' }}
        />
        <Center>
          <Stack spacing='0px'>
            <Text
              fontSize={'2xl'}
              fontWeight={700}
            >
              {name}
            </Text>
            <Text
              fontSize={'sm'}
              color={'gray.500'}
              as={'i'}
            >
              {lastMessage.slice(0, 124)}
            </Text>
          </Stack>
        </Center>
      </Flex>) : ''
  );
}