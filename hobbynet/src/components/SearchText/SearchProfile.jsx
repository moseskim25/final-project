import {
    Flex,
    Avatar,
    Center,
    Stack,
    Text,
    Badge,
    Button
  } from '@chakra-ui/react';

// key={result.id} 
// firstName={result.first_name}
// lastName={result.last_name}
// interest={result.interestname}
// category={result.name}
// level={result.level}/>

export default function SearchProfile(props) {
  const {key, firstName, lastName, interest, category, level, img} = props;

  function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }

  function levelToColor(lvl) {
    if(level <= 2){
      return "green"
    } else if(level <= 4){
      return "yellow"
    } else {
      return "red"
    }
  }
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
      <Stack>
        <Avatar
          src={img}
          height={'110px'}
          width={'110px'}
          alignSelf={'center'}
          m={{ base: '0 17px 35px 0', md: '0 50px 0 50px' }}
        />
      </Stack>
      <Center>
        <Stack spacing='0px'>

          <Text
              fontSize={'2xl'}
              fontWeight='bold'
              mb={"0.5vh"}
          >    
              {firstName + ' ' + lastName}
          </Text>

            <Text fontSize={'sm'}>
                {'is looking for a buddy interested in learning...'} <Text fontSize={'2xl'}>{titleCase(interest)}</Text>
            </Text>
            <Text
                fontSize={'sm'}
                color={'gray.500'}
                as={'i'}
            >
            </Text>
        </Stack>
      </Center>
      <Flex w="94%" justify='space-between' position={'absolute'} mt={'-20px'} ml={'-20px'}>
        <Badge variant="subtle">
            {category}
        </Badge>
        <Badge variant="outline" colorScheme={levelToColor(level)}>
            {'Level ' + level}
        </Badge>

      </Flex>
    </Flex>) : ''
  );
}