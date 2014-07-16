var bescribe, webdriver = require('selenium-webdriver/testing'),
    Root = require('./lib/root');

function wrapDescribe(describe) {
  return function (context, config, fn) {
    if (typeof fn !== 'function' &&
        typeof config === 'function') {
      fn = config;
      config = undefined;
    }

    describe(context, function() {
      var suite = {};

      webdriver.beforeEach(function() {
        suite.Page = new Root(config);
      });

      webdriver.afterEach(function(done) {
        suite.Page.done(done);
      });

      fn(suite, webdriver.describe, webdriver.it);
    });
  };
}

bescribe = wrapDescribe(webdriver.describe);
bescribe.only = wrapDescribe(webdriver.describe.only);

module.exports = bescribe;
