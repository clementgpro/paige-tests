Page = require('be-paige').Page,

Forms = require('be-paige').components.form,

Login = Page.extend({
  pageRoot: '/customer/account/login/',

  selectors: {
    // selectors go here
  },

  forms: {
    loginForm: {
      context: '.main #login-form',
      submit: '.main #send2',
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
    return this.enterInformation('loginForm',  
    {
      emailField: 'test@yopmail.fr',
      passwordField: 'password'
    });
  },

  submitLoginForm: function() {
    return this.submitForm('loginForm');
  }

}).with(Forms); 

module.exports = Login;
