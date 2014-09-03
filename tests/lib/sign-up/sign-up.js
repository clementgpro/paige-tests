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

    _completeSignUpForm: function(firstName, lastName, email, password) {
      return this.enterInformation('signUpForm', {
        firstNameTextField: firstName,
        lastNameTextField: lastName,
        emailAddressTextField: email,
        passwordTextField: password
      });
    },

    _submitSignUpForm: function() {
      return this.submitForm('signUpForm');
    },

    createNewAccount: function(account) {
      this._completeSignUpForm('glassful', 'test', account.email, account.password);
      this._submitSignUpForm();
      return this;
    }

  }).with(theQuiz, Forms);

module.exports = SignUp;