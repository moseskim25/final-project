import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie'
import Conversation from './Conversation'

const cookies = new Cookies();

export default function Conversations({ getConversations }) {

  const user_id = Number(cookies.get('user_id'));
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  

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
  console.log('conversationsArray', conversationsArray);

  const displayConversations = conversationsArray.map(conversation => {
    const otherUser = conversation[0].user1_id === user_id ? `${conversation[0].user2_first_name} ${conversation[0].user2_last_name}` : `${conversation[0].user1_first_name} ${conversation[0].user1_last_name}`;
    const lastMessage = `${conversation[conversation.length - 1].first_name} ${conversation[conversation.length - 1].last_name}: ${conversation[conversation.length - 1].text}`;
    return(
        <Conversation key={otherUser} name={otherUser} lastMessage={lastMessage}/>
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