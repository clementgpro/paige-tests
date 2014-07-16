var Mocha = require('mocha'),
    paige = require('../../index'),
    cs = require('coffee-script'),

    paigeOptions = JSON.parse(process.argv[2]),
    mochaOptions = JSON.parse(process.argv[3]);

function cleanup() {
  // Removes selenium wd testing from module cache
  // Due to caching wrapped Mocha globals
  delete require.cache[require.resolve('be-paige/bescribe')];
  delete require.cache[require.resolve('be-paige/node_modules/selenium-webdriver/testing')];
}

// Wait until receive a file to run
process.on('message', function(file) {
  var mocha = new Mocha(mochaOptions);

  paigeOptions.webdriver.config.name = '' + file;

  // Set paige configuration
  paige.config.set(paigeOptions);

  // Add file to mocha, run test
  mocha.addFile(file);
  mocha.run(function(err) {
    cleanup();
    process.send(err);
  });
});
