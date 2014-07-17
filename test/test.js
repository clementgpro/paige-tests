var bescribe = require('be-paige/bescribe');
var MyTestPage = require('../File.js');
var config = {
  address: 'http://happy.pixafy.com/glassful/current/index.php',
  webdriver: {
    address: 'http://localhost:9515',
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
      .enterEmail('email');
    });

    // More it() functions can go here
  });

  // More describe() functions can go here
});