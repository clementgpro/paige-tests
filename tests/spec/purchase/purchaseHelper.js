var WineShopPage = require('../../lib/wines-shop/wines-shop.js');

exports.purchase =

/**
 * Add an item to the card
 * @required already logged in
 * @param  {[object]} page - should not be null
 * @return the page
 */
function(page) {
	if (!page) throw 'context needs to be defined';
	return page
		.redirectTo(WineShopPage)
		.chooseRedType()
		.clickOnFirstWine()
		.enterQuantity(1)
		.clickAddToCart()
		.onPage();
};