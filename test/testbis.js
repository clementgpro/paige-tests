var bescribe = require('be-paige/bescribe');
var Page = require('../Page.js');
var moment = require('moment');

var config = {
  address: 'https://www.glassful.com',
  webdriver: {
    address: 'http://localhost:4444/wd/hub',
    config: {
      platform: 'MAC',
      browserName: 'chrome'
    }
  }
};

console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
bescribe("Batch tasks", config, function(context, describe, it) {
  describe("Verify", function() {
    it("Welcome box price is equal to $35", function() {
      context.Page.build()
        .redirectTo(Page)
        .completeLoginForm()
        .submitLoginForm()
        .verifyPrice();
    });

    // More it() functions can go here
  });

  // More describe() functions can go here
});