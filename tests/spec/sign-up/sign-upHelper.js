var TheQuizPage = require('../../lib/the-quiz/the-quiz.js'),
	SignUpPage = require('../../lib/sign-up/sign-up.js'),
	MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js');

exports.signUp =
/**
 * Create a newaccount.
 * @param  {[object]} page - context
 * @param  {[object]} accountToCreate - should contains email and password fields
 * @return void
 */
function(page, accountToCreate) {
	return page
		.redirectTo(TheQuizPage)
		.goEndQuiz()
		.clickYesShippingUsa()
		.submitQuizForm()
		.switchTo(SignUpPage)
		.createNewAccount(accountToCreate)
		.switchTo(MonthlyBoxPage)
		.onPage();
};