const puppeteer = require('puppeteer');

const instagram = {
	browser: null,
	page: null,
	BASE_URL: 'https://instagram.com',

	init: async () => {
		instagram.browser = await puppeteer.launch({
			headless: false
		});

		instagram.page = await instagram.browser.newPage(); // Create new tab in chromium
	}
};

module.exports = instagram;
