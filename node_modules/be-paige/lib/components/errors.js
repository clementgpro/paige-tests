var expect = require('chai').expect,

Errors = {
  // when the conditionalSelector appears, do the check on all
  // other selectors in visibilityMap = { selector: bool, ...}
  // bool => indicates whether the element is actually visible
  errorsVisible: function(visibilityMap) {
    Object.keys( visibilityMap ).forEach(function(selector) {
      this.exists(this.selectors[selector]).then(function(exists) {
        if ( !exists ) {
          expect( visibilityMap[selector] ).to.be.false;
          return;
        }
        this.find(this.selectors[selector])
        .isDisplayed()
        .then(function(displayed) {
          expect( displayed ).to.equal( visibilityMap[selector] );
        }.bind(this));
      }.bind(this));
    }.bind(this));

    return this;
  }
};

module.exports = Errors;
