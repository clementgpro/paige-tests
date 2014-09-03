// Imports
var bescribe = require('be-paige/bescribe');
var LoginPage = require('../../../../lib/customer/account/login.js');
var LoginHelper = require('./loginHelper.js');
var common = require('../../../common/common.js');
var data = require('../../../common/data.js');

// Global variables
var pageContext;

// Tests
bescribe("Batch tasks", common.config, function(context, describe, it) {

  describe("Login", function() {

    // Before each tests redirect to the login page
    beforeEach(function() {
      pageContext = context.Page.build();
    });

    it("Should login successfully", function() {
      LoginHelper.login(pageContext, data.account);
    });

    it("Should refused the log in because the password is empty", function() {
      pageContext
        .redirectTo(LoginPage)
        .onPage()
        .completeLoginForm(data.account.email, '')
        .submitLoginForm()
        .onPage();
    });

    it("Should refused the log in because the account does not exist", function() {
      pageContext
        .redirectTo(LoginPage)
        .onPage()
        .completeLoginForm('doesnotexist@doesnotexists.fr', 'doesnotexists')
        .submitLoginForm()
        .onPage();
    });

  });

});