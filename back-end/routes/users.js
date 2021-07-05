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
    db.query(`SELECT * FROM conversations WHERE user1_id = $1 OR user2_id = $1`,
      [Number(req.params.userId)])
      .then(data => {
        console.log("line 30");
        console.log(data.rows);
        return res.json(data.rows[0])
      })
      .catch(err => console.error(err));

    console.log("inside users.js --> users/chats");
    console.log("req.params", req.body);
  })
  return router;
};
