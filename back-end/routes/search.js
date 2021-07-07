const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get(`/:search`, (req, res) => {
      const queryString = `SELECT * FROM users 
      JOIN users_interests ON users.id = users_interests.user_id 
      JOIN interests ON users_interests.interest_id = interests.id 
      JOIN categories ON interests.category_id = categories.id
      WHERE interests.name LIKE $1
      OR users.first_name LIKE $1
      OR users.last_name LIKE $1;`
    db.query(queryString, [`%${req.params.search}%`])
    .then(
      (data) => {res.send(data.rows)})
  })
  return router;
};

// module.exports = (db) => {

//   router.get(`/:category`, (req, res) => {
//     db.query(`SELECT * FROM categories
//     WHERE name = $1;`,
//     [req.params.category])
//     .then(data => {
//       db.query(`SELECT * FROM interests
//       WHERE category_id = ${data.rows[0].id}`)
//       .then(data => res.json(data.rows))
//     })
//     .catch(err => console.error(err));
//   });
//   return router;
// };
