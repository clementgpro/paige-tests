var Page = require('be-paige').Page,
	Forms = require('be-paige').components.form,
	BillingComponent = require('./components/billing.js'),
	CreditCardComponent = require('./components/card.js'),
	CouponComponent = require('./components/coupon.js'),
	Payment = Page.extend({
		pageRoot: '/checkout/onepage/',
		// This need to be defined for the "child"
		constants: {},
		forms: {},

		selectors: {
			// blocs
			mainBloc: '.col-three.clear-box',
			billingShippingBloc: '#checkoutSteps',
			creditCardBloc: '#opc-payment'
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
		}
	}).with(Forms, BillingComponent, CreditCardComponent, CouponComponent);

module.exports = Payment;