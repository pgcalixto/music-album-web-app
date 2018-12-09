
module.exports = {

  // TODO make the function check if all parameters in the set are met.
  // Currently the function only checks if all parameters in the input ('params`)
  // are met, but not all parameters in the schema (`paramSet`).
  validateParamKeys: function(paramSet, params) {
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
}
