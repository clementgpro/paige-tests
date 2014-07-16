var MyTestPage = require('./File.js');

bescribe("Some description", function(context, describe, it) {
  describe("My Test Page", function() {
    it("has elements on it's page", function() {
      context.Page.build()
      .redirectTo(MyTestPage)
      .clickOnUserButton()
      .checkThatProfileIsShown();
    });

    // More it() functions can go here
  });

  // More describe() functions can go here
});	