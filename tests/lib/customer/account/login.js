var Page = require('be-paige').Page,
    Forms = require('be-paige').components.form,
    expect = require('chai').expect,

    Login = Page.extend({
        pageRoot: '/customer/account/login/',

        forms: {
            loginForm: {
                context: '.main #login-form',
                submit: '#send2',
                inputs: {
                    emailField: {
                        selector: '.main #email',
                        type: 'text'
                    },
                    passwordField: {
                        selector: '.main #pass',
                        type: 'text'
                    }
                }
            }
        },

        onPage: function() {
            this.whenDisplayed(this.forms.loginForm.context).then(function() {
                this._super([
                    this.forms.loginForm.inputs.emailField.selector,
                    this.forms.loginForm.inputs.passwordField.selector
                ]);
            }.bind(this));

            return this;
        },

        completeLoginForm: function(email, password) {
            return this.enterInformation('loginForm', {
                emailField: email,
                passwordField: password
            });
        },

        submitLoginForm: function() {
            return this.submitForm('loginForm');
        },

        verifyPrice: function() {
            return this.whenDisplayed(this.selectors.pricing).then(function() {
                this.find(this.selectors.pricing).getText().then(function(innerText) {
                    expect(innerText).to.contain('$35.00');
                });
            }.bind(this));
        }

    }).with(Forms);

module.exports = Login;