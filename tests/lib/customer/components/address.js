var expect = require('chai').expect
    Address = {
    forms:{
        addressForm: {
            context: '#form-validate',
            submit: '#form-validate [type=submit]',
            inputs:{
                firstNameTextField: '#firstname',
                lastNameTextField: '#lastname',
                telephoneTextField: '#telephone',
                streetTextField: '#street_1',
                cityTextField: '#city',
                zipCodeTextField: '#zip'
            }
        }
    },

    clickEditBillingAddressButton: function(){
        this.findAll('.btn-white.ajax-button.icon-edit').then(function(elements){
            elements[0].click();
        });
        return this;
    },

    completeBillingAddress: function(firstName, lastName, telephone, street, city, zipCode){
        this.whenDisplayed('#form-validate').then(function(){
            this.enterInformation('addressForm', {
                firstNameTextField: firstName,
                lastNameTextField: lastName,
                telephoneTextField: telephone,
                streetTextField: street,
                cityTextField: city,
                zipCodeTextField: zipCode
            });
        }.bind(this));
        return this;
    },

    submitBillingAddressForm: function(){
        return this.submitForm('addressForm');
    },

    verifyAddressHasBeenChanged: function(){
        this.whenDisplayed('.notification-bar.success').then(function(isDisplayed){
            expect(isDisplayed).to.be.true;
        });
    }
};
module.exports = Address;