import React, { useState, useEffect } from 'react';
import { createUser } from './hooks/helper';
import axios from 'axios';

import Registration from './components/Registration';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
import Card from './components/Card';
import { Switch, Route } from 'react-router-dom';

function App() {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null)

  const login = () => {
    axios.post('/api/login').then(res => setUser(res.data))
  }

  return (
    <main>
      <Switch>
        <Route path='/' exact>
          <Navbar />
          <LandingPage />
        </Route>
        <Route path='/testpath'>
          <Card />
        </Route>
        <Route path='/register'>
          <Registration createUser={createUser} />
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


  // useEffect(() => {
  //   const getUserBy = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/users');
  //       const data = await response.json();
  //       setUser(data.rows);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   }
  // })