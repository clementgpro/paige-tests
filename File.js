var Page = require('be-paige').Page,

Index = Page.extend({
  pageRoot: '/customer/account/login/',

  selectors: {
    email: '#email'
  },

  enterEmail: function(text) {
    this.whenDisplayed(this.selectors.email).then(function (){
        console.log('test');
    }).bind(this);
    
    return this;
  }
});

module.exports = Index;