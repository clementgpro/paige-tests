var Page = require('be-paige').Page,

	Forms = require('be-paige').components.form,

	TheQuiz = Page.extend({
		pageRoot: '/the-quiz/',

		forms: {
			quizForm: {
				context: '#quiz-form',
				inputs: {
					shippingUsaYesRadioButton: {
						selector: '.rdio-ny-yes',
						type: 'custom radio'
					}
				}
			}
		},

		selectors: {
			buttonNext: '#btn-next-button',
			buttonFinish: '#btn-finish-quiz',
			radioShippingUsa: '.rdio-ny-yes'
		},

		fillInCustomRadio: function($form, selector, data) {
			$form.find('.rdio-ny-yes').click();
			return this;
		},

		clickYesShippingUsa: function() {
			return this.enterInformation('quizForm', {
				shippingUsaYesRadioButton: true
			});
		},

		clickNextButton: function() {
			this.whenDisplayed(this.selectors.buttonNext).then(function() {
				this.find(this.selectors.buttonNext).click();
			}.bind(this));
			return this;
		},

		goEndQuiz: function() {
			for (var i = 0; i < 7; i++) {
				this.clickNextButton();
			}
			return this;
		},

		submitQuizForm: function() {
			this.whenDisplayed(this.selectors.buttonFinish).then(function() {
				this.find(this.selectors.buttonFinish).click();
			}.bind(this));
			return this;
		}


	}).with(Forms);

module.exports = TheQuiz;