var Billing = {
	constants: {
		BILLING_ADRESS: 'Billing Address'
	},

	selectors: {
		addressTitle: '.step-title.box-subtitle h3'
	},

	fillInTrigger: function($form, selector, data) {
		$form.find(selector).click();
		return this;
	},

	fillInCustomCombo: function($form, selector, data) {
		$form.find(selector).click();
		return this;
	},

	completeBillingForm: function(street, city, zipcode, telephone) {
		this.find(this.selectors.addressTitle).getText().then(function(innerText) {
			if (innerText === this.constants.BILLING_ADRESS) {
				this.enterInformation('billingForm', {
					addressTypeTrigger: true,
					addressTypeCombo: true,
					streetTextField: street,
					cityTextField: city,
					zipCodeTextField: zipcode,
					telephoneTextField: telephone
				});
			}
		}.bind(this));
		return this;
	},

	submitBillingForm: function() {
		return this.submitForm('billingForm');
	}
};

module.exports = Billing;