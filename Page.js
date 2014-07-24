Page = require('be-paige').Page,

Forms = require('be-paige').components.form,

expect = require('chai').expect,

Login = Page.extend({
  pageRoot: '/customer/account/login/',

  selectors: {
    // selectors go here
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
    return this.enterInformation('loginForm',  
    {
      emailField: 'test@yopmail.fr',
      passwordField: 'password'
    });
  },

  submitLoginForm: function() {
    return this.submitForm('loginForm');
  }

  verifyPrice: function(){
    return this.find('.txt-box-pricing.scoutcondensedregular').then(
      function(element){
        expect(element.getValue()).to.contain('$35.00'):  
      }
    );
  }

}).with(Forms); 

module.exports = Login;
