// Imports
var bescribe = require('be-paige/bescribe'),
	LoginHelper = require('../customer/account/login/loginHelper.js'),
	PurchaseHelper = require('../purchase/purchaseHelper.js'),
	WineShopPage = require('../../lib/wines-shop/wines-shop.js'),
	common = require('../common/common.js'),
	data = require('../common/data.js');

// Global variables
var wineShopContext;

// Tests
bescribe("Purchase", common.config, function(context, describe, it) {
	// Before each test, it needs to be logged in
	beforeEach(function() {
		wineShopContext = LoginHelper.login(context.Page.build(), data.account);
	});

	describe("Purchase", function() {
		it("Should place a wine in the cart", function() {
			PurchaseHelper.purchase(wineShopContext, data.account);
		});
	});
});