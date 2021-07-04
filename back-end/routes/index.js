var express = require('express');
var router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("it works");
  });
  return router;
};
