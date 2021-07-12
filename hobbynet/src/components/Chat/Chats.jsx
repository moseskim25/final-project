import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import * as timeago from "timeago.js";
import "./Chats.scss";

const cookies = new Cookies();

export default function Main({ otherUserId, socket, getConversations, setOtherUserId, allUsersInfo, onlineUsers }) {
  let history = useHistory();
  const userId = Number(cookies.get("user_id"));

  const [conversation, setConversation] = useState([]);
  const [conversationId, setConversationId] = useState();
  const [user, setUser] = useState({});
  const [otherUserInfo, setOtherUser] = useState({});
  const [conversations, setConversations] = useState([]);
  const [online, setOnline] = useState(onlineUsers);

  useEffect(() => {
    socket?.on("incomingMessage", (data) => {
      setConversation((prev) => [
        ...prev,
        {
          sender_id: data.sender_id,
          sender_first_name: data.sender_first_name,
          sender_last_name: data.sender_last_name,
          text: data.msg,
          time: new Date().getTime(),
        },
      ]);
    });

    socket?.on("onlineUsers", (users) => {
      setOnline(users);
    })

  }, [socket]);

  useEffect(() => {

    otherUserId && getConvoId();
    getUserInfo(userId);
    otherUserId && getOtherUserInfo(otherUserId);

    getConversations(userId)
      .then((res) => {
        setConversations(res.data);
      })
      .catch((err) => console.error(err));
  }, [otherUserId]);

  useEffect(() => {
    otherUserId && getConvoId();
  }, []);

  //gets all unique conversation ids
  const uniqueConversations = () => {
    const output = [];
    conversations.forEach((conversation) => {
      const id = conversation.conversations_id;
      if (output.indexOf(id) === -1) {
        output.push(id);
      }
    });
    return output;
  };
  const conversationIds = uniqueConversations();

  //grabs all conversations with the unique conversation ids
  const chat = () => {
    const output = conversationIds.map((conversationId) =>
      conversations.filter((conversation) => {
        return conversationId === conversation.conversations_id;
      })
    );
    return output;
  };
  const conversationsArray = chat();

  const getUserInfo = (user_id) => {
    return axios
      .get(`http://localhost:8000/users/${user_id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log("Error: ", err.message));
  };

  const getOtherUserInfo = (user_id) => {
    return axios
      .get(`http://localhost:8000/users/${user_id}`)
      .then((res) => {
        setOtherUser(res.data);
      })
      .catch((err) => console.log("Error: ", err.message));
  };

  const createConvo = () => {
    axios.post(`http://localhost:8000/chats/new`, { userId, otherUserId }).then((res) => {
      setConversationId(res.data[0].id);
    });
  };

  const getConvoId = () => {
    axios.get(`http://localhost:8000/chats/verify/${userId}/${otherUserId}`).then((res) => {
      if (res.data.length === 0) {
        createConvo();
      } else {
        setConversationId(res.data[0].id);
        getConvoMessages();
      }
    });
  };

  const getConvoMessages = () => {
    return axios.get(`http://localhost:8000/chats/${userId}/${otherUserId}`).then((res) => {
      setConversation(res.data);
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    axios.post(`http://localhost:8000/chats/${conversationId}/${userId}`, { message, otherUserId, otherUserInfo, user });
    event.target.message.value = "";
  };

  //displays messages in a chat
  const displayConversation =
    Array.isArray(conversation) &&
    conversation.map((msg) => {

      if (msg.sender_id === Number(userId)) {
        return (
          <li className="me" key={msg.time}>
            <div className="entete">
              <span className="status blue"></span>
              <h2>
                {msg.sender_first_name} {msg.sender_last_name}
              </h2>
              <h3 className="dateSent">{timeago.format(msg.time)}</h3>
            </div>
            <div className="triangle"></div>
            <div className="message">{msg.text}</div>
          </li>
        );
      } else {
        return (
          <li className="you" key={msg.time}>
            <div className="entete">
              <span className="status green"></span>
              <h2>
                {msg.sender_first_name} {msg.sender_last_name}
              </h2>
              <h3 className="dateSent">{timeago.format(msg.time)}</h3>
            </div>
            <div className="triangle"></div>
            <div className="message">{msg.text}</div>
          </li>
        );
      }
    });

  //displays the list of convos on the left of chatbox
  const displayConversationsLeft = conversationsArray
    .filter((conversation) => conversation[0])
    .map((conversation) => {
      const otherUserId = conversation[0].user1_id === userId ? conversation[0].user2_id : conversation[0].user1_id;
      const otherUser = conversation[0].user1_id === userId ? `${conversation[0].user2_first_name} ${conversation[0].user2_last_name}` : `${conversation[0].user1_first_name} ${conversation[0].user1_last_name}`;
      const img = allUsersInfo[Number(otherUserId)] && allUsersInfo[Number(otherUserId)].profile_image;

      return (
        <li
          key={conversation[0].id}
          onClick={() => {
            setOtherUserId(otherUserId);
            history.push("/chats");
          }}
        >
          <img src={img} alt="" className="left-image" />
          <div>
            <h2>{otherUser}</h2>
            <h3>
              <span className={"status " + (online.includes(String(otherUserId)) ? 'green' : 'orange')}></span>
              {online.includes(String(otherUserId)) ? 'online' : 'offline'}
            </h3>
          </div>
        </li>
      );
    });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div id="container">
      <aside>
        <header>
          <input type="text" placeholder="search" />
        </header>
        <ul>{displayConversationsLeft}</ul>
      </aside>
      <main>
        <header>
          <img src={otherUserInfo.profile_image} alt="" className="other-user-image" />
          <div>
            <h2>Chat with {otherUserInfo.first_name}</h2>
            {/* <h3>already 1902 messages</h3> */}
          </div>
          <img src={otherUserInfo.profile_image} alt="" />
        </header>
        <div className="MessagesContainer">
          <ul id="chat">
            {displayConversation}
            <div ref={messagesEndRef}></div>
          </ul>
        </div>
        <footer>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Type your message" name="message"></input>
            <div>
              {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" /> */}
              {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" /> */}
              <button type="submit">Send</button>
            </div>
          </form>
        </footer>
      </main>
    </div>
  );
}
