// Imports
var bescribe = require('be-paige/bescribe'),
    expect = require('chai').expect,
    LoginHelper = require('../customer/account/login/loginHelper.js'),
    SignUpHelper = require('../sign-up/sign-upHelper.js'),
    PaymentHelper = require('../payment/paymentHelper.js'),
    MonthlyBoxPage = require('../../lib/monthly-box/monthly-box.js'),
    CustomerPage = require('../../lib/customer/customer.js'),
    common = require('../common/common.js'),
    data = require('../common/data.js');

// Global variables
var page;
var account;

bescribe("", common.config, function(context, describe, it) {

    beforeEach(function() {
        if (!account) {
            account = data.createNewAccount();
            page = SignUpHelper.signUp(context.Page.build(), account).redirectTo(MonthlyBoxPage).clickSuscribeButton();
            page = PaymentHelper.pay(page);
        } else {
            page = LoginHelper.login(context.Page.build(), account);
        }
    });

    describe("Subscription", function() {
        it("Should subscribe a new user", function() {
            page.redirectTo(MonthlyBoxPage).verifySubscriber();
        });

        it("Should skip the month", function() {
            page.redirectTo(CustomerPage)
                .clickSkipTheMonth()
                .submitSkipTheMonthForm()
                .verifyMonthHasBeenSkipped();
        });

        it("Should resume the month", function() {
            page.redirectTo(CustomerPage)
                .clickResumeTheMonth()
                .verifyMonthHasBeenResumed();
        });

        it("Should cancel the Subscription", function() {
            page.redirectTo(CustomerPage)
                .clickCancelSubscription()
                .submitCancelSubscriptionForm()
                .verifySubscriptionHasBeenCancelled();
        });
    });

});