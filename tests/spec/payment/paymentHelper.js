var PaymentPage = require('../../lib/payment/payment.js'),
	SuccessPage = require('../../lib/payment/success.js');

exports.pay = function(page) {
	return page
		.redirectTo(PaymentPage)
		.completeBillingForm('street', 'city', '11101', '1231231234')
		.submitBillingForm()
		.completeCardForm('name', '4111111111111111', '123')
		.submitCardForm()
		.submitPayment()
		.switchTo(SuccessPage)
		.onPage();
};