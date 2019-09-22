const fs = require('fs');
const ig = require('../../instagram');
const config = require('../../config');

const getPhotos = require('../getPhotos');
const likePhotos = require('../likePhotos');

const goToNewLocation = async (locationName, locationCode) => {
	console.log(`${locationName} ${locationCode}`);

	await ig.page.goto(`${ig.LOCATIONS_URL}/${locationCode}`, { waitUntil: 'networkidle2' }); // change location
	await ig.page.waitFor(config.likeByLocation.waitAfterChangeLocation); // wait after change location
};

const likeBotByLocation = async (likeByLocationConfig) => {
	const locations = fs.readFileSync('bot/bot-data/locations.json'); // Load all polish city locations code
	const pasredLocations = JSON.parse(locations);

	const entries = Object.entries(pasredLocations); // rewrite object to array which contains pair arrays [[name, value], [[name], [value]]]

	// If in config file user not insert any locations, default action is get all locations from locations.json file
	if (likeByLocationConfig.locations.length === 0) {
		for (const [ locationName, locationCode ] of entries) {
			await goToNewLocation(locationName, locationCode);

			const newestPhotos = await getPhotos(); // list of photos (array)

			await likePhotos(newestPhotos); // like list of photos
		}
	} else {
		// if user put his cities to array just search it in our default cities object
		for (const [ locationName, locationCode ] of entries) {
			if (likeByLocationConfig.locations.includes(locationName)) {
				await goToNewLocation(locationName, locationCode);

				const newestPhotos = await getPhotos(); // list of photos (array)

				await likePhotos(newestPhotos); // like list of photos

				//  go to next location and do same thing till locations list end
				// after fill all locations photos go to liking via array of photo links
			}
		}
	}
};

module.exports = likeBotByLocation;
