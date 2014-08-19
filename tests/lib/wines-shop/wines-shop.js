var Page = require('be-paige').Page,

	WineShop = Page.extend({
		pageRoot: '/shop/',

		selectors: {
			// bloc
			mainBloc: '.main',
			catalogBloc: '.catalog-top',
			filtersBloc: '.filter-wrap',
			productsBloc: '.category-products',

			// FILTERS
			// types
			redCheckBox: '#filter-red',
			roseCheckBox: '#filter-rosé',
			sparklingCheckBox: '#filter-sparkling',
			whiteCheckBox: '#filter-white',

			// Wines
			firstWine: '.item.last',
			quantityTextField: '#qty',
			addToCartButton: '.button.btn-cart'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.mainBloc).then(function() {
				this._super([
					this.selectors.mainBloc,
					this.selectors.catalogBloc,
					this.selectors.filtersBloc,
					this.selectors.productsBloc
				]);
			}.bind(this));

			return this;
		},

		/** 
		 * Choose a type of wine.
		 * @param {string} selector should not be null
		 * @private
		 */
		_chooseType: function(selector) {
			this.exists(selector).then(function() {
				this.find(selector).click();
			}.bind(this));
			return this;
		},

		chooseRedType: function() {
			this._chooseType(this.selectors.redCheckBox);
			return this;
		},

		chooseRoseType: function() {
			this._chooseType(this.selectors.roseCheckBox);
			return this;
		},

		chooseSparkingType: function() {
			this._chooseType(this.selectors.sparklingCheckBox);
			return this;
		},

		chooseWhiteType: function() {
			this._chooseType(this.selectors.whiteCheckBox);
			return this;
		},

		/**
		 * Click on the first wine.
		 */
		clickOnFirstWine: function() {
			this.whenDisplayed(this.selectors.firstWine).then(function() {
				this.find(this.selectors.firstWine).click();
			}.bind(this));
			return this;
		},

		/**
		 * Enter the needed quantity to purchase.
		 * @param  {[int]} quantity - the quantity you want to purchase
		 */
		enterQuantity: function(quantity) {
			this.whenDisplayed(this.selectors.quantityTextField).then(function() {
				// clear method does not return this so we have to do it this way
				var quantityTextField = this.find(this.selectors.quantityTextField);
				quantityTextField.clear();
				quantityTextField.sendKeys('1');
			}.bind(this));
			return this;
		},

		/**
		 * Click on the add to cart button.
		 */
		clickAddToCart: function() {
			this.whenDisplayed(this.selectors.addToCartButton).then(function() {
				this.find(this.selectors.addToCartButton).click();
			}.bind(this));
			return this;
		}
	});

module.exports = WineShop;