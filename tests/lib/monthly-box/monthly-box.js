/* jshint expr:true */
var Page = require('be-paige').Page,
	expect = require('chai').expect,
	MonthlyBox = Page.extend({
		pageRoot: '/monthly-box/',
		selectors: {
			// box
			welcomeBox: '.clear-box',
			bannerMonthBox: '.collection-banner.monthly',
			collectionWinesBox: '.collection-wines.container',

			// button
			subscribeButton: '.btn-subscribe.btn-green.btn-welcome.scoutcondensedregular'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.welcomeBox).then(function() {
				this._super([
					this.selectors.welcomeBox
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
			this.exists(this.selectors.bannerMonthBox).then(function(elementExists) {
				expect(elementExists).to.be.true;
			}.bind(this));
			return this;
		}
	});

module.exports = MonthlyBox;