var MyTestPage = require('../File.js');

var config = {
  address: 'http://happy.pixafy.com/glassful/current/index.php/',
  webdriver: {
    address: 'http://localhost:4444/wd/hub',
    config: {
      platform: 'MAC',
      browserName: 'chrome'
    }
  }
};

bescribe("Some description", function(context, describe, it) {
  describe("My Test Page", function() {
    it("has elements on it's page", function() {
      context.Page.build()
      .enterEmail();
    });

    // More it() functions can go here
  });

  // More describe() functions can go here
});	