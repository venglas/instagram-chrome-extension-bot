const ig = require('./instagram');

const setLanguage = async () => {
	await ig.page.goto(ig.BASE_URL, { waitUntil: 'networkidle2' });

	await ig.page.waitForSelector('select');
	await ig.page.click('select');
	await ig.page.select('select', 'en');

	console.log('Changing language done.');
};

module.exports = setLanguage;
