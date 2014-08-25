module.exports = {
	config: {
		address: 'http://happy.pixafy.com/glassful/current/index.php',
		webdriver: {
			address: 'http://localhost:4444/wd/hub',
			config: {
				platform: 'MAC',
				browserName: 'firefox'
			}
		}
	}
};