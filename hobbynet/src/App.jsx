import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
import ProfileLanding from './components/Profile/ProfileLanding'
import Footer from './components/Footer'
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();

toast.configure()

function App() {
  const { createUser, createUserGeneral, getInterests, setUserInterests, getConversations, getUserInfo, getUserInterests }
    = helper();

  const userId = cookies.get('user_id')

  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState()
  const [otherUserId, setOtherUserId] = useState();
  const [newMessage, setNewMessage] = useState({});

  const notify = (msg) => {
    toast(msg, {
      position: toast.POSITION.BOTTOM_LEFT
    })
  }
  // socket?.once('incomingMessage', (data) => {
  //   // console.log('timestamp:', new Date().getTime());
  //   if (user.first_name && data.sender_name !== user.first_name) {
  //     setNewMessage({
  //       notify,
  //       data
  //     })
  //     // notify(`${data.sender_name}: ${data.msg}`)
  //   }
  // })


  useEffect(() => {
    if (userId) {
      setSocket(io("ws://localhost:8000", {
        query: {
          userId: userId
        }
      }))
    }

  }, [userId])


  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Navbar />
          <LandingPage />
          <Footer></Footer>
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
          <Footer/>
        </Route>
        <Route path="/sockettest">
          <Navbar />
          <SocketTest />
        </Route>
        <Route path="/search">
          <Navbar notify={notify} socket={socket} />
          <SearchLanding />
          <Search />
          <Footer></Footer>
        </Route>
        <Route path="/viewprofile/:otherUserId">
          <Navbar notify={notify} socket={socket} />
          <Profile getUserInfo={getUserInfo} getUserInterests={getUserInterests} />
        </Route>
        <Route path="/register">
          <Registration createUser={createUser} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Navbar notify={notify} socket={socket} />
          <UserProfile getUserInfo={getUserInfo} getUserInterests={getUserInterests} notify={notify} socket={socket} />
          <Conversations getConversations={getConversations} setOtherUserId={(otherUserId) => setOtherUserId(otherUserId)} />
          <Conversation />
          <Footer></Footer>
        </Route>
        <Route path="/chats" >
          <Navbar />
          <Chats 
            otherUserId={otherUserId} 
            socket={socket} 
            getConversations={getConversations}
            setOtherUserId={setOtherUserId} />
            <Footer></Footer>
        </Route>
        <Route path="/messenger">
          <Navbar />
          <Conversation />
          <Footer></Footer>
        </Route>
        <Route path="/profile">
          <Navbar />
          <ProfileLanding/>
          <MyProfile getUserInfo={getUserInfo} />
          <Footer></Footer>
        </Route>

      </Switch>
    </main>
  );
}

export default App;
