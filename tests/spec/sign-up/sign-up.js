var bescribe = require('be-paige/bescribe');
var TheQuizPage = require('../../lib/the-quiz/the-quiz.js');
var SignUpPage = require('../../lib/sign-up/sign-up.js');
var MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js');
var CreateAccountPage = require('../../lib/customer/account/create.js');

var config = {
  address: 'http://happy.pixafy.com/glassful/current/index.php',
  webdriver: {
    address: 'http://localhost:4444/wd/hub',
    config: {
      platform: 'MAC',
      browserName: 'chrome'
    }
  }
};

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
        .completeSignUpForm(
          'glassful',
          'test',
          'glassful.test.sign-up' + new Date().getTime() + '@yopmail.com',
          'password')
        .submitSignUpForm()
        .switchTo(MonthlyBoxPage)
        .onPage();
    });
  });

  describe("Refused registration", function() {
    it("Account already exists", function() {
      signUpPageContext
        .completeSignUpForm(
          'glassful',
          'test',
          'glassful.test@yopmail.com',
          'password')
        .submitSignUpForm()
        .switchTo(CreateAccountPage)
        .onPage();
    });
  });

});