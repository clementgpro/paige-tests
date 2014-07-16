require('coffee-script/register');

var program = require('commander'),
    local = require('./local'),
    remote = require('./remote'),
    sauce = require('./sauce');


function list(val) {
  return val.split(',');
}

program.version('0.3.0')
  .option('-p, --parallel', 'Run test files in parallel')
  .option('-u, --ui <name>', 'specify user-interface [bdd, tdd, exports]')
  .option('-r, --reporter <name>', 'specify the reporter to use')
  .option('-t, --timeout <ms>', 'set test-case timeout in milliseconds [2000]')
  .option('-b, --bail', 'bail after first test failure')
  .option('-s, --slow <ms>', '"slow" test threshold in milliseconds [75]')
  .option('-g, --grep <pattern>', 'only run tests matching <pattern>')
  .option('--globals <names>', 'allow the given comma-delimited global [names]')
  .option('--colors', 'force enabling of colors')
  .option('--report-output <filepath>', 'output mocha reporting to file. Note: currently only works for parallel runs')
  .option('--additional-config <filepath>', 'path to additional options defined in a JSON file');

program.command('local <host-address> [dir]')
  .description('Run against a local Selenium server')
  .option('--webdriverBrowser <browser>', 'browser to run the tests in [firefox]')
  .action(function(hostAddress, dir, options) {
    local(hostAddress, dir, options);
  });

program.command('remote <host-address> <webdriver-address> [dir]')
  .description('Run against a remote Selenium server (or grid)')
  .option('--webdriverPlatform <platform>', 'operating system to use [WINDOWS, LINUX, MAC]')
  .option('--webdriverBrowser <browser>', 'browser to run the tests in [firefox]')
  .option('--webdriverVersion <version>', 'webdriver version to use')
  .action(function(hostAddress, webdriverAddress, dir, options) {
    remote(hostAddress, webdriverAddress, dir, options);
  });

program.command('sauce <host-address> [dir]')
  .description('Run against Sauce Labs servers')
  .option('--sauce-config <filepath>', 'path to a JSON file with username and accessKey for sauce authentication')
  .option('--username <username>', 'sauce labs user name')
  .option('--access-key <access-key>', 'sauce labs access key')
  .option('--webdriverUrl <url>', 'url to webdriver server. By default this is set to http://ondemand.saucelabs.com/wd/hub')
  .option('--os <platform>', 'the operating system to run tests against. See https://saucelabs.com/platforms for available platforms')
  .option('--browser <browser>', 'the browser to run tests in. See https://saucelabs.com/platforms for available platforms')
  .option('--browser-version <version>', 'the version of the browser to use. See https://saucelabs.com/platforms for available platforms')
  .option('--screen-resolution <resolution>', 'screen resolution to use. Default value is 1024x768. See https://saucelabs.com/docs/additional-config for details. For parallel runs, this will be overwritten by the name of the file being run')
  .option('--name <name>', 'name your sauce labs run. See https://saucelabs.com/docs/additional-config for details')
  .option('--tags <comma-delimited list>', 'tag your sauce labs run. See https://saucelabs.com/docs/additional-config for details', list)
  .option('--build <build-number>', 'annotate sauce labs run with the build number. See https://saucelabs.com/docs/additional-config for details', parseInt)
  .option('--tunnel-identifier <identifier>', 'choose an identified Sauce Connect tunnel to use. See https://saucelabs.com/docs/additional-config for details')
  .option('--disable-record-video', 'Set the record-video field to false in the webdriver config. See https://saucelabs.com/docs/additional-config for details')
  .option('--disable-record-screenshots', 'Set the record-screenshots field to false in the webdriver config. See https://saucelabs.com/docs/additional-config for details')
  .option('--disable-sauce-advisor', 'Set sauce-advisor to false in the webdriver config. See https://saucelabs.com/docs/additional-config for details')
  .option('--disable-quiet-exceptions', 'Set webdriver.remote.quietExceptions to false in the webdriver config. See https://saucelabs.com/docs/additional-config for details')
  .action(function(hostAddress, dir, options) {
    sauce(hostAddress, dir, options);
  });

program.parse(process.argv);
