const ig = require('./instagram');
const consoleLineBreak = require('./helpers/consoleLineBreak');

const login = async (username, password) => {
	console.time('User logged in.');
	await ig.page.goto(`${ig.BASE_URL}/accounts/login/`, { waitUntil: 'networkidle2' });

	await ig.page.waitForSelector('input[name="username"');
	await ig.page.type('input[name="username"]', username, { delay: 25 }); // delay is 25ms after every keyboard click

	await ig.page.waitForSelector('input[name="password"]');
	await ig.page.type('input[name="password"]', password, { delay: 25 });

	let loginButton = await ig.page.$x('//button/div[contains(text(), "Log In")]'); // get button which have inside div contains text

	await loginButton[0].click();

	console.timeEnd('User logged in.');
	consoleLineBreak('=');
};

module.exports = login;
