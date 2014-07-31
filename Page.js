var Page = require('be-paige').Page;

var Forms = require('be-paige').components.form;

var chai = require('chai');
var expect = chai.expect;

var Login = Page.extend({
  pageRoot: '/customer/account/login/',

  selectors: {
    pricing: '.txt-box-pricing.scoutcondensedregular'
  },

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

  completeLoginForm: function() {
    return this.enterInformation('loginForm', {
      emailField: 'test@yopmail.fr',
      passwordField: 'password'
    });
  },

  submitLoginForm: function() {
    return this.submitForm('loginForm');
  },

  verifyPrice: function() {
    return this.whenDisplayed(this.selectors.pricing).then(function() {
      this.find(this.selectors.pricing).getText().then(function(innerText) {
        expect(innerText).to.contain('$36.00');
      });
    }.bind(this));
  }

}).with(Forms);

module.exports = Login;