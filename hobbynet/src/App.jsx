import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
// import { useParams } from 'react-router';

import helper from "./hooks/helper";

import Registration from "./components/Registration";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Card from "./components/Card";
import UserProfile from "./components/UserProfile";
import Conversations from "./components/Conversations";
import Search from "./components/SearchText/Search"
import Chats from './components/Chat/Chats';
import Conversation from "./components/Conversation"
import SocketTest from "./components/SocketTest"
import Profile from "./components/Profile"
import AniText from "./components/SearchText/AniText"
import SearchLanding from "./components/SearchText/SearchLanding"

function App() {
  const { createUser, createUserGeneral, getInterests, setUserInterests, getConversations, getUserInfo, getUserInterests }
    = helper();

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Navbar />
          <LandingPage />
        </Route>
        <Route path="/register">
          <Navbar />
          <Registration
            createUser={createUser}
            createUserGeneral={createUserGeneral}
            getInterests={getInterests}
            setUserInterests={setUserInterests} />
        </Route>
        <Route path="/testpath">
          <UserProfile />
          <Card />
        </Route>
        <Route path="/sockettest">
          <Navbar />
          <SocketTest />
        </Route>
        <Route path="/search">
          <SearchLanding/>
          <Search />
        </Route>
        <Route path="/viewprofile/:userId">
          <Navbar />
          <Profile getUserInfo={getUserInfo} getUserInterests={getUserInterests} />
        </Route>
        <Route path="/register">
          <Registration createUser={createUser} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Navbar />
          <UserProfile getUserInfo={getUserInfo} getUserInterests={getUserInterests} />
          <Conversations getConversations={getConversations} />
          <Conversation />
        </Route>
        <Route path="/chats">
          <Navbar />
          <Chats />
        </Route>
        <Route path="/messenger">
          <Navbar />
          <Conversation />
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
