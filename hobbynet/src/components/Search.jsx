import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Select, Checkbox, Center, Link } from "@chakra-ui/react"
import { arrayOf } from 'prop-types';
import SearchProfile from './SearchProfile'

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

  const [category, setCategory] = useState(['academics', 'arts', 'languages', 'music', 'sports']);
  const [level, setLevel] = useState(["1", "2", "3", "4", "5"]);

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

  console.log(results);
  // Here's where the API call happens
  // We use useEffect since this is an asynchronous action
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      getAll().then(results => {
        results = results.slice(0, 10)
        results = results.filter(result => category.indexOf(String(result.name)) > -1)
        results = results.filter(result => level.indexOf(String(result.level)) > -1)
        setResults(results)
      })
      if (debouncedSearchTerm) {
        setIsSearching(true);
        getAll().then(results => {
          setResults([])
          console.log(results)
          results = results.filter(result => category.indexOf(String(result.name)) > -1)
          results = results.filter(result => level.indexOf(String(result.level)) > -1)
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
    [debouncedSearchTerm, category, level]
  );

  // Pretty standard UI with search input and results
  return (
    <>
      <Center>
        <Checkbox
          defaultIsChecked
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
          defaultIsChecked
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
          defaultIsChecked
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
          defaultIsChecked
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
          defaultIsChecked
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
      </Center>
      <Center>
        <Checkbox
          defaultIsChecked
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
          defaultIsChecked
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
          defaultIsChecked
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
          defaultIsChecked
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
          defaultIsChecked
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
      </Center>

      <div>
        <input
          placeholder="Search The DB"
          onChange={e => setSearchTerm(e.target.value)}
        />

        {isSearching && <div>Searching ...</div>}

        {results.map(result => (
          <Link href={`/viewprofile/${result.user_id}`}>
            <SearchProfile key={result.id}
              firstName={result.first_name}
              lastName={result.last_name}
              interest={result.interestname}
              category={result.name}
              level={result.level}
              img={result.profile_image}
            />
          </Link>
        ))}
      </div>
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