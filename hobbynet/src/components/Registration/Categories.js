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
        <Stack className={"category_container"} direction='row' >
          <VStack>
            <Image className={`${selected === 'Sports' ? 'selectedImg ' : ''}` + 'category_image hvr-grow'} src="https://images.pexels.com/photos/8224716/pexels-photo-8224716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Segun Adebayo" onClick={() => { setCategory('Sports') }} />
            <p>Sports and Recreation</p>
          </VStack>
          <VStack>
            <Image className={`${selected === 'Music' ? 'selectedImg ' : ''}` + 'category_image hvr-grow'} src="https://images.pexels.com/photos/6671709/pexels-photo-6671709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Segun Adebayo" onClick={() => { setCategory('Music') }} />
            <p>Music</p>
          </VStack>
          <VStack>
            <Image className={`${selected === 'Art' ? 'selectedImg ' : ''}` + 'category_image hvr-grow'} src="https://images.pexels.com/photos/542556/pexels-photo-542556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Segun Adebayo" onClick={() => { setCategory('Art') }} />
            <p>Art</p>
          </VStack>
          <VStack>
            <Image className={`${selected === 'Academics' ? 'selectedImg ' : ''}` + 'category_image hvr-grow'} src="https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Segun Adebayo" onClick={() => { setCategory('Academics') }} />
            <p>Academics</p>
          </VStack>
          <VStack>
            <Image className={`${selected === 'Languages' ? 'selectedImg ' : ''}` + 'category_image hvr-grow'} src="https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Segun Adebayo" onClick={() => { setCategory('Languages') }} />
            <p>Languages</p>
          </VStack>
        </Stack>
        <h2 style={{ fontWeight: 600, fontSize: '30px' }}>{selected}</h2>
        <HStack className='registration_navigate'>
          <Box className='back_next' onClick={goBack}>Back</Box>
          <p> </p>
          <Box className='back_next' onClick={() => goNext(selected)}>Next</Box>
        </HStack>
      </VStack>
    </ChakraProvider>
  );
}
