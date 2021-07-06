const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get(`/:search`, (req, res) => {
      const queryString = `SELECT * FROM users 
      JOIN users_interests ON users.id = users_interests.user_id 
      JOIN interests ON users_interests.interest_id = interests.id 
      JOIN categories ON interests.category_id = categories.id
      WHERE interests.name LIKE '%$1%'
      OR users.first_name LIKE '%$1%'
      OR users.last_name LIKE '%$1%'`
    db.query(queryString, [req.param.search])
    .then(
      (data) => {res.send(data.rows)})
  })
  return router;
};