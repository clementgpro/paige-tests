// Imports
var bescribe = require('be-paige/bescribe'),
  common = require('../common/common.js'),
  data = require('../common/data.js'),
  TheQuizPage = require('../../lib/the-quiz/the-quiz.js'),
  SignUpPage = require('../../lib/sign-up/sign-up.js'),
  MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js'),
  CreateAccountPage = require('../../lib/customer/account/create.js'),
  SignUpHelper = require('./sign-upHelper.js');

// Global variables
var signUpPageContext;

// Tests
bescribe("Sign up", common.config, function(context, describe, it) {

  // Before each test, take the quizz and go the signup page
  beforeEach(function() {
    signUpPageContext = context.Page.build()
      .redirectTo(TheQuizPage)
      .goEndQuiz()
      .clickYesShippingUsa()
      .submitQuizForm()
      .switchTo(SignUpPage);
  });

  describe("Accepted registration", function() {
    it("Should sign up successfully", function() {
      signUpPageContext
        .createNewAccount(data.createNewAccount())
        .switchTo(MonthlyBoxPage)
        .onPage();
    });
  });

  describe("Refused registration", function() {
    it("Should refused the sign-up because the account already exists", function() {
      signUpPageContext
        .createNewAccount(data.account)
        .switchTo(CreateAccountPage)
        .onPage();
    });
  });

});