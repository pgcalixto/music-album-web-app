var pool = require("./pool-factory");
var utils = require("./utils");

module.exports = {
  list: function(callback) {
    var queryString = "SELECT * FROM album";

    pool.query(queryString, function(error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },

  retrieve: function(param, callback) {
    const paramKey = new Set(["id"]);
    const keyIsValid = utils.validateParamKeys(paramKey, param);
    if (keyIsValid.error) {
      callback(keyIsValid.error, null);
      return;
    }

    var queryString = "SELECT * FROM album WHERE ?";
    pool.query(queryString, param, function(error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },

  retrieveByName: function(params, callback) {
    const paramKeys = new Set(["name"]);
    const keysAreValid = utils.validateParamKeys(paramKeys, params);
    if (keysAreValid.error) {
      callback(keysAreValid.error, null);
      return;
    }

    var queryParam = "LIKE '%" + params.name + "%'";
    var queryString =
      "SELECT * FROM album WHERE title " +
      queryParam +
      "OR artist " +
      queryParam;
    pool.query(queryString, function(error, results) {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        const message = "Successfully queried " + JSON.stringify(params) + ".";
        console.log(message);
        callback(null, results);
      }
    });
  },

  create: function(params, callback) {
    const paramKeys = new Set(["title", "artist", "year"]);
    const keysAreValid = utils.validateParamKeys(paramKeys, params);
    if (keysAreValid.error) {
      callback(keysAreValid.error, null);
      return;
    }

    var queryString = "INSERT INTO album SET ?";
    pool.query(queryString, params, function(error, results) {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        const message = "Successfully inserted " + JSON.stringify(params) + ".";
        console.log(message);
        callback(null, { message: message });
      }
    });
  },

  partialUpdate: function(params, callback) {
    if (params.id == null) {
      callback({ message: "ID must be provided." }, null);
    }

    const paramKeys = new Set(["id", "title", "artist", "year"]);
    const keysAreValid = utils.validateParamKeys(paramKeys, params);
    if (keysAreValid.error) {
      callback(keysAreValid.error, null);
      return;
    }

    var queryString = "UPDATE album SET ? WHERE ?";
    const idParam = JSON.parse(JSON.stringify({ id: params.id }));
    delete params.id;

    pool.query(queryString, [params, idParam], function(error, results) {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        const message = "Successfully updated " + JSON.stringify(params) + ".";
        console.log(message);
        callback(null, { message: message });
      }
    });
  }
};
