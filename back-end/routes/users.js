var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;



module.exports = (db) => {

  
  router.post("/new", (req, res) => {
    const {email, password} = req.body
    console.log(email)
    console.log(password)

    db.query(`INSERT INTO users (email, password)
    VALUES ($1, $2)`,
    [email, password])
    .then(data => res.json(data.rows))
    .catch(err => console.error(err));
  });
  return router;
};
