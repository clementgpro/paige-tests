/* jshint expr:true */
var messages = require('../../common/messages.js'),
	expect = require('chai').expect,
	CreditCard = {
		forms: {
			cardForm: {
				context: '#co-payment-form',
				submit: '#co-payment-form button',
				inputs: {
					cardTypeComboTrigger: {
						selector: '#co-payment-form .pix-selectable a',
						type: 'trigger'
					},
					visaCardOption: {
						selector: '.pix-selectable.active li:nth-child(3)',
						type: 'custom option'
					},
					monthComboTrigger: {
						selector: '.v-fix.exp-month a',
						type: 'trigger'
					},
					januaryOption: {
						selector: '.v-fix.exp-month li:nth-child(2)',
						type: 'custom option'
					},
					yearComboTrigger: {
						selector: '.v-fix.exp-year a',
						type: 'trigger'
					},
					yearOption: {
						selector: '.v-fix.exp-year li:nth-child(10)',
						type: 'custom option'
					},
					cardHolderNameTextField: '#authorizenet_cc_owner',
					cardNumberTextField: '#authorizenet_cc_number',
					cvcTextField: '#authorizenet_cc_cid'
				}
			}
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
			this.exists(this.selectors.clearCartButton).then(function(elementExists) {
                if(elementExists){
                    this.find(this.selectors.clearCartButton).click();
                }
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

		/**
		 * Complete the card form
		 * @param cardHolderName
		 * @param cardNumber
		 * @param cvc
		 * @returns {Object} the context
		 */
		completeCardForm: function(cardHolderName, cardNumber, cvc) {
			this.whenNotDisplayed(this.selectors.coverCheckoutPayment).then(function() {
				this.find(this.selectors.typeCardLabel).getText().then(function(innerText) {
					if (innerText === messages.payment.card.new_credit_card) {
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

		/**
		 * Submit the card form.
		 * @returns {Object} the context
		 */
		submitCardForm: function() {
            this.whenNotDisplayed(this.selectors.coverCheckoutPayment).then(function() {
			    this.submitForm('cardForm');
            }.bind(this));
            return this;
		}

	};

module.exports = CreditCard;