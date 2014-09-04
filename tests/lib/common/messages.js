module.exports = {
    customer: {
        confirmation_month_skipped: 'You have successfully skipped',
        subscription_canceled: 'Subscription canceled'
    },
    payment: {
        billing: {
            billing_address: 'Billing Address'
        },
        card: {
            new_credit_card: 'New Credit Card'
        },
        coupon:{
            error: function(code) { return 'Coupon code "' + code + '" is not valid.'; },
            success: function(code) { return 'Coupon code "' + code + '" was applied.'; }
        }
    }
};