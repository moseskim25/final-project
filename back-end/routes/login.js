var express = require('express');
var router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body

    const queryString = `SELECT id, email, password FROM users WHERE email = $1;`;

    db.query(queryString, [email])
      .then(data => {
        return res.json(data.rows[0])
      })
      .catch(err => console.error(err));
  });
  return router;
};
