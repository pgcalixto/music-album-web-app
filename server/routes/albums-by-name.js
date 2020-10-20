var express = require("express");
var router = express.Router();
var albumDao = require("../database/album-dao");

/* GET album listing by name. */
router.get("/:name", function(req, res, next) {
  albumDao.retrieveByName({ name: req.params.name }, (err, results) => {
    if (err) {
      res.status(500).send({ message: err.message || "Database failure." });
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
