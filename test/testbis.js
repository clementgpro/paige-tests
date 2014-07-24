var bescribe = require('be-paige/bescribe');
var MyTestPage = require('../Page.js');

var config = {
  address: 'https://www.glassful.com/',
  webdriver: {
    address: 'http://localhost:4444/wd/hub',
    config: {
      platform: 'MAC',
      browserName: 'chrome'
    }
  }
};

bescribe("Some description", config, function(context, describe, it) {
  describe("My Test Page", function() {
    it("has elements on it's page", function() {
      context.Page.build()
      .redirectTo(MyTestPage)
      .completeLoginForm()
      .submitForm()
    });

    // More it() functions can go here
  });

  // More describe() functions can go here
});