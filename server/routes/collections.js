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

module.exports = router;
