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
import './styles/LandingPage.scss';


export default function LandingPage() {
  return (
    <div>
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
                HOBBYNET
              </Text>
              <br />{' '}
              <Text color={'pink.400'} as={'span'}>
                Find a buddy today
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Tired of practicing French alone? Need a friend to start a rock band?
              Looking for accountability in your running routine? Hobbynet is here to help!
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'pink.400'} pla
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
              <Link href={"/login"} as="a" fontWeight={600}>
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
      <div className='screenshot'>
        <div>
          <img src='https://res.cloudinary.com/dm4r202h4/image/upload/v1626189591/shamelesscropped_kfbx5x.png' alt='' />
        </div>
        <div>
          <p>Find your hidden talent!</p>
          <p>Search your local area for people with similar interests,</p>
          <p>share ideas and learn together!</p>
        </div>
      </div>
    </div>
  );
}