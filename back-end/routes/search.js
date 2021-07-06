const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get(`/`, (req, res) => {
      const queryString = `SELECT * FROM users 
      JOIN users_interests ON users.id = users_interests.user_id 
      JOIN interests ON users_interests.interest_id = interests.id 
      JOIN categories ON interests.category_id = categories.id`
    db.query(queryString)
    .then(
      (data) => {res.send(data.rows)})
  })
  return router;
};