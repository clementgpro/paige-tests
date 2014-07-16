var run = require('./run'),

    platforms = {
      win32: 'WINDOWS',
      darwin: 'MAC',
      linux: 'LINUX',
      freebsd: 'LINUX'
    };

module.exports = function(address, dir, options) {
  var paigeOpts = {
    address: address,
    webdriver: {
      address: 'http://localhost:4444/wd/hub',
      config: {
        platform: platforms[process.platform],
        browserName: options.webdriverBrowser || 'firefox',
        version: ''
      }
    }
  };

  run(paigeOpts, dir, options);
};
