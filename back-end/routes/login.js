var express = require('express');
var router = express.Router();




module.exports = (db) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body

    db.query(`SELECT * FROM users WHERE email = $1;`,
      [email])
      .then(data => {
        console.log("~~~~~~inside login.js backend~~~~~~~~~~~~~");
        console.log(data.rows[0].id);
        return res.json(data.rows[0])
      })
      .catch(err => console.error(err));
  });
  return router;
};
