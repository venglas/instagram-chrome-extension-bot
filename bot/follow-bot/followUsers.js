// go to the location an get first 10 ppl who add new photo
// like all these 10 photos
// go to each profile
// follow user
// add user profile link to profile
const fs = require('fs');

const config = require('../config');
const ig = require('../instagram');
const setLanguage = require('../setLanguage');
const login = require('../login');
const closeNotificationModal = require('../closeNotificationModal');
const updateProfileInfo = require('../updateProfileInfo');
const getPhotos = require('../like-bot/getPhotos');
const goToLocation = require('../helpers/goToLocation');

const updateLikeData = () => {
	// change this way for updating cuz it's  really bad practice to write file on every action
	const profileInfo = JSON.parse(fs.readFileSync('bot/bot-data/profileInfo.json'));

	profileInfo.allLikes = profileInfo.allLikes + 1;
	profileInfo.lastLikes = profileInfo.lastLikes + 1;

	const changedData = JSON.stringify(profileInfo);
	fs.writeFileSync('bot/bot-data/profileInfo.json', changedData); //rewrite profile info .json file
};

const followUsers = async (followByLocationConfig) => {
	if (config.followBot.isStart === true) {
		await ig.init(); // open browser
		await setLanguage(); // set language to en
		await login(config.username, config.password); //login to instagram
		await closeNotificationModal(); // close modal which notification info
		if (config.updateProfileInfo === true) await updateProfileInfo(); // update count number of posts, followers, following ppl

		const locations = fs.readFileSync('bot/bot-data/locations.json'); // Load all polish city locations code
		const pasredLocations = JSON.parse(locations);

		const entries = Object.entries(pasredLocations); // rewrite object to array which contains pair arrays [[name, value], [[name], [value]]]

		if (followByLocationConfig.locations.length === 0) {
			console.log('Bot will be going to every city from default array of cities.');
			console.log('');

			for (const [ locationName, locationCode ] of entries) {
				await goToLocation(locationName, locationCode, config.waitAfterChangeLocation);

				const newestPhotos = await getPhotos(); // list of photos (array)

				// go to profile like last 5 photos and follow user
				for (photo of newestPhotos) {
					await photo.click();
					await ig.page.waitFor(1000);

					await ig.page.click('div div h2 a'); // go to profile

					await ig.page.waitFor(2000);
				}
			}
		} else {
			console.log('Bot will be going to every city from default array of cities.');
			console.log('');

			for (const [ locationName, locationCode ] of entries) {
				await goToLocation(locationName, locationCode, config.waitAfterChangeLocation);

				const newestPhotosLinks = await ig.page.$$eval('article div div div div a', (as) => as.map((a) => a.href));
				const newestPhotosLinksCleared = await [ ...newestPhotosLinks.slice(9, 20) ];

				// go to profile like last 5 photos and follow user
				for (photo of newestPhotosLinksCleared) {
					await ig.page.goto(photo);
					await ig.page.waitFor(1000);

					await ig.page.click('div div h2 a'); // go to profile

					await ig.page.waitFor(3000);

					// get at least 5 photos of profile
					const profilePhotos = await ig.page.$$('article > div > div > div > div > a'); // get all photos of profile

					for (photo of profilePhotos) {
						await photo.click();

						await ig.page.waitFor(500);

						if ((await ig.page.$('section span button span[aria-label="Like"]')) !== null) {
							await ig.page.click('section span button span[aria-label="Like"]'); // like photo

							updateLikeData();

							await ig.page.waitFor(2000);

							await ig.page.click('.ckWGn'); // close photo modal

							const waitTime = Math.floor(Math.random() * (config.waitAfterLike.max - config.waitAfterLike.min + 1)) + config.waitAfterLike.min;
							await ig.page.waitFor(waitTime);
						} else if ((await ig.page.$x('//section/span/button/span[contains(@aria-label, "Unlike")]')) !== null) {
							await ig.page.waitFor(2000);
							await ig.page.click('.ckWGn'); // close photo modal
						}
					}
				}
			}
		}
	} else {
		// if user put his cities to array just search it in our default cities object
		for (const [ locationName, locationCode ] of entries) {
			if (followByLocationConfig.locations.includes(locationName)) {
				await goToLocation(locationName, locationCode, config.waitAfterChangeLocation);

				const newestPhotos = await getPhotos(); // list of photos (array)

				await likePhotos(newestPhotos); // like list of photos

				//  go to next location and do same thing till locations list end
				// after fill all locations photos go to liking via array of photo links
			}
		}
	}
};

module.exports = followUsers;
