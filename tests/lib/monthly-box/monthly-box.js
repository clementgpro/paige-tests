/* jshint expr:true */
var Page = require('be-paige').Page,
	expect = require('chai').expect,

	MonthlyBox = Page.extend({
		pageRoot: '/monthly-box/',

		selectors: {
			blocWelcome: '.clear-box',

			// subscriber bloc
			bannerMonthBloc: '.collection-banner.monthly',
			collectionWinesBloc: '.collection-wines.container',

			// buttons
			subscribeButton: '.btn-subscribe.btn-green.btn-welcome.scoutcondensedregular'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.blocWelcome).then(function() {
				this._super([
					this.selectors.blocWelcome
				]);
			}.bind(this));

			return this;
		},

		/**
		 * Subscribe.
		 * @return {object} the context of the page
		 */
		clickSuscribeButton: function() {
			this.whenDisplayed(this.selectors.subscribeButton).then(function() {
				this.find(this.selectors.subscribeButton).click();
			}.bind(this));
			return this;
		},
		/**
		 * Verify that the user is a subscriber
		 * @return {Boolean} true if the user is a subscriber
		 */
		verifySubscriber: function() {
			this.exists(this.selectors.bannerMonthBloc).then(function(elementExists) {
				expect(elementExists).to.be.true;
			}.bind(this));
			return this;
		}
	});

module.exports = MonthlyBox;