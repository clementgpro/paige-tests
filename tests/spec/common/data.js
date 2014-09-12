module.exports = {
	account: {
		email: 'glassful.test@yopmail.com',
		password: 'password'
	},
	createNewAccount: function() {
		return {
			email: 'glassful.test.sign-up' + new Date().getTime() + '@yopmail.com',
			password: 'password'
		};
	},
    coupon:{
        invalid:'wrongcode',
        valid: 'BEPAIGETEST'
    }
};