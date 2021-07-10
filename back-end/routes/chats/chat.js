const express = require('express');
const router = express.Router();

module.exports = (db, userSockets) => {

  // retrieves message history
  router.get('/:userId/:otherUserId', (req, res) => {
    db.query(`SELECT messages.sender_id, messages.time, messages.text, conversations_id,
    (SELECT first_name FROM users WHERE users.id = sender_id) AS sender_first_name,
    (SELECT last_name FROM users WHERE users.id = sender_id) AS sender_last_name
    FROM conversations
    JOIN messages ON conversations.id = conversations_id
    JOIN users ON sender_id = users.id
    WHERE (user1_id = $1 OR user2_id = $1) AND (user1_id = $2 OR user2_id = $2)`,
      [req.params.userId, req.params.otherUserId])
      .then(data => res.json(data.rows))
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  })

  // posts to messages
  router.post('/:conversationId/:userId', (req, res) => {

    const io = userSockets.get('io');

    db.query(`INSERT INTO messages (conversations_id, sender_id, text)
    VALUES ($1, $2, $3) RETURNING *;`,
      [req.params.conversationId, req.params.userId, req.body.message])
      .then(data => {
        console.log('(chats.js line 29) other user id', req.body);
        console.log('(chats.js line 30) my user id', req.params.userId);
        const otherUserSocket = userSockets.get(String(req.body.otherUserId))

        if (otherUserSocket) {
          // otherUserSocket.emit('incomingMessage', req.body.message)
          console.log(io);
          io.to(otherUserSocket.id).emit('incomingMessage', req.body.message)
        }
        res.json(data.rows);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  })

  // create conversation
  router.post('/new', (req, res) => {
    db.query(`INSERT INTO conversations (user1_id, user2_id)
    VALUES ($1, $2) RETURNING id;`,
      [req.body.userId, req.body.otherUserId])
      .then(data => res.json(data.rows))
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  })

  // get conversation based on two ids... check if it exists
  router.get('/verify/:userId/:otherUserId', (req, res) => {
    db.query(`SELECT id FROM conversations 
    WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)`,
      [req.params.userId, req.params.otherUserId])
      .then(data => res.json(data.rows))
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  })


  return router;
};
