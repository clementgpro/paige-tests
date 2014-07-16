var run = require('./run'),

    platforms = {
      win32: 'WINDOWS',
      darwin: 'MAC',
      linux: 'LINUX',
      freebsd: 'LINUX'
    };

module.exports = function(hostAddress, webdriverAddress, dir, options) {
  var paigeOpts = {
    address: hostAddress,
    webdriver: {
      address: webdriverAddress,
      config: {
        platform: options.webdriverPlatform || platforms[process.platform],
        browserName: options.webdriverBrowser || 'firefox',
        version: options.webdriverVersion || ''
      }
    }
  };

  run(paigeOpts, dir, options);
};
