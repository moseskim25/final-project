import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import Conversation from "./Conversation";
import './styles/Conversations.scss';

const cookies = new Cookies();

export default function Conversations({ getConversations, setOtherUserId, socket, getAllUsersInfo, allUsersInfo, setAllUsersInfo }) {

  let history = useHistory();
  const user_id = Number(cookies.get("user_id"));
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    socket?.on('incomingMessage', (data) => {
      // setConversations([...prev])
      });
  }, [])

  useEffect(() => {
    getConversations(user_id)
      .then((res) => {
        setConversations(res.data);
        getAllUsersInfo(res.data)
          .then(res => {
            setAllUsersInfo(res.data);
          })
      })
      .catch((err) => console.error(err));
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

  const handleOnClick = (otherUserId) => {
    setOtherUserId(otherUserId);
    history.push('/chats');
  };

  const displayConversations = conversationsArray.map((conversation) => {

    const convo = conversation[0];
    const otherUserId = convo.user1_id === user_id ? convo.user2_id : convo.user1_id;
    const otherUser = convo.user1_id === user_id ? `${convo.user2_first_name} ${convo.user2_last_name}` : `${convo.user1_first_name} ${convo.user1_last_name}`;

    const img = allUsersInfo[Number(otherUserId)] && allUsersInfo[Number(otherUserId)].profile_image;

    const lastMessage = `${conversation[conversation.length - 1].first_name} ${conversation[conversation.length - 1].last_name}: ${conversation[conversation.length - 1].text}`;
    return (
      <div onClick={() => handleOnClick(otherUserId)} _hover={{ opacity: 0.75 }} key={otherUserId}>
        <Conversation key={otherUser} name={otherUser} lastMessage={lastMessage} img={img}/>
      </div>
    );
  });



  return (<div className='conversations-container'>{displayConversations}</div>);
}
