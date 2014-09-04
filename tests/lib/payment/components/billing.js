var messages = require('../../common/messages.js'),
    Billing = {

        forms: {
            billingForm: {
                context: '#co-billing-form',
                submit: '#co-billing-form button',
                inputs: {
                    addressTypeTrigger: {
                        selector: '.field.address-type a',
                        type: 'trigger'
                    },
                    addressTypeCombo: {
                        selector: '.pix-selectable.active li:last-child',
                        type: 'custom combo'
                    },
                    streetTextField: '#billing\\:street1',
                    cityTextField: '#billing\\:city',
                    zipCodeTextField: '#billing\\:postcode',
                    telephoneTextField: '#billing\\:telephone',
                }
            }
        },

        selectors: {
            addressTitle: '.step-title.box-subtitle h3'
        },

        fillInTrigger: function($form, selector, data) {
            $form.find(selector).click();
            return this;
        },

        fillInCustomCombo: function($form, selector, data) {
            $form.find(selector).click();
            return this;
        },

        completeBillingForm: function(street, city, zipcode, telephone) {
            this.find(this.selectors.addressTitle).getText().then(function(innerText) {
                if (innerText === messages.payment.billing.billing_address) {
                    this.enterInformation('billingForm', {
                        addressTypeTrigger: true,
                        addressTypeCombo: true,
                        streetTextField: street,
                        cityTextField: city,
                        zipCodeTextField: zipcode,
                        telephoneTextField: telephone
                    });
                }
            }.bind(this));
            return this;
        },

        submitBillingForm: function() {
            return this.submitForm('billingForm');
        }
    };

module.exports = Billing;