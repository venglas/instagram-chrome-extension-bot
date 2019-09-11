const puppeteer = require('puppeteer');

const instagram = {
	browser: null,
	page: null,

	init: async () => {
		instagram.browser = await puppeteer.launch({
			headless: false
		});

		instagram.page = await instagram.browser.newPage();

		await instagram.page.goto('https://instagram.com/', { waitUntil: 'networkidle2' });
	}
};

module.exports = instagram;
