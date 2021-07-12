import React, { useEffect, useState } from "react";
import { RadioGroup, Stack, Radio, Text, Box, Center } from '@chakra-ui/react'
import '../styles/Interests.scss'
// require("@babel/core").transformSync("code", {
//   plugins: ["@babel/plugin-proposal-object-rest-spread"],
// });

export default function Interests({ interestsArray, goNext, goBack }) {

  const [interests, setInterests] = useState([]);
  const [buttonVisibility, setButtonVisibility] = useState({ "4": true, "9": false, "10": false })
  console.log("(Interests.jsx Line 8) interests~~~~~", interests);
  console.log("interestsArray.data", interestsArray.data);
  console.log("buttonVisibility", buttonVisibility);

  useEffect(() => {
    const currentInterests = {};
    for (const interest of interestsArray.data) {
      currentInterests[interest.id] = false;
    }
    console.log("currentInterests", currentInterests);
    setButtonVisibility({ ...currentInterests })
  }, [])

  // useEffect(() => {
  //   interests?.some(interest => interest.id === )
  // }, interests)

  const select = (interest_id) => {
    // if already selected
    if (interests.includes(interest_id)) {
      setInterests(interests.filter(interest => interest !== interest_id))
      // hide radio buttons
      const temp = buttonVisibility;
      temp[interest_id] = false;
      setButtonVisibility(temp)
    } else {
      setInterests(prev => [...prev, interest_id])
      // make radio buttons visible
      const temp = buttonVisibility;
      temp[interest_id] = true;
      setButtonVisibility(temp)
    }
    return;
  }

  function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  const displayInterests = interestsArray.data.map((interest, index) =>
    <div
      className='interestContainer'
      key={interest.name}
      onClick={() => select(interest.id)}
      style={{ fontWeight: 600, fontSize: '30px' }}
    >

      <img className={`${interests.includes(interest.id) ? 'selectedImg ' : ''}` + 'interests_image hvr-grow'} src={interest.image} alt={interest.id}></img>
      <Center padding="10px 0 0 0">{toTitleCase(interest.name)}</Center>
      <RadioGroup className={`button-${interest.name}`} visibility={buttonVisibility[interest.id] ? "visible" : "hidden"} defaultValue="1">
        <Center fontSize="2.5vh">What level are you?</Center>
        <Box>
          <Stack spacing={20} direction="row" padding="10px 0 0 0" >
            <Text fontSize="1.7vh">(Total Beginner)</Text>
            <Text fontSize="1.7vh">(Life-long Passion)</Text>
          </Stack>
          <Center>
            <Stack spacing={4} direction="row" padding="10px 0 0 0" >
              <Radio value="1">1</Radio>
              <Radio value="2">2</Radio>
              <Radio value="3">3</Radio>
              <Radio value="4">4</Radio>
              <Radio value="5">5</Radio>
            </Stack>
          </Center>
        </Box>
      </RadioGroup>
    </div>)

  return (
    <div className='display'>
      <div className='display_interests'>
        {displayInterests}
      </div>
      <div className='registration_navigate'>
        <span className='back_next' onClick={goBack} >Back</span>
        <p> </p>
        <span className='back_next' onClick={() => goNext(interests)}>Next</span>
      </div>
    </div>)
};
