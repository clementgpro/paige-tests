var LoginHelper = require('../login/loginHelper.js'),
	WineShopPage = require('../../lib/wines-shop/wines-shop.js');

exports.purchase =

/**
 * Add an item to the card
 * @param  {[object]} page - should not be null
 * @param  {[object]} account - should have an email and password attributes
 * @return the page
 */
function(page, account) {
	if (!page) throw 'context needs to be defined';
	return page
		.redirectTo(WineShopPage)
		.chooseRedType()
		.chooseFirstVarietal()
		.clickOnFirstWine()
		.enterQuantity(1)
		.clickAddToCart()
		.onPage();
};