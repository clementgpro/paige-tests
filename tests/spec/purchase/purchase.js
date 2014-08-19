// Imports
var bescribe = require('be-paige/bescribe');
var LoginPage = require('../../lib/login/login.js');
var WineShopPage = require('../../lib/wines-shop/wines-shop.js');
var common = require('../common/common.js');
var config = common.config;

// Global variable
var wineShopContext = null;

// Tests
bescribe("Purchase", config, function(context, describe, it) {
	// Before each test, it needs to be logged in
	beforeEach(function() {
		wineShopContext = context.Page.build()
			.redirectTo(LoginPage)
			.completeLoginForm('glassful.test@yopmail.com', 'password')
			.submitLoginForm()
			.redirectTo(WineShopPage);
	});

	describe("Purchase", function() {
		it("Basically purchase", function() {
			wineShopContext
				.chooseRedType()
				.clickOnFirstWine()
				.enterQuantity(1)
				.clickAddToCart()
				.onPage();
		});
	});
});