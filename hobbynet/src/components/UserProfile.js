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
    Flex,
    useColorModeValue,
  } from '@chakra-ui/react';

  import { MdLocationOn, MdLink, MdDateRange } from 'react-icons/md';
  import { FaEdit } from 'react-icons/fa'
  
  export default function UserProfile() {
    return (
      <Center py={6} position={'relative'}>
        <Box
          maxW={'640px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            alt={'Avatar Alt'}
            mb={4}
            position={'relative'}
          />
          <Button position={'absolute'}  ml='180'>
            <Center>
              <FaEdit></FaEdit>
              <Text ml='1'>
                Edit
              </Text>
            </Center>
          </Button>
          <Heading fontSize={'3xl'}  fontFamily={'body'}>
            Claire Devlin
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'} mb={4}>
            Fullstack Developer
          </Text>
          <Stack display='flex' direction='row' spacing='40px' justify='center' fontSize={'sm'} fontWeight={'500'}>
            <Center color='pink.500'>
              <MdLocationOn/>
              <Text ml={1}>
                Montreal, Ontario
              </Text>
            </Center>
            <Center color='pink.500'>
              <MdLink/>
              <Text ml={1}>
                clairedevlin.com
              </Text>
            </Center>
            <Center color='pink.500'>
              <MdDateRange/>
              <Text ml={1}>
                Joined July 5th 2001
              </Text>
            </Center>
          </Stack>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #music
            </Badge>
          </Stack>
        </Box>
      </Center>
    );
  }