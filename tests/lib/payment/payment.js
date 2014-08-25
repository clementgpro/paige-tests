var Page = require('be-paige').Page,

	Payment = Page.extend({
		pageRoot: '/checkout/onepage/',

		selectors: {
			// blocs
			mainBloc: '.col-three.clear-box',
			orderSummaryBloc: '.co-cart',
			billingShippingBloc: '#checkoutSteps',
			creditCardBloc: '#opc-payment',

			// buttons
			billingButton: '#billing-buttons-container button',
			cardComboTrigger: '#co-payment-form .pix-selectable',
			submitPayment: '#co-payment-form button',

			// combos
			americanVisaCombo: '#co-payment-form #payment_form_cimmethod li:last-child'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.blocWelcome).then(function() {
				this._super([
					this.selectors.orderSummaryBloc,
					this.selectors.orderSummaryBloc,
					this.selectors.billingShippingBloc,
					this.selectors.creditCardBloc
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
			// the combo is only displayed when we click on the a tag which is the trigger
			// that's why we need to click on it just before select the value from the combo
			this.whenDisplayed(this.selectors.cardComboTrigger).then(function() {
				this.find(this.selectors.cardComboTrigger).click();
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


	});

module.exports = Payment;