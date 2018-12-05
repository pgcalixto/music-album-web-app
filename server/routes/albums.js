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

/* GET album by id. */
router.get('/:album_id', function(req, res, next) {
  albumDao.retrieve({id: req.params.album_id}, (err, results) => {
    if (err) {
      res.status(500).send({message: err.message || "Database failure."});
    } else {
      if (results.length === 0) {
        res.status(404).send({message: "Album not found by ID."});
      } else {
        res.send(results[0]);
      }
    }
  });
});

module.exports = router;
