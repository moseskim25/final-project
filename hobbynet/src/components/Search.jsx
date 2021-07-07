import React, { useState, useEffect } from 'react';
import axios from 'axios'

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

  // Now we call our hook, passing in the current searchTerm value.
  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  // Otherwise, it will return the previous value of searchTerm.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Here's where the API call happens
  // We use useEffect since this is an asynchronous action
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Set isSearching state
        setIsSearching(true);
        // Fire off our API call
        searchCharacters(debouncedSearchTerm).then(results => {
          // Set back to false since request finished
          setIsSearching(false);
          // Set results state
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );

  // Pretty standard UI with search input and results
  return (
    <div>
      <input
        placeholder="Search The DB"
        onChange={e => setSearchTerm(e.target.value)}
      />

      {isSearching && <div>Searching ...</div>}

      {results.map(result => (
        <div key={result.id}>
          {result.first_name}
        </div>
      ))}
    </div>
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