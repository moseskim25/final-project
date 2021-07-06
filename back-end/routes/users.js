var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;



module.exports = (db) => {
  router.post("/new", (req, res) => {
    const { email, password } = req.body

    db.query(`INSERT INTO users (email, password)
    VALUES ($1, $2) RETURNING *;`,
      [email, password])
      .then(data => {
        return res.json(data.rows[0])
      })
      .catch(err => console.error(err));
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
      .catch(err => console.error(err));

    console.log("inside users.js --> users/chats");
    console.log("req.params", req.body);
  })

  router.put("/new/general", (req, res) => {
    const { first_name, last_name, postal_code, id } = req.body

    db.query(`UPDATE users
    SET first_name = $1, last_name = $2, postal_code = $3
    WHERE id = $4;`,
      [first_name, last_name, postal_code, id])
      .then(data => {
        return res.json(data.rows[0])
      })
      .catch(err => console.error(err));
  });

  router.post('/new/:user_id/interests', (req, res) => {
    const { interestsArray } = req.body;

    interestsArray.forEach(interest_id => {
      db.query(`INSERT INTO users_interests (user_id, interest_id, level)
      VALUES ($1, $2, $3)`,
      [req.params.user_id, interest_id, 1])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => console.error(err));
    })
  })

  router.put('/new/photo', (req, res) => {

    const fileStr = req.body.data;

    db.query(`UPDATE users
    SET upload_image = $1`,
    [fileStr])
    .then(() => res.send())
    .catch(err => console.error(err))
  });

  //grabs user's info
  router.get('/:user_id', (req, res) => {
    db.query(`SELECT * FROM users
    WHERE id = $1`,
    [req.params.user_id])
    .then(data => {
      res.json(data.rows[0]);
    }).catch(err => console.error(err));
  })
  return router;
};
