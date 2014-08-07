var Page = require('be-paige').Page,

	Create = Page.extend({
		pageRoot: '/customer/account/create/',

		selectors:{
			blocCreate: '.account-create.standard'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.blocCreate).then(function() {
				this._super([
					this.selectors.blocCreate
				]);
			}.bind(this));

			return this;
		}
	});

module.exports = Create;