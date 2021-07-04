import Registration from './components/Registration';
import Navbar from './components/Navbar';
import React, {useState, useEffect} from 'react';
import { createUser } from './hooks/helper';

function App() {

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch('http://localhost:8000/conversations');
        const data = await response.json();
        setConversations(data.rows);
        console.log('data:', data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getConversations();

  }, [])

  return (
    <div>
      <Navbar/>
      <Registration createUser={createUser} />
    </div>
  );
}

export default App;
