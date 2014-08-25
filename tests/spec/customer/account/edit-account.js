// Imports
var bescribe = require('be-paige/bescribe'),
  LoginHelper = require('../../login/loginHelper.js'),
  CustomerAccountPage = require('../../../lib/customer/customer.js'),
  CustomerAccountEditPage = require('../../../lib/customer/account/edit.js'),
  TheQuizPage = require('../../../lib/the-quiz/the-quiz.js'),
  SignUpHelper = require('../../sign-up/sign-upHelper.js'),
  common = require('../../common/common.js'),
  data = require('../../common/data.js');

// Global variables
var customerAccountEditContext;

bescribe("Edit account information of " + data.newAccount.email, common.config, function(context, describe, it) {

  beforeEach(function() {
    // create a new account (one time and only one time)
    if (!customerAccountEditContext) {
      SignUpHelper.signUp(context.Page.build(), data.newAccount);
    }
    // login the user with new account
    customerAccountEditContext = LoginHelper.login(context.Page.build(), data.newAccount).redirectTo(CustomerAccountEditPage);
  });

  // First name
  describe("Edit first name", function() {
    it("Should not edit the first name because its empty", function() {
      customerAccountEditContext.completeEditForm('', 'new last name', data.newAccount.email)
        .submitEditForm()
        .onPage();
    });

    it("Should edit the first name because it's empty", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', data.newAccount.email)
        .submitEditForm()
        .switchTo(CustomerAccountPage)
        .onPage();
    });
  });

  // Last name
  describe("Edit last name", function() {
    it("Should not edit the last name because its empty", function() {
      customerAccountEditContext.completeEditForm('new first name', '', data.newAccount.email)
        .submitEditForm()
        .onPage();
    });

    it("Should edit the last name because it's empty", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', data.newAccount.email)
        .submitEditForm()
        .switchTo(CustomerAccountPage)
        .onPage();
    });
  });

  // Password
  describe("Edit password", function() {
    it("Should not edit the password because the current is wrong", function() {
      customerAccountEditContext
        .showPasswordForm()
        .completePasswordInformation('invalid-current-password', 'whatever', 'whatever')
        .submitEditForm()
        .onPage();
    });

    it("Should not edit the password because the new has less than 6 characters", function() {
      customerAccountEditContext
        .showPasswordForm()
        .completePasswordInformation(data.newAccount.password, 'less', 'less')
        .submitEditForm()
        .onPage();
    });

    it("Should not edit the password because the new password and the confirmation one are not equal", function() {
      customerAccountEditContext
        .showPasswordForm()
        .completePasswordInformation(data.newAccount.password, 'qwerty', 'azerty')
        .submitEditForm()
        .onPage();
    });

    it("Should edit the password because there are no errors", function() {
      customerAccountEditContext
        .showPasswordForm()
        .completePasswordInformation(data.newAccount.password, 'newpassword', 'newpassword')
        .submitEditForm()
        .switchTo(CustomerAccountPage)
        .onPage();
      data.newAccount.password = 'newpassword';
    });

  });

  // Mail address
  describe("Edit mail address", function() {
    it("Should not edit the mail address because it has invalid format", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', 'invalidyopmail.com')
        .submitEditForm()
        .onPage();
    });

    it("Should not edit the mail address because an account has already this mail address", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', 'glassful.newemail@yopmail.com')
        .submitEditForm()
        .onPage();
    });

    it("Should edit the mail address because there are no errors", function() {
      customerAccountEditContext.completeEditForm('new first name', 'new last name', 'new' + data.newAccount.email)
        .submitEditForm()
        .switchTo(CustomerAccountPage)
        .onPage();
    });
  });

});