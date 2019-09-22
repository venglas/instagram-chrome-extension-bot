const fs = require('fs');
const ig = require('../../instagram');

const getPhotos = require('../getPhotos');

const likeBotByLocation = async (likeByLocationConfig) => {
	const locations = fs.readFileSync('./bot-data/locations.json'); // Load all polish city locations code
	const pasredLocations = JSON.parse(locations);

	const entries = Object.entries(pasredLocations); // rewrite object to array which contains pair arrays [[name, value], [[name], [value]]]

	// If in config file user not insert any locations, default action is get all locations from locations.json file
	if (likeByLocationConfig.locations.length === 0) {
		for (const [ locationName, locationCode ] of entries) {
			console.log(`${locationName} ${locationCode}`);
		}
	} else {
		// if user put his cities to array just search it in our default cities object
		for (const [ locationName, locationCode ] of entries) {
			if (likeByLocationConfig.locations.includes(locationName)) {
				console.log(`You selected: ${locationName}/${locationCode} `);

				await ig.page.goto(`${ig.LOCATIONS_URL}/${locationCode}`, { waitUntil: 'networkidle2' });
				await ig.page.waitFor(3000);
				// TODO:
				await getPhotos();

				// select first 10-20-30 first fresh photos of location and add it all to array
				//  go to next location and do same thing till locations list end
				// after fill all locations photos go to liking via array of photo links
				// array with photo links can be store in other json file or in varaible in this file
			}
		}
	}
};

module.exports = likeBotByLocation;
