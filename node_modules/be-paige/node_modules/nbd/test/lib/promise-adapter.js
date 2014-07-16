// Promise A+ test adapter
// For use with promises-aplus-tests

var Promise = require('../../trait/promise');

module.exports = {
  deferred : function() {
    var promise = new Promise();
    return {
      promise : promise,
      resolve : function(value) {
        promise.resolve(value);
      },
      reject : function(reason) {
        promise.reject(reason);
      }
    };
  }
};
