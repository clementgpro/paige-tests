Page = require('be-paige').Page,

Forms = require('be-paige').components.forms,

Login = Page.extend({
  pageRoot: '/customer/account/login/',

  forms: {
    loginForm: {
      context: '#login-form',
      submit: '.main #send2',
      inputs: {
        emailField: {
          selector: '#email',
          type: 'text'
        },
        passwordField: {
          selector: '#pass',
          type: 'text'
        }
      }

    }
  }, 

  completeLoginForm: function() {
    return this.enterInformation('loginForm', {
      // TODO mettre un autre compte
      emailField: 'clement.guet@gmail.com',
      passwordField: 'JraldM01'
    });
  },

  submitForm: function() {
    return this.submitForm('loginForm');
  }

}).with(Forms);

module.exports = Login;
