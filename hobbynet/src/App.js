import Registration from './components/Registration';
import Navbar from './components/Navbar';
import React, {useState} from 'react';

function App() {

  const [conversations, setConversations] = useState([]);

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

  return (
    <div>
      <Navbar/>
      <Registration />
    </div>
  );
}

export default App;
