var pool = require('./pool-factory');

module.exports = {
  list: function(callback) {
    var queryString = 'SELECT * FROM album';

    pool.query(queryString, function(error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }
}
