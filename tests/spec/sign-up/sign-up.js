var bescribe = require('be-paige/bescribe');
var TheQuizPage = require('../../lib/the-quiz/the-quiz.js');
var SignUpPage = require('../../lib/sign-up/sign-up.js');
var MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js');
var CreateAccountPage = require('../../lib/customer/account/create.js');

var config = require('../config/config.js');

var signUpPageContext;

bescribe("Sign up", config, function(context, describe, it) {

  // go to the end of the quiz before each test
  beforeEach(function() {
    signUpPageContext = context.Page.build()
      .redirectTo(TheQuizPage)
      .goEndQuiz()
      .clickYesShippingUsa()
      .submitQuizForm()
      .switchTo(SignUpPage);
  });


  describe("Accepted registration", function() {
    it("Sign up successfully", function() {
      signUpPageContext
        .createNewAccount('glassful.test.sign-up' + new Date().getTime() + '@yopmail.com')
        .switchTo(MonthlyBoxPage)
        .onPage();
    });
  });

  describe("Refused registration", function() {
    it("Account already exists", function() {
      signUpPageContext
        .createNewAccount('glassful.test@yopmail.com')
        .switchTo(CreateAccountPage)
        .onPage();
    });
  });

});