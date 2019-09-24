const ig = require('./instagram');
const consoleLineBreak = require('./helpers/consoleLineBreak');
const consoleColor = require('./helpers/colorsLog');

const setLanguage = async () => {
	console.time('Changing language done.');
	await ig.page.goto(ig.BASE_URL, { waitUntil: 'networkidle2' });

	await ig.page.waitForSelector('select');
	await ig.page.click('select'); // always before set select value, the select must be clicked
	await ig.page.select('select', 'en'); // set in slect language to English
	console.timeEnd('Changing language done.');
	consoleLineBreak('=');
};

module.exports = setLanguage;
