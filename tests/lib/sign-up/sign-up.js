var theQuiz = require('../the-quiz/the-quiz.js'),

  Forms = require('be-paige').components.form,

  SignUp = theQuiz.extend({

    forms: {
      signUpForm: {
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
            selector: '#email_address',
            type: 'text'
          },

          passwordTextField: {
            selector: '#password',
            type: 'text'
          }
        }
      }
    },

    completeSignUpForm: function(firstName, lastName, email, password) {
      return this.enterInformation('signUpForm', {
        firstNameTextField: firstName,
        lastNameTextField: lastName,
        emailAddressTextField: email,
        passwordTextField: password
      });
    },

    submitSignUpForm: function() {
      return this.submitForm('signUpForm');
    },

    /** 
      Create an account with this format 'glassful.test.sign-up' & <date> & '@yopmail.com' and password as password.
      @returns the string of email account 
    **/
    createNewAccount: function(email) {
      this.completeSignUpForm('glassful', 'test', email, 'password');
      this.submitSignUpForm();
      return this;
    }

  }).with(theQuiz, Forms);

module.exports = SignUp;