// Imports
var bescribe = require('be-paige/bescribe');
var LoginPage = require('../../lib/login/login.js');
var MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js');
var common = require('../../common/common.js');
var config = common.config;
var account = common.account;

// Global variables
var loginPageContext;

// Tests
bescribe("Batch tasks", config, function(context, describe, it) {

  describe("Login", function() {

    // Before each tests redirect to the login page
    beforeEach(function() {
      loginPageContext = context.Page.build().redirectTo(LoginPage);
    });

    it("login successfully", function() {
      loginPageContext
        .completeLoginForm(account.email, account.password)
        .submitLoginForm()
        .switchTo(MonthlyBoxPage)
        .onPage();
    });

    it("password does not exists", function() {
      loginPageContext
        .completeLoginForm(account.email, '')
        .submitLoginForm()
        .onPage();
    });

    it("account does not exist", function() {
      loginPageContext
        .completeLoginForm('doesnotexist@doesnotexists.fr', 'doesnotexists')
        .submitLoginForm()
        .onPage();
    });

  });

});