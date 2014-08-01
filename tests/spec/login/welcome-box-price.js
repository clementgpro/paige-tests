var bescribe = require('be-paige/bescribe');
var LoginPage = require('../../lib/login/index.js');
var MonthlyBoxPage = require('../../lib/monthly-box/index.js');

var config = {
  address: 'https://www.glassful.com',
  webdriver: {
    address: 'http://localhost:4444/wd/hub',
    config: {
      platform: 'MAC',
      browserName: 'chrome'
    }
  }
};

bescribe("Batch tasks", config, function(context, describe, it) {
  describe("Verify", function() {
    // login test
    it("login well", function() {
      context.Page.build()
        .redirectTo(LoginPage)
        .completeLoginForm()
        .submitLoginForm()
        .switchTo(MonthlyBoxPage).onPage();
    });

    // welcome box price 
    it("Welcome box price is equal to $35", function() {
      context.Page.build()
        .redirectTo(LoginPage)
        .completeLoginForm()
        .submitLoginForm()
        .verifyPrice();
    });

    // More it() functions can go here
  });

  // More describe() functions can go here
});