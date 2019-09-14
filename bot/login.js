const ig = require('./instagram');

const login = async (username, password) => {
	await ig.page.goto(`${ig.BASE_URL}/accounts/login/`, { waitUntil: 'networkidle2' });

	await ig.page.waitForSelector('input[name="username"');
	await ig.page.type('input[name="username"]', username, { delay: 25 });

	await ig.page.waitForSelector('input[name="password"]');
	await ig.page.type('input[name="password"]', password, { delay: 25 });

	let loginButton = await ig.page.$x('//button/div[contains(text(), "Log In")]'); // get button which have inside div contains text

	await loginButton[0].click();

	console.log('User logged in.');
};

module.exports = login;
