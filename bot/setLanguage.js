const ig = require('./instagram');

const setLanguage = async () => {
	await ig.page.goto(ig.BASE_URL, { waitUntil: 'networkidle2' });

	await ig.page.waitForSelector('select');
	await ig.page.click('select'); // always before set select value, the select must be clicked
	await ig.page.select('select', 'en'); // set in slect language to English

	console.log('Changing language done.');
};

module.exports = setLanguage;
