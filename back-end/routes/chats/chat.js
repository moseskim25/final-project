const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/:userId/:other_userId', (req, res) => {
    db.query(`SELECT messages.sender_id, messages.time, messages.text, conversations_id,
    (SELECT first_name FROM users WHERE users.id = sender_id) AS sender_first_name,
    (SELECT last_name FROM users WHERE users.id = sender_id) AS sender_last_name
    FROM conversations
    JOIN messages ON conversations.id = conversations_id
    JOIN users ON sender_id = users.id
    WHERE (user1_id = $1 OR user2_id = $1) AND (user1_id = $2 OR user2_id = $2)`,
    [req.params.userId, req.params.other_userId])
    .then(data => res.json(data.rows))
    .catch(err => console.error(err));
  })

  router.post('/:conversationId/:userId', (req, res) => {
    console.log(req.params.conversationId);
    db.query(`INSERT INTO messages (conversations_id, sender_id, text)
    VALUES ($1, $2, $3)`,
    [req.params.conversationId, req.params.userId, req.body.message])
    .then(data => res.json(data.rows))
    .catch(err => console.error(err));
  })

  return router;
};
