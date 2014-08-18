var Page = require('be-paige').Page,

	Forms = require('be-paige').components.form,

	CustomerAccountEdit = Page.extend({
		pageRoot: '/customer/account/edit/',

		forms: {
			editForm: {
				context: '#form-validate',
				submit: '#form-validate [type=submit]',
				inputs: {
					firstNameTextField: {
						selector: '#firstname',
						type: 'text'
					},

					lastNameTextField: {
						selector: '#lastname',
						type: 'text'
					},

					emailAddressTextField: {
						selector: '#email',
						type: 'text'
					},

					changePasswordCheckBox: {
						selector: '#change_password',
						type: 'custom checkbox'
					},

					currentPasswordTextField: {
						selector: '#current_password',
						type: 'text'
					},

					newPasswordTextField: {
						selector: '#password',
						type: 'text'
					},

					confirmNewPasswordTextField: {
						selector: '#confirmation',
						type: 'text'
					},
				}
			}
		},

		onPage: function() {
			this.whenDisplayed(this.forms.editForm.context).then(function() {
				this._super([
					this.forms.editForm.submit,
					this.forms.editForm.inputs.firstNameTextField.selector,
					this.forms.editForm.inputs.lastNameTextField.selector,
					this.forms.editForm.inputs.emailAddressTextField.selector
				]);
			}.bind(this));

			return this;
		},

		completeEditForm: function(firstName, lastName, email) {
			return this.enterInformation('editForm', {
				firstNameTextField: firstName,
				lastNameTextField: lastName,
				emailAddressTextField: email
			});
		},

		// password
		fillInCustomCheckbox: function($form, selector, data) {
			$form.find(this.forms.editForm.inputs.changePasswordCheckBox.selector).click();
			return this;
		},

		showPasswordForm: function() {
			return this.enterInformation('editForm', {
				changePasswordCheckBox: true
			});
		},

		completePasswordInformation: function(currentPassword, newPassword, confirmNewPassword) {
			return this.enterInformation('editForm', {
				currentPasswordTextField: currentPassword,
				newPasswordTextField: newPassword,
				confirmNewPasswordTextField: confirmNewPassword
			});
		},

		submitEditForm: function() {
			return this.submitForm('editForm');
		}
	}).with(Forms);

module.exports = CustomerAccountEdit;