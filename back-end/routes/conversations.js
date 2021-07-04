const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM conversations;`)
    .then(data => res.json(data.rows))
    .catch(err => console.error(err));
  });
  return router;
};
