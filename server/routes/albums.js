var express = require('express');
var router = express.Router();
var albumDao = require('../database/album-dao');

/* GET albums listing. */
router.get('/', function(req, res, next) {
  albumDao.list((err, results) => {
    if (err) {
      res.status(500).send({message: err.message || "Database failure."});
    } else {
      res.send(results);
    }
  });
});

/* POST new album. */
router.post('/', function(req, res, next) {
  albumDao.create(req.body, (err, results) => {
    if (err) {
      res.status(500).send({message: err.message || "Database failure."});
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
