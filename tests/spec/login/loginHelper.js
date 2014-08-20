var LoginPage = require('../../lib/login/login.js');
var MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js');

exports.login =

/**
 * Login to glassful
 * @param  {[object]} page - should not be null
 * @param  {[object]} account - should have an email and password attributes
 * @return the page
 */
function(page, account) {
	if (!page) throw 'context needs to be defined';
	return page
		.redirectTo(LoginPage)
		.completeLoginForm(account.email, account.password)
		.submitLoginForm()
		.switchTo(MonthlyBoxPage)
		.onPage();
};