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

	setLanguage: async () => {
		await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

		await instagram.page.waitForSelector('select');
		await instagram.page.click('select');
		await instagram.page.select('select', 'en');

		console.log('Changing language done.');
	},

	// TODO: set language to english

	login: async (username, password) => {
		await instagram.page.goto(`${BASE_URL}/accounts/login/`, { waitUntil: 'networkidle2' });

		await instagram.page.waitForSelector('input[name="username"');
		await instagram.page.type('input[name="username"]', username, { delay: 25 });

		await instagram.page.waitForSelector('input[name="password"]');
		await instagram.page.type('input[name="password"]', password, { delay: 25 });

		let loginButton = await instagram.page.$x('//button/div[contains(text(), "Log In")]'); // get button which have inside div contains text

		await loginButton[0].click();

		console.log('User logged in.');
	},

	closeNotificationModal: async () => {
		const notificationModal = await instagram.page.$x('//h2[contains(text(), "Turn on Notifications")]');

		if (notificationModal) {
			await instagram.page.waitForXPath('//button[contains(text(), "Not Now")]');
			const closeModalButton = await instagram.page.$x('//button[contains(text(), "Not Now")]');
			await closeModalButton[0].click();

			console.log('Notifications modal closed.');
		}
	}
};

module.exports = instagram;
