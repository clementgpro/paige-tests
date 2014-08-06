var bescribe = require('be-paige/bescribe');
var TheQuizPage = require('../../lib/the-quiz/the-quiz.js');
var SignUpPage = require('../../lib/sign-up/sign-up.js');
var MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js');

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

bescribe("Sign up", config, function(context, describe, it) {
  describe("Accepted registration", function() {
    it("Sign up successfully", function() {
      context.Page.build()
        .redirectTo(TheQuizPage)
        .goEndQuiz()
        .clickYesShippingUsa()
        .submitQuizForm()
        .switchTo(SignUpPage)
        .completeSignUpForm(
          'glassful',
          'test',
          'glassful.test' + new Date().getTime() + '@yopmail.com',
          'password')
        .submitSignUpForm()
        .switchTo(MonthlyBoxPage)
        .onPage();
    });

  });

});