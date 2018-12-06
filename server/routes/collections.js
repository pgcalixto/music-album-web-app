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

/* GET collection albums. */
router.get('/:collection_id/albums', function(req, res, next) {
  var params = req.body;
  params.id = req.params.collection_id;
  collectionDao.retrieveAlbums(params, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({message: err.message || "Database failure."});
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

/* POST add album to collection. */
router.post('/:collection_id/albums', function(req, res, next) {
  // build album and collection ID params
  var params = req.body;
  params.collection_id = req.params.collection_id;
  params.album_id = params.id;
  delete params.id;

  collectionDao.addAlbum(params, (err, results) => {
    if (err) {
      res.status(500).send({message: err.message || "Database failure."});
    } else {
      res.send(results);
    }
  });
});

/* DELETE album from collection. */
router.delete('/:collection_id/albums/:album_id', function(req, res, next) {
  const params = {
    'collection_id': req.params.collection_id,
    'album_id': req.params.album_id
  };
  collectionDao.deleteOneAlbum(params, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({message: err.message || "Database failure."});
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

/* GET albums not in collection. */
router.get('/:collection_id/remaining-albums', function(req, res, next) {
  const idParam = {id: req.params.collection_id};
  collectionDao.retrieveRemainingAlbums(idParam, (err, results) => {
    if (err) {
      res.status(500).send({message: err.message || "Database failure."});
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
