var Page = require('be-paige').Page,

	MonthlyBox = Page.extend({
		pageRoot: '/monthly-box/',

		selectors: {
			blocWelcome: '.clear-box',

			// buttons
			skipTheMonthButton: '.btn-skip-month',
			resumeTheMonthButton: '.btn-resume-month'
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
		 * Skip the current month.
		 * @return {[object]} the context of the page
		 */
		skipTheMonth: function() {
			if (this.exists(this.selectors.skipTheMonthButton)) {
				this.whenDisplayed(this.selectors.skipTheMonthButton).then(function() {
					this.find(this.selectors.skipTheMonthButton).click();
				}.bind(this));
			} else {
				throw "You have already skip the month.";
			}
			return this;
		},

		/**
		 * Resume the current month.
		 * @return {[object]} the context of the page
		 */
		resumeTheMonth: function() {
			if (this.exists(this.selectors.resumeTheMonthButton)) {
				this.whenDisplayed(this.selectors.resumeTheMonthButton).then(function() {
					this.find(this.selectors.resumeTheMonthButton).click();
				}.bind(this));
			} else {
				throw "You have already resume the month.";
			}
			return this;
		}
	});

module.exports = MonthlyBox;