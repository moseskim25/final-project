import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { io } from "socket.io-client";

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
import Conversation from "./components/Conversation";
import SocketTest from "./components/Sockets/SocketHelper";
import MyProfile from './components/Profile/MyProfile';
import Profile from "./components/Profile"
import AniText from "./components/SearchText/AniText"
import SearchLanding from "./components/SearchText/SearchLanding";
import SocketHelper from './components/Sockets/SocketHelper';
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();

function App() {

  const { createUser, createUserGeneral, getInterests, setUserInterests, getConversations, getUserInfo, getUserInterests }
    = helper();

  const userId = cookies.get('user_id')

  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState()
  const [otherUserId, setOtherUserId] = useState();

  useEffect(() => {
    setSocket(io("ws://localhost:8000", {
      query: {
        userId: userId
      }
    }))

  }, [])


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
          <Navbar />
          <SearchLanding />
          <Search />
        </Route>
        <Route path="/viewprofile/:otherUserId">
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
          <Conversations getConversations={getConversations} setOtherUserId={(otherUserId) => setOtherUserId(otherUserId)} />
          <Conversation />
        </Route>
        <Route path="/chats" >
          <Navbar />
          <Chats otherUserId={otherUserId} socket={socket} />
        </Route>
        <Route path="/messenger">
          <Navbar />
          <Conversation />
        </Route>
        <Route path="/profile">
          <Navbar />
          <MyProfile getUserInfo={getUserInfo} />
        </Route>

      </Switch>
    </main>
  );
}

export default App;
