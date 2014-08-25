// Imports
var bescribe = require('be-paige/bescribe'),
	LoginHelper = require('../login/loginHelper.js'),
	PaymentPage = require('../../lib/payment/payment.js'),
	SuccessPage = require('../../lib/payment/success.js'),
	common = require('../common/common.js'),
	data = require('../common/data.js');

// Global variables
var winePaymentContext;

// Tests
bescribe("Payment", common.config, function(context, describe, it) {
	// Before each test, it needs to be logged in
	beforeEach(function() {
		winePaymentContext = LoginHelper.login(context.Page.build(), data.account).redirectTo(PaymentPage);
	});

	describe("Success", function() {
		it("Should pay the wines", function() {
			winePaymentContext
				.clickBillingButton()
				.chooseAmericanVisaCombo()
				.submitPayment()
				.switchTo(SuccessPage)
				.onPage();
		});
	});
});