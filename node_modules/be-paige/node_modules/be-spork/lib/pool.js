var os = require('os'),
    childProcess = require('child_process'),
    genPool = require('generic-pool').Pool,
    merge = require('./merge');

function _create(script, args, options, childCallback) {
  return function(callback) {
    var childNode = childProcess.fork(script, args, options);

    childCallback(childNode);
    callback(null, childNode);
  };
}

function _destroy(child) {
  child.kill();
}

function Pool(script, args, options, settings, childCallback) {
  if (!script) {
    throw new Error('A script path must be provided.');
  }

  // Sensible defaults to prevent guards from litering the rest of the code
  args = args || [];
  options = options || {};
  childCallback = childCallback || function() {};

  var poolOptions = merge({
    name: 'pool',
    max: os.cpus().length,
    min: os.cpus().length - 1,
    idleTimeoutMillis: 20000,
    log: false
  }, settings);

  // Make sure that passed in settings can't override these
  poolOptions.create = _create(script, args, options, childCallback);
  poolOptions.destroy = _destroy;

  this.pool = genPool(poolOptions);
}

Pool.prototype.push = function(data, callback) {
  var pool = this.pool;

  pool.acquire(function (err, node) {
    if (err) {
      callback(err);
      return;
    }

    node.once('message', function (message) {
      pool.release(node);

      callback(null, {
        pid: node.pid,
        stdout: message
      });
    });

    node.send(data);
  });
};

Pool.prototype.drain = function(callback) {
  var pool = this.pool;

  pool.drain(function() {
    pool.destroyAllNow();

    if (callback) {
      callback(null);
    }
  });
};

module.exports = Pool;
