var bescribe = require('be-paige/bescribe');
var LoginPage = require('../../lib/login/login.js');
var MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js');

var config = {
  address: 'http://happy.pixafy.com',
  webdriver: {
    address: 'http://localhost:4444/wd/hub',
    config: {
      platform: 'MAC',
      browserName: 'chrome'
    }
  }
};

bescribe("Batch tasks", config, function(context, describe, it) {
  // Login tests
  describe("Login", function() {

    it("login well", function() {
      context.Page.build()
        .redirectTo(LoginPage)
        .completeLoginForm('glassful.test@yopmail.com', 'password')
        .submitLoginForm()
        .switchTo(MonthlyBoxPage)
        .onPage();
    });

    it("password does not exists", function() {
      context.Page.build()
        .redirectTo(LoginPage)
        .completeLoginForm('glassful.test@yopmail.com', null)
        .submitLoginForm()
        .onPage();
    });

    it("account does not exist", function() {
      context.Page.build()
        .redirectTo(LoginPage)
        .completeLoginForm('doesnotexist@doesnotexists.fr', 'doesnotexists')
        .submitLoginForm()
        .onPage();
    });

  });

});