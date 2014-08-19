// Imports
var bescribe = require('be-paige/bescribe');
var LoginPage = require('../../../lib/login/login.js');
var CustomerAccountEditPage = require('../../../lib/customer/account/edit.js');
var CustomerAccountPage = require('../../../lib/customer/customer.js');
var TheQuizPage = require('../../../lib/the-quiz/the-quiz.js');
var SignUpPage = require('../../../lib/sign-up/sign-up.js');
var common = require('../../common/common.js');
var config = common.config;

// Global variables
var customerAccountEditContext;
var emailAccount = 'glassful.test.sign-up' + new Date().getTime() + '@yopmail.com';
var passwordAccount = 'password';
var isAccountCreated = false;

bescribe("Edit account information of " + emailAccount, config, function(context, describe, it) {

  beforeEach(function() {
    // TODO move in before function (not working yet because of the context)
    // create new account for edit tests
    if (!isAccountCreated) {
      customerAccountEditContext = context.Page.build()
        .redirectTo(TheQuizPage)
        .goEndQuiz()
        .clickYesShippingUsa()
        .submitQuizForm()
        .switchTo(SignUpPage)
        .createNewAccount(emailAccount)
        .done();
      isAccountCreated = true;
    }

    // login
    customerAccountEditContext = context.Page.build()
      .redirectTo(LoginPage)
      .completeLoginForm(emailAccount, passwordAccount)
      .submitLoginForm()
      .redirectTo(CustomerAccountEditPage);

  });

  /* First name */
  describe("Edit first name", function() {
    it("Empty", function() {
      customerAccountEditContext.completeEditForm('', 'new last name', emailAccount)
        .submitEditForm()
        .onPage();
    });

    it("Not empty", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', emailAccount)
        .submitEditForm()
        .switchTo(CustomerAccountPage)
        .onPage();
    });
  });

  /* Last name */
  describe("Edit last name", function() {
    it("Empty", function() {
      customerAccountEditContext.completeEditForm('new first name', '', emailAccount)
        .submitEditForm()
        .onPage();
    });

    it("Not empty", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', emailAccount)
        .submitEditForm()
        .switchTo(CustomerAccountPage)
        .onPage();
    });
  });

  /* Password */
  describe("Edit password", function() {

    it("Wrong current", function() {
      customerAccountEditContext
        .showPasswordForm()
        .completePasswordInformation('invalid-current-password', 'whatever', 'whatever')
        .submitEditForm()
        .onPage();
    });

    it("Less than 6 characters", function() {
      customerAccountEditContext
        .showPasswordForm()
        .completePasswordInformation(passwordAccount, 'less', 'less')
        .submitEditForm()
        .onPage();
    });

    it("Password are not equal", function() {
      customerAccountEditContext
        .showPasswordForm()
        .completePasswordInformation(passwordAccount, 'qwerty', 'azerty')
        .submitEditForm()
        .onPage();
    });

    it("Without errors", function() {
      customerAccountEditContext
        .showPasswordForm()
        .completePasswordInformation(passwordAccount, 'newpassword', 'newpassword')
        .submitEditForm()
        .switchTo(CustomerAccountPage)
        .onPage();
      passwordAccount = 'newpassword';
    });

  });

  /* Mail address */
  describe("Edit mail address", function() {
    it("Invalid mail address", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', 'invalidyopmail.com')
        .submitEditForm()
        .onPage();
    });

    it("Existing mail address", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', 'glassful.newemail@yopmail.com')
        .submitEditForm()
        .onPage();
    });

    it("New mail address", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', 'new' + emailAccount)
        .submitEditForm()
        .switchTo(CustomerAccountPage)
        .onPage();
    });
  });

});