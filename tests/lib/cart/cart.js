var Page = require('be-paige').Page,

	Forms = require('be-paige').components.form,

	Payment = Page.extend({
		pageRoot: '/checkout/cart/',

		selectors: {
			emptyBloc: '.pg-cart-empty.container'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.blocWelcome).then(function() {
				this._super([
					this.selectors.emptyBloc
				]);
			}.bind(this));

			return this;
		},
		/**
		 * Click on the billing button.
		 * @return {[object]} the page
		 */
		clickBillingButton: function() {
			this.whenDisplayed(this.selectors.billingButton).then(function() {
				this.find(this.selectors.billingButton).click();
			}.bind(this));
			return this;
		},

		/**
		 * Choose the american visa in the comobox for the card.
		 * @return {[object]} the page
		 */
		chooseAmericanVisaCombo: function() {
			this.whenDisplayed(this.selectors.cardComboTrigger).then(function() {
				this.find(this.selectors.cardComboTrigger).click();
			}.bind(this));
			
			this.whenDisplayed(this.selectors.americanVisaCombo).then(function() {
				this.find(this.selectors.americanVisaCombo).click();
			}.bind(this));

			return this;
		},

		/**
		 * Submit the order
		 * @return {[object]} the page
		 */
		submitPayment: function() {
			this.whenDisplayed(this.selectors.submitPayment).then(function() {
				this.find(this.selectors.submitPayment).click();
			}.bind(this));
			return this;
		}


	}).with(Forms);

module.exports = Payment;