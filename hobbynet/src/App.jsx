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
import HomePage from './components/HomePage';
const cookies = new Cookies();

toast.configure()

function App() {
  const {
    createUser,
    createUserGeneral,
    getInterests,
    setUserInterests,
    getConversations,
    getUserInfo,
    getUserInterests,
    getAllUsersInfo
  }
    = helper();

  const userId = cookies.get('user_id')

  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState()
  const [otherUserId, setOtherUserId] = useState();
  const [newMessage, setNewMessage] = useState({});
  const [allUsersInfo, setAllUsersInfo] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  const notify = (msg) => {
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_LEFT
    })
  }

  useEffect(() => {
    if (userId) {
      setSocket(io("ws://localhost:8000", {
        query: {
          userId: userId
        }
      }))
    }

  }, [userId])

  useEffect(() => {
    socket?.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [socket])


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
          <Footer />
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
          <Profile
            getUserInfo={getUserInfo}
            getUserInterests={getUserInterests}
            setOtherUserId={setOtherUserId}
            allUsersInfo={allUsersInfo}
          />
        </Route>
        <Route path="/register">
          <Registration createUser={createUser} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Navbar notify={notify} socket={socket} />
          <HomePage
            getUserInfo={getUserInfo}
            getUserInterests={getUserInterests}
            notify={notify}
            socket={socket}
            getConversations={getConversations}
            setOtherUserId={(otherUserId) => setOtherUserId(otherUserId)}
            getAllUsersInfo={(conversations, userId) => {
              getAllUsersInfo(conversations, userId)
                .then((res) => {
                  setAllUsersInfo(res.data);
                })
            }}
            allUsersInfo={allUsersInfo}
            setAllUsersInfo={setAllUsersInfo} />
          <Footer></Footer>
        </Route>
        <Route path="/chats" >
          <Navbar />
          <Chats
            otherUserId={otherUserId}
            socket={socket}
            getConversations={getConversations}
            setOtherUserId={setOtherUserId}
            onlineUsers={onlineUsers}
            getAllUsersInfo={getAllUsersInfo}
            allUsersInfo={allUsersInfo}
            setAllUsersInfo={setAllUsersInfo}
          />
        </Route>
        <Route path="/messenger">
          <Navbar />
          <Conversation />
          <Footer></Footer>
        </Route>
        <Route path="/profile">
          <Navbar />
          <ProfileLanding />
          <MyProfile getUserInfo={getUserInfo} />
          <Footer></Footer>
        </Route>

      </Switch>
    </main>
  );
}

export default App;
