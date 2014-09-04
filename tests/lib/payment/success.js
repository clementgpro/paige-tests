var Page = require('be-paige').Page,
	Forms = require('be-paige').components.form,
	Success = Page.extend({
		pageRoot: '/checkout/onepage/success',

		selectors: {
			// blocs
			confirmedBloc: '.order-confirmed.container'
		},

		onPage: function() {
			this.whenDisplayed(this.selectors.confirmedBloc).then(function() {
				this._super([
					this.selectors.confirmedBloc
				]);
			}.bind(this));

			return this;
		}
	}).with(Forms);

module.exports = Success;