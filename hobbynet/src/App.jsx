import React, { useState, useEffect } from 'react';
import { createUser } from './hooks/helper';
import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Registration from './components/Registration';
import LandingPage from './components/LandingPage';
import axios from 'axios';

function App() {

  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null)

  const login = () => {
    axios.post('http://localhost:8000/login').then(res => setUser(res.data))
  }


  useEffect(() => {
    const getUserB = async () => {
      try {
        const response = await fetch('http://localhost:8000/users');
        const data = await response.json();
        setUser(data.rows);
      } catch (err) {
        console.log(err.message);
      }
    }
  })

  return (
    <main>
      <Switch>
        <Route path='/' exact>
          <Navbar />
          <Registration createUser={createUser} />
        </Route>
        <Route path='/hello'>
          <p>why</p>
        </Route>
      </Switch>
    </main>
  );
}

export default App;


// useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/conversations');
  //       const data = await response.json();
  //       setConversations(data.rows);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   }
  //   getConversations();

  // }, [])
