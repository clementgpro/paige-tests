var Page = require('be-paige').Page,
	Forms = require('be-paige').components.form,
	billing = require('./components/billing.js'),
	creditCard = require('./components/card.js'),
	coupon = require('./components/coupon.js'),

	Payment = Page.extend({
		pageRoot: '/checkout/onepage/',
		constants: {},
		forms: {
			billingForm: {
				context: '#co-billing-form',
				submit: '#co-billing-form button',
				inputs: {
					addressTypeTrigger: {
						selector: '.field.address-type a',
						type: 'trigger'
					},
					addressTypeCombo: {
						selector: '.pix-selectable.active li:last-child',
						type: 'custom combo'
					},
					streetTextField: {
						selector: '#billing\\:street1',
						type: 'text'
					},
					cityTextField: {
						selector: '#billing\\:city',
						type: 'text'
					},
					zipCodeTextField: {
						selector: '#billing\\:postcode',
						type: 'text'
					},
					telephoneTextField: {
						selector: '#billing\\:telephone',
						type: 'text'
					}
				}
			},
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
					cvcTextField: '#authorizenet_cc_cid',
				}
			},
			couponCodeForm: {
				context: '#discount-coupon-form',
				submit: '.btn-white',
				inputs: {
					couponCodeTextField: {
						selector: '#coupon_code',
						type: 'text'
					}
				},
			}
		},

		selectors: {
			// blocs
			mainBloc: '.col-three.clear-box',
			billingShippingBloc: '#checkoutSteps',
			creditCardBloc: '#opc-payment',

			// buttons
			submitPayment: '#co-payment-form button',
			clearCartButton: '#empty_cart_button'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.mainBloc).then(function() {
				this._super([
					this.selectors.mainBloc,
					this.selectors.billingShippingBloc,
					this.selectors.creditCardBloc
				]);
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

	}).with(Forms, billing, creditCard, coupon);

module.exports = Payment;