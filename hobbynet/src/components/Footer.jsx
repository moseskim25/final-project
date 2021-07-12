import {
    Box,
    chakra,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    useColorModeValue,
    Button
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { BiMailSend } from 'react-icons/bi';
  
  const ListHeader = (props) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {props.name}
      </Text>
    );
  };
  
  export default function LargeWithNewsletter() {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        mt={"33vh"}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid
            templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
            spacing={8}>
            <Stack spacing={6}>
              <Text fontSize={'sm'}>
                © 2020 MCJ Inc. All rights reserved
              </Text>
              <Stack direction={'row'} spacing={6}>
                <Button onClick={() => window.location.href = "http://www.twitter.com"}>
                  <FaTwitter />
                </Button>
                <Button onClick={() => window.location.href = "http://www.youtube.com"}>
                  <FaYoutube />
                </Button>
                <Button onClick={() => window.location.href = "http://www.instagram.com"}>
                  <FaInstagram />
                </Button>
              </Stack>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader name="Company">Company</ListHeader>
              <Link href={'#'}>About us</Link>
              <Link href={'#'}>Contact us</Link>
              <Link href={'#'}>Testimonials</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader name="Support">Support</ListHeader>
              <Link href={'#'}>Help Center</Link>
              <Link href={'#'}>Terms of Service</Link>
              <Link href={'#'}>Privacy Policy</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader name="Keep in Touch ">Stay up to date</ListHeader>
              <Stack direction={'row'}>
                <Input
                  placeholder={'Your email address'}
                  bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                  border={0}
                  _focus={{
                    bg: 'whiteAlpha.300',
                  }}
                />
                <IconButton
                  bg={useColorModeValue('green.400', 'green.800')}
                  color={useColorModeValue('white', 'gray.800')}
                  _hover={{
                    bg: 'green.600',
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    );
  }