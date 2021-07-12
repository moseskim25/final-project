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

  export default function ProfilegPage() {
    return (
      <Stack minH={'12vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack align={'center'} spacing={6} w={'full'} maxW={'8xl'}>
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
                  zIndex: -1
                }}>
                My Profile
              </Text>
              <br />
              <Flex color={'pink.400'} as={'span'}>
                <Text
                 color={'#E93B81'}
                 as={'span'}
                 position={'relative'}
                 _after={{
                   content: "''",
                   width: 'full',
                   height: useBreakpointValue({ base: '5%', md: '10%' }),
                   position: 'absolute',
                   bottom: -4,
                   left: 0,
                   bg: 'gray.600',
                   zIndex: 1}}>
                </Text>
              </Flex>
            </Heading>

          </Stack>
        </Flex>
      </Stack>
    );
  }