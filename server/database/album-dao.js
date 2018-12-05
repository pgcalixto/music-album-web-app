var pool = require('./pool-factory');

validateParamKeys = (paramSet, params) => {
  for (let key of Object.keys(params)) {
    if (paramSet.has(key) === false) {
      return {
        error: {message: key + ' is not a valid field to update.'},
        valid: false
      };
    }
  }
  return {
    error: null,
    valid: true
  }
}

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
  },

  create: function(params, callback) {

    const paramKeys = new Set(['title', 'artist', 'year']);
    const keysAreValid = validateParamKeys(paramKeys, params);
    if (keysAreValid.error) {
      callback(keysAreValid.error, null);
      return;
    }

    var queryString = 'INSERT INTO album SET ?';
    pool.query(queryString, params, function(error, results) {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        const message = 'Successfully inserted ' + JSON.stringify(params) + '.';
        console.log(message);
        callback(null, {message: message});
      }
    });
  }
}
