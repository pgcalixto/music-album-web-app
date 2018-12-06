var pool = require('./pool-factory');

validateParamKeys = (paramSet, params) => {
  for (let key of Object.keys(params)) {
    if (paramSet.has(key) === false) {
      return {
        error: {message: key + ' is not a valid field for this query.'},
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
    var queryString = 'SELECT * FROM collection';

    pool.query(queryString, function(error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },

  retrieve: function(param, callback) {

    const paramKey = new Set(['id']);
    const keyIsValid = validateParamKeys(paramKey, param);
    if (keyIsValid.error) {
      callback(keyIsValid.error, null);
      return;
    }

    console.log(param);

    var queryString = 'SELECT * FROM collection WHERE ?';
    pool.query(queryString, param, function(error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },

  partialUpdate: function(params, callback) {
    if (params.id == null) {
      callback({message: 'ID must be provided.'}, null);
      return;
    }

    const paramKeys = new Set(['id', 'name']);
    const keysAreValid = validateParamKeys(paramKeys, params);
    if (keysAreValid.error) {
      callback(keysAreValid.error, null);
      return;
    }

    var queryString = 'UPDATE collection SET ? WHERE ?';
    const idParam = {id: params.id};
    delete params.id;

    pool.query(queryString, [params, idParam], function(error, results) {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        const message = 'Successfully inserted ' + JSON.stringify(params) + '.';
        console.log(message);
        callback(null, {message: message});
      }
    });
  },

  retrieveAlbums: function(params, callback) {
    if (params.id == null) {
      callback({message: 'ID must be provided.'}, null);
      return;
    }

    const paramKeys = new Set(['id']);
    const keysAreValid = validateParamKeys(paramKeys, params);
    if (keysAreValid.error) {
      callback(keysAreValid.error, null);
      return;
    }

    var queryString = 'SELECT a.id, a.title, a.artist, a.year FROM' +
      ' collection_albums as ca INNER JOIN album as a ON ca.album_id = a.id' +
      ' WHERE ?'
    const idParam = {'ca.collection_id': params.id};

    pool.query(queryString, idParam, function(error, results) {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        const message = 'Successfully queryied albums for id = ' +
          idParam['ca.collection_id'] + '.';
        console.log(message);
        callback(null, results);
      }
    });
  },

  deleteOneAlbum: function(params, callback) {

    // check if desired keys are present
    const paramKeys = new Set(['collection_id', 'album_id']);
    const keysAreValid = validateParamKeys(paramKeys, params);
    if (keysAreValid.error) {
      callback(keysAreValid.error, null);
      return;
    }

    var queryString = 'DELETE FROM collection_albums WHERE ? AND ?';
    var idParams = [
      {collection_id: params.collection_id},
      {album_id: params.album_id}
    ];

    pool.query(queryString, idParams, function(error, results) {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        const message = 'Successfully removed ' + params + '.';
        console.log(message);
        callback(null, results);
      }
    });
  }
}
