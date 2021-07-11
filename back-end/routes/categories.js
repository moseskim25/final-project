const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get(`/:category`, (req, res) => {
    db.query(`SELECT * FROM categories
    WHERE name = $1;`,
    [req.params.category.toLowerCase()])
    .then(data => {
      db.query(`SELECT * FROM interests
      WHERE category_id = ${data.rows[0].id}`)
      .then(data => res.json(data.rows))
    })
    .catch(err => console.error(err));
  });
  return router;
};
