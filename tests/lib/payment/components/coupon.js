var common = require('../../common/common.js'),
	Coupon = {

		selectors: {
			couponButton: '.btn-redeem-coupon.scoutregular'
		},

		_clickCouponCode: function() {
			this.whenDisplayed(this.selectors.couponButton).then(function() {
				this.find(this.selectors.couponButton).click();
			}.bind(this));
			return this;
		},

		completeSubmitCouponForm: function(couponCode) {
			this._clickCouponCode().whenDisplayed(this.forms.couponCodeForm.inputs.couponCodeTextField.selector).then(function() {
				this.enterInformation('couponCodeForm', {
					couponCodeTextField: couponCode
				});
			}.bind(this));
			return this;
		},

		submitFormCouponForm: function() {
			return this.submitForm('couponCodeForm');
		},

		verifyCouponIsInvalid: function() {
			return this.verifyContent(common.selectors.message, 'Coupon code "wrongcode" is not valid.');
		},

		verifyCouponIsValid: function() {
			return this.verifyContent(common.selectors.message, 'Coupon code "BEPAIGETEST" was applied.');
		}
	};

module.exports = Coupon;