import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    Circle,
    useColorModeValue,
  } from '@chakra-ui/react';

  import { InfoOutlineIcon } from '@chakra-ui/icons'
  
  export default function Card() {
    return (
        <Box
          h={375}
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
        >
        <Box align='center' mb={4}>
          <Circle size="110px" bg="pink.400" color="white">
            <InfoOutlineIcon
                w={90} h={90}
                alt={'Avatar Alt'}
            />
          </Circle>
        </Box>
          <Heading fontSize={'2xl'} fontFamily={'body'} mb="15px" color="gray.700">
            INFORMATION
          </Heading>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed facilis vero mollitia ad dolore illum?
          </Text>
  
          <Stack display="flex" justify="center" mt={4} direction={'row'} spacing={4}>
            <Button
              fontSize={'sm'}

              bg={'pink.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px rgb(66 153 225 / 15%), 0 10px 10px -5px rgb(66 153 225 / 15%)'
              }
              _hover={{
                bg:  'pink.500',
              }}
              _focus={{
                bg: 'pink.500',
              }}>
              Follow
            </Button>
          </Stack>
        </Box>
    );
  }