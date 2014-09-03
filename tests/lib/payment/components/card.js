/* jshint expr:true */
var expect = require('chai').expect,
	CreditCard = {
		constants: {
			NEW_CREDIT_CARD: 'New Credit Card'
		},

		selectors: {
			// blocs
			cartEmptyBloc: '.pg-cart-empty.container',
			coverCheckoutPayment: '#checkout-step-payment .step-cover',

			// buttons
			cardComboTrigger: '#co-payment-form .pix-selectable',
			clearCartButton: '#empty_cart_button',

			// combos
			americanVisaCombo: '#co-payment-form #payment_form_cimmethod li:last-child',

			// label
			typeCardLabel: '#checkout-payment-method-load .box-subtitle:first-child label'
		},

		fillInTrigger: function($form, selector, data) {
			$form.find(selector).click();
			return this;
		},

		fillInCustomOption: function($form, selector, data) {
			$form.find(selector).click();
			return this;
		},

		/**
		 * Clear the cart
		 * @return {this} the context
		 */
		clearCart: function() {
			this.whenDisplayed(this.selectors.clearCartButton).then(function() {
				this.find(this.selectors.clearCartButton).click();
			}.bind(this));
			return this;
		},

		/**
		 * Choose the american visa in the comobox for the card.
		 * @return {[object]} the page
		 */
		_chooseAmericanVisaCombo: function() {
			// the combo is only displayed when we click on the a tag which is the trigger
			// that's why we need to click on it just before select the value from the combo
			this.whenDisplayed(this.selectors.cardComboTrigger).then(function() {
				this.find(this.selectors.cardComboTrigger).click();
				this.find(this.selectors.americanVisaCombo).click();
			}.bind(this));

			return this;
		},

		/**
		 * Verify that the cart is empty
		 * @return {Boolean} true if the cart is empty
		 */
		verifyCartEmpty: function() {
			this.exists(this.selectors.cartEmptyBloc).then(function(elementExists) {
				expect(elementExists).to.be.true;
			});
		},

		completeCardForm: function(cardHolderName, cardNumber, cvc) {
			this.whenNotDisplayed(this.selectors.coverCheckoutPayment).then(function() {
				this.find(this.selectors.typeCardLabel).getText().then(function(innerText) {
					if (innerText === this.constants.NEW_CREDIT_CARD) {
						this.enterInformation('cardForm', {
							cardTypeComboTrigger: true,
							visaCardOption: true,
							cardHolderNameTextField: cardHolderName,
							cardNumberTextField: cardNumber,
							cvcTextField: cvc,
							monthComboTrigger: true,
							januaryOption: true,
							yearComboTrigger: true,
							yearOption: true
						});
					} else {
						this._chooseAmericanVisaCombo();
					}
				}.bind(this));
			}.bind(this));
			return this;
		},

		submitCardForm: function() {
			return this.submitForm('cardForm');
		},

	};

module.exports = CreditCard;