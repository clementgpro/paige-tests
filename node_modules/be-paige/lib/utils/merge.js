function _isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function merge() {
  var args = Array.prototype.slice.call(arguments);

  return args.reduce(function(composite, obj) {
    if (typeof obj !== 'object') { return composite; }

    Object.keys(obj).forEach(function(key) {
      if (_isObject(composite[key]) && _isObject(obj[key])) {
        composite[key] = merge(composite[key], obj[key]);
      }
      else {
        composite[key] = obj[key];
      }
    });

    return composite;
  }, {});
}

module.exports = merge;
