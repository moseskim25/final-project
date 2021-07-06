insert into conversations (user1_id, user2_id, messages) values (1, 2, '[
  {
    "timestamp": "2021-07-03 11:13:44",
    "sender_id": "1",
    "text": "Hi there! this is the first message"
  },
  {
    "timestamp": "2021-07-03 11:14:06",
    "sender_id": "2",
    "text": "Hello from user 2, this is the second message"
  }
]');

insert into conversations (user1_id, user2_id, messages) values (2, 4, '[
  {
    "timestamp": "2021-07-03 11:13:44",
    "sender_id": "2",
    "text": "Second message"
  },
  {
    "timestamp": "2021-07-03 11:14:06",
    "sender_id": "4",
    "text": "what do you want"
  }
]');


insert into conversations (user1_id, user2_id, messages) values (3, 4, '[
  {
    "timestamp": "2021-07-04 11:20:44",
    "sender_id": "3",
    "text": "Hi from user 3! this is the first message"
  },
  {
    "timestamp": "2021-07-04 11:21:06",
    "sender_id": "4",
    "text": "Hello from user 4, this is the second message"
  }
]');
