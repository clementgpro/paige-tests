var Page = require('be-paige').Page,

Forms = require('be-paige').components.forms,

Home = Page.extend({
  pageRoot: '/customer/account/login/',

  selectors: {
    form: '#login-form',
    email: '#login-form #email',
  },

  // This can be accomplished using our Form component, but is included for illustration purposes.
  enterEmail: function(text) {
    // Wait until the form is displayed
    this.whenDisplayed(this.selectors.form).then(function () {
      // Enter the text in the text box
      this.find(this.selectors.email).sendKeys(text);
    }.bind(this));

    return this;
  }
});

module.exports = Home;