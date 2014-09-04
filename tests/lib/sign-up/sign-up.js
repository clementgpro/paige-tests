var theQuiz = require('../the-quiz/the-quiz.js'),
  Forms = require('be-paige').components.form,
  SignUp = theQuiz.extend({

    forms: {
      signUpForm: {
        context: '#form-validate',
        submit: '#form-validate [type=submit]',
        inputs: {
          firstNameTextField: '#firstname',
          lastNameTextField: '#lastname',
          emailAddressTextField: '#email_address',
          passwordTextField: '#password'
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