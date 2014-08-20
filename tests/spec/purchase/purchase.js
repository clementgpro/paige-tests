// Imports
var bescribe = require('be-paige/bescribe'),
	LoginHelper = require('../login/loginHelper.js'),
	WineShopPage = require('../../lib/wines-shop/wines-shop.js'),
	common = require('../common/common.js'),
	data = require('../common/data.js');

// Global variables
var wineShopContext;

// Tests
bescribe("Purchase", common.config, function(context, describe, it) {
	// Before each test, it needs to be logged in
	beforeEach(function() {
		wineShopContext = LoginHelper.login(context.Page.build(), data.account).redirectTo(WineShopPage);
	});

	describe("Purchase", function() {
		it("Should place a wine in the cart", function() {
			wineShopContext
				.chooseRedType()
				.clickOnFirstWine()
				.enterQuantity(1)
				.clickAddToCart()
				.onPage();
		});
	});
});