import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Center } from '@chakra-ui/react'
import Cookies from 'universal-cookie'
import Conversation from './Conversation'

const cookies = new Cookies();

export default function Conversations({ getConversations, clickConvo }) {

  const user_id = Number(cookies.get('user_id'));
  const [conversations, setConversations] = useState([]);
  

  const uniqueConversations = () => {
    const output = [];
    conversations.forEach(conversation => {
      const id = conversation.conversations_id;
      if (output.indexOf(id) === -1) {
        output.push(id)
      }
    });
    return output;
  }
  const conversationIds = uniqueConversations();

  const chat = () => {
    const output = conversationIds.map(conversationId => conversations.filter(conversation => {
      return conversationId === conversation.conversations_id
    }))

    return output;
  }
  const conversationsArray = chat();

  const displayConversations = conversationsArray.map(conversation => {
    const convo = conversation[0];
    const otherUserId = convo.user1_id === user_id ? convo.user2_id : convo.user1_id;
    const otherUser = conversation[0].user1_id === user_id ? `${conversation[0].user2_first_name} ${conversation[0].user2_last_name}` : `${conversation[0].user1_first_name} ${conversation[0].user1_last_name}`;
    const otherUserImgUrl = `${conversation[0].profile_image}`;
    const lastMessage = `${conversation[conversation.length - 1].first_name} ${conversation[conversation.length - 1].last_name}: ${conversation[conversation.length - 1].text}`;
    return(
      <Link to={`/chats/${user_id}/${otherUserId}`}>
        <Center>
          <Conversation 
            key={otherUser} 
            name={otherUser} 
            lastMessage={lastMessage} 
            img={otherUserImgUrl}
            />
        </Center>
      </Link>
    )
  })


  useEffect(() => {
    getConversations(user_id)
    .then(res => {
      setConversations(res.data)
    })
    .catch(err => console.error(err))
  }, []);


  return (
    <div>
      {displayConversations}
    </div>
  );
};