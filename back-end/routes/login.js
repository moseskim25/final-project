var express = require('express');
var router = express.Router();

// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


module.exports = (db) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body

    console.log(req.body);

    const queryString = `SELECT id, email, password FROM users WHERE email = $1;`;


    db.query(queryString, [email])
      .then(data => {
        console.log("~~~~~~inside login.js backend~~~~~~~~~~~~~");
        // console.log(data);
        console.log(data.rows);
        console.log(data.rows[0].id);
        return res.json(data.rows[0])
      })
      .catch(err => console.error(err));
  });
  return router;
};
