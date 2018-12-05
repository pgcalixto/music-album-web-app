var express = require('express');
var router = express.Router();
var collectionDao = require('../database/collection-dao');

/* GET collections listing. */
router.get('/', function(req, res, next) {
  collectionDao.list((err, results) => {
    if (err) {
      res.status(500).send({message: err.message || "Database failure."});
    } else {
      res.send(results);
    }
  });
});

/* GET collection by id. */
router.get('/:collection_id', function(req, res, next) {
  collectionDao.retrieve({id: req.params.collection_id}, (err, results) => {
    if (err) {
      res.status(500).send({message: err.message || "Database failure."});
    } else {
      if (results.length === 0) {
        res.status(404).send({message: "Collection not found by ID."});
      } else {
        res.send(results[0]);
      }
    }
  });
});

/* PATCH collection fields. */
router.patch('/:collection_id', function(req, res, next) {
  var params = req.body;
  params.id = req.params.collection_id;
  collectionDao.partialUpdate(params, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({message: err.message || "Dabatase failure."});
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

module.exports = router;
