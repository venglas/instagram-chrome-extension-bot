const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com';

const instagram = {
	browser: null,
	page: null,

	init: async () => {
		instagram.browser = await puppeteer.launch({
			headless: false
		});

		instagram.page = await instagram.browser.newPage();
	},

	// TODO: set language to english

	login: async (username, password) => {
		await instagram.page.goto(`${BASE_URL}/accounts/login/`, { waitUntil: 'networkidle2' });

		await instagram.page.waitForSelector('input[name="username"');
		await instagram.page.type('input[name="username"]', username, { delay: 25 });

		await instagram.page.waitForSelector('input[name="password"]');
		await instagram.page.type('input[name="password"]', password, { delay: 25 });

		let loginButton = await instagram.page.$x('//button/div[contains(text(), "Zaloguj się")]'); // get button which have inside div contains text

		await loginButton[0].click();
	}
};

module.exports = instagram;
