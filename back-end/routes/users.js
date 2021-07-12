var express = require('express');
var router = express.Router();

module.exports = (db, userSockets) => {
  router.post("/new", (req, res) => {
    const { email, password } = req.body

    db.query(`INSERT INTO users (email, password)
    VALUES ($1, $2) RETURNING *;`,
      [email, password])
      .then(data => {
        return res.json(data.rows[0])
      })
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  });

  router.get("/:userId/chats", (req, res) => {
    db.query(`SELECT * FROM conversations
    WHERE user1_id = $1 OR user2_id = $1`,
      [Number(req.params.userId)])
      .then(data => {
        console.log("line 30");
        console.log(data.rows);
        return res.send(data.rows)
      })
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });

    console.log("inside users.js --> users/chats");
    console.log("req.params", req.body);
  })

  router.put("/new/general", (req, res) => {
    const { first_name, last_name, city, id } = req.body

    db.query(`UPDATE users
    SET first_name = $1, last_name = $2, city = $3
    WHERE id = $4;`,
      [first_name, last_name, city, id])
      .then(data => {
        return res.json(data.rows[0])
      })
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  });

  router.post('/new/:user_id/interests', (req, res) => {
    const { interestsArray } = req.body;
    console.log(interestsArray);

    interestsArray.forEach(interest_id => {
      db.query(`INSERT INTO users_interests (user_id, interest_id, level)
      VALUES ($1, $2, $3)`,
        [req.params.user_id, interest_id, 1])
    })
  })

  router.put('/new/photo', (req, res) => {

    const { imageUrl, user_id } = req.body;

    db.query(`UPDATE users
    SET profile_image = $1
    WHERE id = $2;`,
      [imageUrl, user_id])
      .then(() => res.send())
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  });

  //grabs user's info
  router.get('/:user_id', (req, res) => {
    db.query(`SELECT * FROM users
    WHERE id = $1`,
      [req.params.user_id])
      .then(data => {
        res.json(data.rows[0]);
      }).catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  })

  //grabs user's interests
  router.get('/:user_id/interests', (req, res) => {
    db.query(`SELECT users_interests.*, interests.*
    FROM users_interests
    JOIN interests ON interest_id = interests.id
    WHERE user_id = $1`,
      [req.params.user_id])
      .then(data => {
        res.json(data.rows);
      }).catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  })

  router.get('/:user_id/conversations', (req, res) => {
    db.query(`SELECT conversations.*, messages.*, users.* AS sender,
    (SELECT first_name FROM users WHERE users.id = user1_id) AS user1_first_name,
    (SELECT last_name FROM users WHERE users.id = user1_id) AS user1_last_name,
    (SELECT first_name FROM users WHERE users.id = user2_id) AS user2_first_name,
    (SELECT last_name FROM users WHERE users.id = user2_id) AS user2_last_name
    FROM conversations
    JOIN messages ON conversations.id = conversations_id
    JOIN users ON sender_id = users.id
    WHERE user1_id = $1 OR user2_id = $1`,
      [req.params.user_id])
      .then(data => res.json(data.rows))
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });
  })

  // get socket id fpr user from userSockets map
  router.get('/:user_id/.....',

  )

  router.get('/all/:userIdArray', (req, res) => {
    const userIds = req.params.userIdArray.split(',');
    let queryString = 'SELECT * FROM users WHERE ';

    userIds.forEach(id => {
      if (id === userIds[userIds.length - 1]) {
        queryString += `id = ${id};`;
      } else {
        queryString += `id = ${id} OR `;
      }
    })

    return db.query(queryString)
    .then(data => {
      const output = {};
      for (let user of data.rows) {
        output[user.id] = {...user};
      }
      res.json(output);
    })
    ;

  })

  return router;
};
