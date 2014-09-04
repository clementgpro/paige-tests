/* jshint expr:true */
var Page = require('be-paige').Page,
	Forms = require('be-paige').components.form,
	expect = require('chai').expect,
	messages = require('../common/messages.js'),
	selectors = require('../common/selectors.js'),
	Customer = Page.extend({
		pageRoot: '/customer/account/',

		forms: {
			skipTheMonthForm: {
				context: '.frm-skip-month',
				submit: '.frm-skip-month [type=submit]'
			},
			cancelSubscriptionForm: {
				context: '#cancel-subscription-modal .frm-skip-month',
				submit: '#cancel-subscription-modal [type=submit]'
			}
		},

		selectors: {
			// box
			accountBox: '.my-account',
			accountInfoBox: '.info-box.client-info-box',
			addressBox: '.box-title.section-title.arrow.underline-white',
			orderReviewBox: '.info-box.order-box',
			creditCardBox: '.info-box.cc-info-box',
			contentBox: '.box-content.scoutregular p:first-child',

			// buttons
			skipTheMonthButton: '.btn-skip-month',
			resumeTheMonthButton: '.btn-black.scoutcondensedregular',
			cancelSubscriptionButton: '.btn-cancel-subscription'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.accountBox).then(function() {
				this._super([
					this.selectors.accountInfoBox,
					this.selectors.addressBox,
					this.selectors.orderReviewBox,
					this.selectors.creditCardBox
				]);
			}.bind(this));

			return this;
		},

		// CLICK
		/**
		 * Skip the month.
		 * @return {Object} the context
		 */
		clickSkipTheMonth: function() {
			this.whenDisplayed(this.selectors.skipTheMonthButton).then(function() {
				this.find(this.selectors.skipTheMonthButton).click();
			}.bind(this));
			return this;
		},

		/**
		 * Resume the month.
		 * @return {Object} the context
		 */
		clickResumeTheMonth: function() {
			this.whenDisplayed(this.selectors.resumeTheMonthButton).then(function() {
				this.find(this.selectors.resumeTheMonthButton).click();
			}.bind(this));
			return this;
		},

		/**
		 * Cancel the subscription
		 * @return {Object} the context
		 */
		clickCancelSubscription: function() {
			this.whenDisplayed(this.selectors.cancelSubscriptionButton).then(function() {
				this.find(this.selectors.cancelSubscriptionButton).click();
			}.bind(this));
			return this;
		},

		// SUBMIT
		/**
		 * Skip the month.
		 * @return {Object} the context
		 */
		submitSkipTheMonthForm: function() {
			this.whenDisplayed(this.forms.skipTheMonthForm.context).then(function() {
				this.submitForm('skipTheMonthForm');
			}.bind(this));
			return this;
		},

		/**
		 * Submit the cancel subscription
		 * @return {Object} the context
		 */
		submitCancelSubscriptionForm: function() {
			this.whenDisplayed(this.forms.cancelSubscriptionForm.context).then(function() {
				this.submitForm('cancelSubscriptionForm');
			}.bind(this));
			return this;
		},

		// VERIFY
		/**
		 * Verify that the month has been skipped.
		 * @return {Object} the context
		 */
		verifyMonthHasBeenSkipped: function() {
			return this.verifyContent(this.selectors.contentBox, messages.customer.confirmation_month_skipped);
		},

		/**
		 * Verify that the month has been resumed.
		 * @return {Object} the context
		 */
		verifyMonthHasBeenResumed: function() {
			this.exists(this.selectors.skipTheMonthButton).then(function(elementExists) {
				expect(elementExists).to.be.true;
			});
		},

		/**
		 * Verify that the subscription has been cancelled.
		 * @return {Object} the context
		 */
		verifySubscriptionHasBeenCancelled: function() {
			return this.verifyContent(selectors.message, messages.customer.subscription_canceled);
		}
	}).with(Forms);

module.exports = Customer;