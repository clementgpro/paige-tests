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
	return page.redirectTo(TheQuizPage)
		.goEndQuiz()
		.clickYesShippingUsa()
		.submitQuizForm()
		.switchTo(SignUpPage)
		.createNewAccount(accountToCreate)
		.switchTo(MonthlyBoxPage)
		.onPage()
		// TODO do it the right way because it's a huge hack 
		// I should use .done() but the session is pending and it doesn't go to the if and so the quit()
		._session.quit();
};