var Page = require('be-paige').Page,

	Forms = require('be-paige').components.form,

	TheQuiz = Page.extend({
		pageRoot: '/glassful/current/index.php/the-quiz/',

		forms: {
			quizForm: {
				context: '#quiz-form',
				inputs: {
					radioShippingUsaYes: {
						selector: '.rdio-ny-yes',
						type: 'custom radio'
					},
					radioShippingUsaNo: {
						selector: '.rdio-ny-no',
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

		clickYesShippingUsa: function() {
			return this.enterInformation('quizForm', {
				radioShippingUsaYes: true
			});
		},

		submitQuizForm: function() {
			this.whenDisplayed(this.selectors.buttonFinish).then(function() {
				this.find(this.selectors.buttonFinish).click();
			}.bind(this));
			return this;
		}


	}).with(Forms);

module.exports = TheQuiz;