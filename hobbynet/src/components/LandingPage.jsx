import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    Link,
    useBreakpointValue,
  } from '@chakra-ui/react';

  
  export default function LandingPage() {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'pink.400',
                  zIndex: -1,
                }}>
                LOREM IPSUM
              </Text>
              <br />{' '}
              <Text color={'pink.400'} as={'span'}>
                DOLOR SIT AMET
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Amet non, voluptatibus soluta voluptas suscipit fugit laudantium!
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'pink.400'}pla
                color={'white'}
                _hover={{
                  bg: 'pink.500',
                }}>
                <Link href='/register'>
                  Register Now!
                </Link>
              </Button>
              <Button rounded={'full'}>How It Works</Button>
            </Stack>
            <Stack direction="row" spacing="5px" fontSize={{ base: 'sm', lg: 'md' }} color={'gray.500'}>
                <Text>
                    Already Registered? 
                </Text>
                {/* add link here w/ react-router */}
                <Link as="b"> 
                    Login
                </Link>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1622495893617-38b112b30790?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1399&q=80'
            }
          />
        </Flex>
      </Stack>
    );
  }