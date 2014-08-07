var Page = require('be-paige').Page,

	MonthlyBox = Page.extend({
		pageRoot: '/monthly-box/',

		selectors: {
			blocWelcome: '.welcome-box.scoutregular.clear-box'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.blocWelcome).then(function() {
				this._super([
					this.selectors.blocWelcome
				]);
			}.bind(this));

			return this;
		},
	});

module.exports = MonthlyBox;