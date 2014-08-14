var Page = require('be-paige').Page,

	Customer = Page.extend({
		pageRoot: '/customer/account/',

		selectors: {
			blocAccount: '.my-account',
			blocAccountInfo: '.info-box.client-info-box',
			blocAddress: '.box-title.section-title.arrow.underline-white',
			blocOrderReview: '.info-box.order-box',
			blocCreditCard: '.info-box.cc-info-box'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.blocAccount).then(function() {
				this._super([
					this.selectors.blocAccountInfo,
					this.selectors.blocAddress,
					this.selectors.blocOrderReview,
					this.selectors.blocCreditCard
				]);
			}.bind(this));

			return this;
		}
	});

module.exports = Customer;