// Imports
var bescribe = require('be-paige/bescribe'),
	LoginHelper = require('../customer/account/login/loginHelper.js'),
	PurchaseHelper = require('../purchase/purchaseHelper.js'),
	PaymentHelper = require('./paymentHelper.js'),
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
		winePaymentContext = LoginHelper.login(context.Page.build(), data.account).redirectTo(PaymentPage).clearCart();
	});

	describe("Cart", function() {
		
	});

	describe("Coupon", function() {
		it("Should refuse the coupon code", function() {
			PurchaseHelper.purchase(winePaymentContext).redirectTo(PaymentPage);
			winePaymentContext
				.completeSubmitCouponForm(data.coupon.invalid)
				.submitFormCouponForm()
				.verifyCouponIsInvalid(data.coupon.invalid);
		});

		it("Should accept the valid coupon code", function() {
			PurchaseHelper.purchase(winePaymentContext).redirectTo(PaymentPage);
			winePaymentContext
				.completeSubmitCouponForm(data.coupon.valid)
				.submitFormCouponForm()
				.verifyCouponIsValid(data.coupon.valid);
		});
	});

	describe("Submit order", function() {
		it("Should refuse the order because the card has not been choosen", function() {
			PurchaseHelper.purchase(winePaymentContext).redirectTo(PaymentPage);
			winePaymentContext
				.submitBillingForm()
				.submitCardForm()
				.onPage();
		});

		it("Should accept the order", function() {
			PurchaseHelper.purchase(winePaymentContext).redirectTo(PaymentPage);
			PaymentHelper.pay(winePaymentContext);
		});
	});
});