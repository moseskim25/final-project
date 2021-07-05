import React, { useState } from "react";
import { ChakraProvider, Image, Stack, HStack, VStack, Box } from "@chakra-ui/react";
import '../styles/Categories.scss';


export default function Categories(props) {

  const { goBack, goNext } = props;

  const [selected, setCategory] = useState('');

  return (
    <ChakraProvider>
      <VStack>
        <p className="sign" align="center">
          Pick a category! Don't worry you can always select more later
        </p>
        <Stack direction='row' >
          <Image className='category_image' borderRadius="full" boxSize="95px" src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Segun Adebayo" onClick={() => {setCategory('sports')}}/>
          <Image className='category_image' borderRadius="full" boxSize="95px" src="https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Segun Adebayo" onClick={() => {setCategory('music')}}/>
          <Image className='category_image' borderRadius="full" boxSize="95px" src="https://images.pexels.com/photos/3778179/pexels-photo-3778179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Segun Adebayo" onClick={() => {setCategory('art')}}/>
          <Image className='category_image' borderRadius="full" boxSize="95px" src="https://images.pexels.com/photos/5984620/pexels-photo-5984620.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Segun Adebayo" onClick={() => {setCategory('academic')}}/>
          <Image className='category_image' borderRadius="full" boxSize="95px" src="https://images.pexels.com/photos/5984620/pexels-photo-5984620.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Segun Adebayo" onClick={() => {setCategory('languages')}}/>
        </Stack>
        <p>{selected}</p>
        <HStack>
          <Box onClick={goBack}>Back</Box><Box onClick={() => goNext(selected)}>Next</Box>
        </HStack>
      </VStack>
    </ChakraProvider>
  );
}
