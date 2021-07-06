import React, { useState, useEffect } from "react";
import { createUser } from "./hooks/helper";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import helper from "./hooks/helper";

import Registration from "./components/Registration";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Card from "./components/Card";
import UserProfile from "./components/UserProfile";
import Conversations from "./components/Conversations";

function App() {
  const { createUser, createUserGeneral, getInterests, getUserInfo } = helper();
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Navbar />
          <LandingPage />
        </Route>
        <Route path="/register">
          <Navbar />
          <Registration createUser={createUser} createUserGeneral={createUserGeneral} getInterests={getInterests} />
        </Route>
        <Route path="/testpath">
          <UserProfile />
          <Card />
        </Route>
        <Route path="/register">
          <Registration createUser={createUser} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Navbar />
          <UserProfile />
          <Conversations getUserInfo={getUserInfo}/>
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