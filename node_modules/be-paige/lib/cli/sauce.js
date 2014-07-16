var run = require('./run'),
    fs = require('fs'),

    platforms = {
      win32: 'WINDOWS',
      darwin: 'MAC',
      linux: 'LINUX',
      freebsd: 'LINUX'
    };

module.exports = function(hostAddress, dir, options) {
  var sauceConfigObj, paigeOpts = {
    address: hostAddress,
    webdriver: {
      address: options.webdriverAddress || 'http://ondemand.saucelabs.com/wd/hub',
      config: {
        platform: options.os || platforms[process.platform],
        browserName: options.browser || 'firefox',
        'browser-version': options.browserVersion || '',
        'screen-resolution': options.screenResolution || '1024x768',
        name: options.name || '',
        tags: options.tags || [''],
        build: options.build || '',
        'record-video': !options.disableRecordVideo,
        'record-screenshots': !options.disableRecordScreenshots,
        'webdriver.remote.quietExceptions': !options.disableQuietExceptions,
        'sauce-advisor': !options.disableSauceAdvisor
      }
    }
  };

  if (options.tunnelIdentifier) {
    paigeOpts.webdriver.config['tunnel-identifier'] = options.tunnelIdentifier;
  }

  if (options.sauceConfig) {
    sauceConfigObj = JSON.parse(fs.readFileSync(options.sauceConfig));

    paigeOpts.webdriver.config.username = sauceConfigObj.username;
    paigeOpts.webdriver.config.accessKey = sauceConfigObj.accessKey;
  }
  else if (options.username && options.accessKey) {
    paigeOpts.webdriver.config.username = options.username;
    paigeOpts.webdriver.config.accessKey = options.accessKey;
  }
  else {
    throw new Error('Sauce Labs authentication information must be provided');
  }

  run(paigeOpts, dir, options);
};
