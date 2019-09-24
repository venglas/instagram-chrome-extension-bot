const ig = require('../instagram');

const goToLocation = async (locationName, locationCode, waitAfterChangeLocation) => {
	console.log(`go to loaction: ${locationName} / ${locationCode}`);

	await ig.page.goto(`${ig.LOCATIONS_URL}/${locationCode}`, { waitUntil: 'networkidle2' }); // change location
	await ig.page.waitFor(waitAfterChangeLocation); // wait after change location
};

module.exports = goToLocation;
