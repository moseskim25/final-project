import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import '../styles/Chats.scss';

export default function Main() {

  const location = useLocation();
  const userId = location.state.userId;
  const otherUserId = location.state.otherUserId;

  const [conversation, setConversation] = useState([]);
  // console.log('conversation is:', conversation);

  const createConvo = () => {
    axios.post(`http://localhost:8000/chats/new`, { userId, otherUserId })
      .then(res => {
        // console.log("res.data client side", res.data);
        setConversation(res.data[0].id)
      })
  }

  const getConvoId = () => {
    axios.get(`http://localhost:8000/chats/verify/${userId}/${otherUserId}`)
      .then(res => {
        if (res.data.length === 0) {
          createConvo()
        } else {
          getConvoMessages()
        }
      })
  }

  const getConvoMessages = () => {
    return axios.get(`http://localhost:8000/chats/${userId}/${otherUserId}`)
      .then(res => {
        setConversation(res.data);
      })
  }

  // BUG: inserts new conversation for the same two people every time if a message is not sent
  useEffect(() => {
    getConvoId()
    // return axios.get(`http://localhost:8000/chats/${userId}/${otherUserId}`)
    //   .then((res) => {
    //     if (res.data.length === 0) {
    //       createPendingChat()
    //     } else {
    //       setConversation(res.data);
    //     }
    //   })
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    return axios.post(`http://localhost:8000/chats/${conversation[0].conversations_id}/${userId}`, { message })
  }

  const displayConversation = Array.isArray(conversation) && conversation.map(msg => {

    if (msg.sender_id === userId) {
      return (
        <li class="me">
          <div class="entete">
            <span class="status blue"></span>
            <h2>{msg.sender_first_name} {msg.sender_last_name}</h2>
            <h3>{msg.time}</h3>
          </div>
          <div class="triangle"></div>
          <div class="message">
            {msg.text}
          </div>
        </li>
      )
    } else {
      return (<li class="you">
        <div class="entete">
          <span class="status green"></span>
          <h2>{msg.sender_first_name} {msg.sender_last_name}</h2>
          <h3>{msg.time}</h3>
        </div>
        <div class="triangle"></div>
        <div class="message">
          {msg.text}
        </div>
      </li>)
    }

  })

  return (
    <div id="container">
      <aside>
        <header>
          <input type="text" placeholder="search" />
        </header>
        <ul>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status orange"></span>
                offline
              </h3>
            </div>
          </li>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status green"></span>
                online
              </h3>
            </div>
          </li>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_03.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status orange"></span>
                offline
              </h3>
            </div>
          </li>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_04.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status green"></span>
                online
              </h3>
            </div>
          </li>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_05.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status orange"></span>
                offline
              </h3>
            </div>
          </li>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_06.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status green"></span>
                online
              </h3>
            </div>
          </li>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_07.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status green"></span>
                online
              </h3>
            </div>
          </li>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_08.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status green"></span>
                online
              </h3>
            </div>
          </li>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_09.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status green"></span>
                online
              </h3>
            </div>
          </li>
          <li>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_10.jpg" alt="" />
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status orange"></span>
                offline
              </h3>
            </div>
          </li>
        </ul>
      </aside>
      <main>
        <header>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
          <div>
            <h2>Chat with Vincent Porter</h2>
            <h3>already 1902 messages</h3>
          </div>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt="" />
        </header>
        <ul id="chat">
          {displayConversation}
        </ul>
        <footer>
          <form onSubmit={onSubmit}>
            <input placeholder="Type your message" name='message'></input>
            <div>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" />
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" />
              <button type='submit'>Send</button>
            </div>
          </form>
        </footer>
      </main>
    </div>
  )
}