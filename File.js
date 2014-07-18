var Page = require('be-paige').Page,

Forms = require('be-paige').components.forms,

Home = Page.extend({
  pageRoot: '/customer/account/login/',

  selectors: {
    form: '.main #login-form',
    email: '.main #email',
    password: '.main #pass',
    button: '.main #send2'
  },

  clickButton: function() {
    // Wait until the button is displayed
    this.whenDisplayed(this.selectors.button).then(function() {
      // click on the button
      this.find(this.selectors.button).click();
    }.bind(this));

    return this;
  },

  // This can be accomplished using our Form component, but is included for illustration purposes.
  enterEmail: function(text) {
    // Wait until the form is displayed
    this.whenDisplayed(this.selectors.form).then(function () {
      // Enter the text in the text box
      this.find(this.selectors.email).sendKeys(text);
      this.find(this.selectors.password).sendKeys(text);
      this.clickButton();
    }.bind(this));

    return this;
  }
});

module.exports = Home;