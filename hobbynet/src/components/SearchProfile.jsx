import {
    Flex,
    Avatar,
    Center,
    Stack,
    Text
  } from '@chakra-ui/react';

// key={result.id} 
// firstName={result.first_name}
// lastName={result.last_name}
// interest={result.interestname}
// category={result.name}
// level={result.level}/>

export default function SearchProfile(props) {
    const {key, firstName, lastName, interest, category, level, img} = props;
  return (
    firstName ? (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      position={'relative'}
      _hover={{bg: "gray.50"}}
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
                {firstName + ' ' + lastName}
            </Text>
            <Text>
                {interest + ' ' + category + ' ' + level}
            </Text>
            <Text
                fontSize={'sm'}
                color={'gray.500'}
                as={'i'}
            >
            </Text>
        </Stack>
      </Center>
    </Flex>) : ''
  );
}