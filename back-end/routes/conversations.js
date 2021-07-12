const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log("BACKEND: conversations.js");
    db.query(`SELECT * FROM conversations;`)
      .then(data => res.json(data.rows))
    // .catch(err => console.error(err));
  });
  return router;
};
