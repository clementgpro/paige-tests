// Imports
var bescribe = require('be-paige/bescribe'),
  SignUpHelper = require('../sign-up/sign-upHelper.js'),
  MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js'),
  common = require('../common/common.js'),
  data = require('../common/data.js');

// Global variables
var monthlyBoxNewUserContext;

bescribe("", common.config, function(context, describe, it) {

  beforeEach(function() {
    customerAccountEditContext = SignUpHelper.signUp(page, data.newAccount).redirectTo(monthlyBoxNewUserContext);
  });

  describe("Edit first name", function() {
    // payment helper part needs to be finish before do this
  });

});