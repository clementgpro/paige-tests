var selectors = require('../../common/selectors.js'),
	messages = require('../../common/messages.js'),
	Coupon = {
		forms: {
			couponCodeForm: {
				context: '#discount-coupon-form',
				submit: '.btn-white',
				inputs: {
					couponCodeTextField: '#coupon_code'
				}
			}
		},

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
			this._clickCouponCode().whenDisplayed(this.forms.couponCodeForm.inputs.couponCodeTextField).then(function() {
				this.enterInformation('couponCodeForm', {
					couponCodeTextField: couponCode
				});
			}.bind(this));
			return this;
		},

		submitFormCouponForm: function() {
			return this.submitForm('couponCodeForm');
		},

		verifyCouponIsInvalid: function(couponCode) {
			return this.verifyContent(selectors.message, messages.payment.coupon.error(couponCode));
		},

		verifyCouponIsValid: function(couponCode) {
			return this.verifyContent(selectors.message, messages.payment.coupon.success(couponCode));
		}
	};

module.exports = Coupon;