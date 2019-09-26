const ig = require('../instagram');
const consoleLineBreak = require('../helpers/consoleLineBreak');

const goToLocation = async (locationName, locationCode, waitAfterChangeLocation) => {
	consoleLineBreak('=');
	console.log(`go to loaction: ${locationName} / ${locationCode}`);
	console.log('');

	await ig.page.goto(`${ig.LOCATIONS_URL}/${locationCode}`, { waitUntil: 'networkidle2' }); // change location
	await ig.page.waitFor(waitAfterChangeLocation); // wait after change location
};

module.exports = goToLocation;
