// Imports
var bescribe = require('be-paige/bescribe'),
    LoginHelper = require('../../customer/account/login/loginHelper.js'),
    CustomerAccountPage = require('../../../lib/customer/customer.js'),
    common = require('../../common/common.js'),
    data = require('../../common/data.js');

// Global variables
var customerAccountContext;
var account;

bescribe("Edit account address", common.config, function(context, describe, it) {

    beforeEach(function() {
        // create a new account (one time and only one time)
//        if (!account) {
//            account = data.createNewAccount();
//            // TODO do it the right way because it's a huge hack !!!
//            // I should use .done() but the session is pending and it doesn't go to the if and so the quit()
//            SignUpHelper.signUp(context.Page.build(), account)._session.quit();
//        }
        // login the user with new account
        customerAccountContext = LoginHelper.login(context.Page.build(), data.account).redirectTo(CustomerAccountPage);
    });

    describe("Success", function() {
        it("Should edit all fields without any errors", function() {
            customerAccountContext
                .clickEditBillingAddressButton()
                .completeBillingAddress('new firstName', 'new lastName', '9999999999', 'new street', 'new city', '19809')
                .submitBillingAddressForm()
                .verifyAddressHasBeenChanged();
        });
    });

});