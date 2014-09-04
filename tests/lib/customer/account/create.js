var Page = require('be-paige').Page,
	Create = Page.extend({

		pageRoot: '/customer/account/create/',
		selectors: {
			signUpBox: '.page .sign-up-cntnt'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.signUpBox).then(function() {
				this._super([
					this.selectors.signUpBox
				]);
			}.bind(this));
			return this;
		}
	});

module.exports = Create;