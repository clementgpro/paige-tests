var Mocha = require('mocha'),
    paige = require('../../index'),
    glob = require('glob'),
    merge = require('../utils/merge'),
    fs = require('fs'),
    parallelRun = require('./parallelRun');

function serialRun(paigeOptions, mochaOptions, files) {
  var mocha = new Mocha(mochaOptions);

  // Set paige configuration
  paige.config.set(paigeOptions);

  // add all the files to the mocha run
  files.forEach(function(file) {
    mocha.addFile(file);
  });

  // run mocha
  mocha.run();
}

module.exports = function(paigeOptions, dir, options) {
  var files,

      // configure mocha options
      mochaOpts = {
        ui: options.parent.ui || 'bdd',
        reporter: options.parent.reporter || 'spec',
        timeout: options.parent.timeout || 2000,
        bail: !!options.parent.bail,
        slow: options.parent.slow || 75,
        grep: options.parent.grep || '',
        globals: options.parent.globals || ''
      };

  if (options.parent.colors) {
    mochaOpts.useColors = true;
  }

  // Check for additional options
  if (options.parent.additionalConfig) {
    paigeOptions = merge(JSON.parse(fs.readFileSync(options.parent.additionalConfig)), paigeOptions);
  }

  // If no directory provided, check for js files in a test or spec directory
  // TODO: replace fs.exists
  if (!dir) {
    if (fs.existsSync('./test')) {
      dir = 'test/**/*.js';
    }
    else if (fs.existsSync('./spec')) {
      dir = 'spec/**/*.js';
    }
    else {
      throw new Error('Please provide a test directory');
    }
  }

  // Find all test files in test directory
  console.log("Looking for test files in " + dir);
  files = glob.sync(dir);

  if (options.parent.parallel) {
    parallelRun(paigeOptions, mochaOpts, files, options.parent.reportOutput);
  }
  else {
    serialRun(paigeOptions, mochaOpts, files, options.parent.reportOutput);
  }
};
