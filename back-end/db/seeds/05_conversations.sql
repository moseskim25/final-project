insert into conversations (user1_id, user2_id, messages) values (1, 2, '{
  "1": {
    "timestamp": "2021-07-03 11:13:44",
    "sender_id": "1",
    "text": "Hi there! this is the first message"
  },
  "2": {
    "timestamp": "2021-07-03 11:14:06",
    "sender_id": "2",
    "text": "Hello from user 2, this is the second message"
  }
}');
insert into conversations (id, user1_id, user2_id, messages) values (2, 3, 4, '{
  "1": {
    "timestamp": "2021-07-04 11:20:44",
    "sender_id": "3",
    "text": "Hi from user 3! this is the first message"
  },
  "2": {
    "timestamp": "2021-07-04 11:21:06",
    "sender_id": "4",
    "text": "Hello from user 4, this is the second message"
  }
}');
