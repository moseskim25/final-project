import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Select, Checkbox, Center, Input, Spinner, Button, Stack } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { arrayOf } from 'prop-types';
import SearchProfile from './SearchProfile'
import { Link } from 'react-router-dom'

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below). 
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value]
  );

  return debouncedValue;
}
// Usage
export default function Search() {
  // State and setter for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State and setter for search results
  const [results, setResults] = useState([]);
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const [category, setCategory] = useState([]);
  const [showCategories, setShowCategories] = useState(false)
  const [showLevels, setShowLevels] = useState(false)
  const [level, setLevel] = useState([]);
  const [cities, setCities] = useState([]);
  const [showCities, setShowCities] = useState(false)

  // Now we call our hook, passing in the current searchTerm value.
  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  // Otherwise, it will return the previous value of searchTerm.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const removeFromStateArr = (value, arr) => {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== value) {
        newArr.push(arr[i])
      }
    }
    return newArr
  }
  // Here's where the API call happens
  // We use useEffect since this is an asynchronous action
  useEffect(
    () => {
      // if (document.getElementsByClassName('input')[0]) {
      //   document.getElementsByClassName('input')[0].defaultValue = capitalizeFirstLetter(window.location.href.slice(29));
      //   setSearchTerm(capitalizeFirstLetter(window.location.href.slice(29)));
      // } 
      console.log(category)
      console.log(level)
      // Make sure we have a value (user has entered something in input)
      getAll().then(results => {
        let filteredResults = [];
        if (category.length === 0 && level.length === 0) {
          filteredResults = results
        } else if (category.length === 0) {
          results = results.filter(result => level.indexOf(String(result.level)) > -1)
          filteredResults = results
        } else if (level.length === 0) {
          results = results.filter(result => category.indexOf(String(result.name)) > -1)
          filteredResults = results
        } else {
          results = results.filter(result => level.indexOf(String(result.level)) > -1)
          results = results.filter(result => category.indexOf(String(result.name)) > -1)
          filteredResults = results
        }
        if (cities.length === 0) {
          setResults(filteredResults)
        } else {
          filteredResults = results.filter(result => cities.indexOf(String(result.city)) > -1)
          setResults(filteredResults)
        }
      })
      if (debouncedSearchTerm) {
        setIsSearching(true);
        getAll().then(results => {
          setResults([])
          if (category.length === 0 && level.length === 0) {
          } else if (category.length === 0) {
            results = results.filter(result => level.indexOf(String(result.level)) > -1)
          } else if (level.length === 0) {
            results = results.filter(result => category.indexOf(String(result.name)) > -1)
          } else {
            results = results.filter(result => level.indexOf(String(result.level)) > -1)
            results = results.filter(result => category.indexOf(String(result.name)) > -1)
          }
          if (cities.length !== 0) {
            results = results.filter(result => cities.indexOf(String(result.city)) > -1)
          }
          results = results.filter(result => result.first_name.indexOf(debouncedSearchTerm) > -1 || result.last_name.indexOf(debouncedSearchTerm) > -1 || result.interestname.indexOf(debouncedSearchTerm) > -1)
          setResults(results)
          setIsSearching(false);
        })
      } else {
        setResults([]);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm, category, level, cities]
  );

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  // Pretty standard UI with search input and results
  return (
    <>
      <Center direction="column" mb="10px">
        <Stack>
          <Input
            w={[500, 600, 700]}
            size="lg"
            placeholder="Find your next hobby study buddy..."
            onChange={e => setSearchTerm(e.target.value)}
            className='input'
          />
          <Stack direction="row">
            <Button size="xs" w="15%" padding="5px" fontSize={[8, 10, 12, 14]} onClick={() => { setShowCategories(!showCategories) }}>Categories<ChevronDownIcon /></Button>
            <Stack position={'absolute'}>
              {showCategories && <Stack position={'absolute'} left="-20px" top="30px" bg="white" zIndex='5' rounded="md" border="1px" borderColor="gray.200" padding="10px">
                <Checkbox
                  isChecked={category.indexOf("academics") >= 0 ? true : false}
                  mr="10px"
                  value="academics"
                  onChange={(e) => {
                    if (category.indexOf(e.target.value) < 0) {
                      setCategory(prev => [...prev, e.target.value])
                    } else {
                      let newCategory = removeFromStateArr(e.target.value, category)
                      setCategory(newCategory)
                    }
                  }}
                >
                  Academics
                </Checkbox>
                <Checkbox
                  isChecked={category.indexOf("arts") >= 0 ? true : false}
                  mr="10px"
                  value="arts"
                  onChange={(e) => {
                    if (category.indexOf(e.target.value) < 0) {
                      setCategory(prev => [...prev, e.target.value])
                    } else {
                      let newCategory = removeFromStateArr(e.target.value, category)
                      setCategory(newCategory)
                    }
                  }}
                >
                  Arts
                </Checkbox>
                <Checkbox
                  isChecked={category.indexOf("languages") >= 0 ? true : false}
                  mr="10px"
                  value="languages"
                  onChange={(e) => {
                    if (category.indexOf(e.target.value) < 0) {
                      setCategory(prev => [...prev, e.target.value])
                    } else {
                      let newCategory = removeFromStateArr(e.target.value, category)
                      setCategory(newCategory)
                    }
                  }}
                >
                  Languages
                </Checkbox>
                <Checkbox
                  isChecked={category.indexOf("music") >= 0 ? true : false}
                  mr="10px"
                  value="music"
                  onChange={(e) => {
                    if (category.indexOf(e.target.value) < 0) {
                      setCategory(prev => [...prev, e.target.value])
                    } else {
                      let newCategory = removeFromStateArr(e.target.value, category)
                      setCategory(newCategory)
                    }
                  }}
                >
                  Music
                </Checkbox>
                <Checkbox
                  isChecked={category.indexOf("sports") >= 0 ? true : false}
                  value="sports"
                  onChange={(e) => {
                    if (category.indexOf(e.target.value) < 0) {
                      setCategory(prev => [...prev, e.target.value])
                    } else {
                      let newCategory = removeFromStateArr(e.target.value, category)
                      setCategory(newCategory)
                    }
                  }}
                >
                  Sports
                </Checkbox>
              </Stack>}
            </Stack>
            <Button size="xs" w="12%" fontSize={[8, 10, 12, 14]} onClick={() => { setShowLevels(!showLevels) }}>Levels<ChevronDownIcon /></Button>
            <Stack position={'absolute'} w="100%">
              {showLevels && <Stack position={'absolute'} left="99px" top="30px" bg="white" zIndex='5' rounded="md" border="1px" borderColor="gray.200" padding="10px">
                <Checkbox
                  isChecked={level.indexOf("1") >= 0 ? true : false}
                  value="1"
                  onChange={(e) => {
                    if (level.indexOf(e.target.value) < 0) {
                      setLevel(prev => [...prev, e.target.value])
                    } else {
                      let newLevel = removeFromStateArr(e.target.value, level)
                      setLevel(newLevel)
                    }
                  }}
                >
                  Level 1
                </Checkbox>
                <Checkbox
                  isChecked={level.indexOf("2") >= 0 ? true : false}
                  value="2"
                  onChange={(e) => {
                    if (level.indexOf(e.target.value) < 0) {
                      setLevel(prev => [...prev, e.target.value])
                    } else {
                      let newLevel = removeFromStateArr(e.target.value, level)
                      setLevel(newLevel)
                    }
                  }}
                >
                  Level 2
                </Checkbox>
                <Checkbox
                  isChecked={level.indexOf("3") >= 0 ? true : false}
                  value="3"
                  onChange={(e) => {
                    if (level.indexOf(e.target.value) < 0) {
                      setLevel(prev => [...prev, e.target.value])
                    } else {
                      let newLevel = removeFromStateArr(e.target.value, level)
                      setLevel(newLevel)
                    }
                  }}
                >
                  Level 3
                </Checkbox>
                <Checkbox
                  isChecked={level.indexOf("4") >= 0 ? true : false}
                  value="4"
                  onChange={(e) => {
                    if (level.indexOf(e.target.value) < 0) {
                      setLevel(prev => [...prev, e.target.value])
                    } else {
                      let newLevel = removeFromStateArr(e.target.value, level)
                      setLevel(newLevel)
                    }
                  }}
                >
                  Level 4
                </Checkbox>
                <Checkbox
                  isChecked={level.indexOf("5") >= 0 ? true : false}
                  value="5"
                  onChange={(e) => {
                    if (level.indexOf(e.target.value) < 0) {
                      setLevel(prev => [...prev, e.target.value])
                    } else {
                      let newLevel = removeFromStateArr(e.target.value, level)
                      setLevel(newLevel)
                    }
                  }}
                >
                  Level 5
                </Checkbox>
              </Stack>}
            </Stack>
            <Button size="xs" w="12%" fontSize={[8, 10, 12, 14]} onClick={() => { setShowCities(!showCities) }}>Cities<ChevronDownIcon /></Button>
            <Stack position={'absolute'} w="100%">
              {showCities && <Stack position={'absolute'} left="178px" top="30px" bg="white" zIndex='5' rounded="md" border="1px" borderColor="gray.200" padding="10px">
                <Checkbox
                  isChecked={cities.indexOf("Toronto") >= 0 ? true : false}
                  value="Toronto"
                  onChange={(e) => {
                    if (cities.indexOf(e.target.value) < 0) {
                      setCities(prev => [...prev, e.target.value])
                    } else {
                      let newCities = removeFromStateArr(e.target.value, cities)
                      setCities(newCities)
                    }
                  }}
                >
                  Toronto
                </Checkbox>
                <Checkbox
                  isChecked={cities.indexOf("Montreal") >= 0 ? true : false}
                  value="Montreal"
                  onChange={(e) => {
                    if (cities.indexOf(e.target.value) < 0) {
                      setCities(prev => [...prev, e.target.value])
                    } else {
                      let newCities = removeFromStateArr(e.target.value, cities)
                      setCities(newCities)
                    }
                  }}
                >
                  Montreal
                </Checkbox>
                <Checkbox
                  isChecked={cities.indexOf("Vancouver") >= 0 ? true : false}
                  value="Vancouver"
                  onChange={(e) => {
                    if (cities.indexOf(e.target.value) < 0) {
                      setCities(prev => [...prev, e.target.value])
                    } else {
                      let newCities = removeFromStateArr(e.target.value, cities)
                      setCities(newCities)
                    }
                  }}
                >
                  Vancouver
                </Checkbox>
                <Checkbox
                  isChecked={cities.indexOf("Calgary") >= 0 ? true : false}
                  value="Calgary"
                  onChange={(e) => {
                    if (cities.indexOf(e.target.value) < 0) {
                      setCities(prev => [...prev, e.target.value])
                    } else {
                      let newCities = removeFromStateArr(e.target.value, cities)
                      setCities(newCities)
                    }
                  }}
                >
                  Calgary
                </Checkbox>
                <Checkbox
                  isChecked={cities.indexOf("Edmonton") >= 0 ? true : false}
                  value="Edmonton"
                  onChange={(e) => {
                    if (cities.indexOf(e.target.value) < 0) {
                      setCities(prev => [...prev, e.target.value])
                    } else {
                      let newCities = removeFromStateArr(e.target.value, cities)
                      setCities(newCities)
                    }
                  }}
                >
                  Edmonton
                </Checkbox>
                <Checkbox
                  isChecked={cities.indexOf("Halifax") >= 0 ? true : false}
                  value="Halifax"
                  onChange={(e) => {
                    if (cities.indexOf(e.target.value) < 0) {
                      setCities(prev => [...prev, e.target.value])
                    } else {
                      let newCities = removeFromStateArr(e.target.value, cities)
                      setCities(newCities)
                    }
                  }}
                >
                  Halifax
                </Checkbox>
                <Checkbox
                  isChecked={cities.indexOf("Ottawa") >= 0 ? true : false}
                  value="Ottawa"
                  onChange={(e) => {
                    if (cities.indexOf(e.target.value) < 0) {
                      setCities(prev => [...prev, e.target.value])
                    } else {
                      let newCities = removeFromStateArr(e.target.value, cities)
                      setCities(newCities)
                    }
                  }}
                >
                  Ottawa
                </Checkbox>
              </Stack>}
            </Stack>
          </Stack>
        </Stack>
      </Center>
      {isSearching && <Center><Spinner mr="10px" />Searching...</Center>}

      {results.map(result => (
        <Center>
          <Link onClick={() => window.location.replace(`/viewprofile/${result.user_id}`)} >
            <SearchProfile key={result.id}
              firstName={result.first_name}
              lastName={result.last_name}
              interest={result.interestname}
              category={result.name}
              level={result.level}
              img={result.profile_image}
              city={result.city} 
            />
          </Link>
        </Center>
      ))}
    </>
  );
}

// API search function
function searchCharacters(search) {
  return axios.get(`http://localhost:8000/search/${search}`)
    .then(res => res.data)
    .catch(error => {
      console.error(error);
      return [];
    });
}

function getAll() {
  return axios.get('http://localhost:8000/search/a')
    .then(res => res.data)
    .catch(error => {
      console.error(error);
      return [];
    });
}



// import React, { useState, useEffect } from 'react';
// import axios from 'axios'

// import {
//   Stack,
//   Center,
//   Input,
//   Box,
//   Flex,
//   Text
// } from '@chakra-ui/react';

// export default function Search(props){
//   return (
//     <Center>
//       <Stack w={'4xl'}>
//         <Flex>
//           <Text>HELLO!</Text>
//         </Flex>
//         <Input>
//         </Input>
//       </Stack>
//     </Center>
//   )
// }