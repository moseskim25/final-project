import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import Cookies from "universal-cookie";
import Conversation from "./Conversation";
import './styles/Conversations.scss';

const cookies = new Cookies();

export default function Conversations({ getConversations, setOtherUserId, socket }) {

  let history = useHistory();
  const user_id = Number(cookies.get("user_id"));
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    socket?.on('incomingMessage', (data) => {
      // setConversations([...prev])
      });
  }, [])


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

  const handleOnClick = (otherUserId) => {
    setOtherUserId(otherUserId);
    history.push('/chats');
  };

  const displayConversations = conversationsArray.map((conversation) => {
    const convo = conversation[0];
    const otherUserId = convo.user1_id === user_id ? convo.user2_id : convo.user1_id;
    const otherUser = conversation[0].user1_id === user_id ? `${conversation[0].user2_first_name} ${conversation[0].user2_last_name}` : `${conversation[0].user1_first_name} ${conversation[0].user1_last_name}`;
    const otherUserImgUrl = `${conversation[0].profile_image}`;
    const lastMessage = `${conversation[conversation.length - 1].first_name} ${conversation[conversation.length - 1].last_name}: ${conversation[conversation.length - 1].text}`;
    return (
      <div onClick={() => handleOnClick(otherUserId)} _hover={{ opacity: 0.75 }}>
        <Conversation key={otherUser} name={otherUser} lastMessage={lastMessage} img={otherUserImgUrl} />
      </div>
    );
  });

  useEffect(() => {
    getConversations(user_id)
      .then((res) => {
        setConversations(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (<div className='conversations-container'>{displayConversations}</div>);
}
