const fs = require('fs');

const config = require('../config');
const ig = require('../instagram');
const setLanguage = require('../setLanguage');
const login = require('../login');
const closeNotificationModal = require('../closeNotificationModal');
const updateProfileInfo = require('../updateProfileInfo');
const getPhotos = require('../like-bot/getPhotos');
const goToLocation = require('../helpers/goToLocation');
const updateLikeData = require('../helpers/updateLikeData');
const updateFollowedUsersList = require('../helpers/updateFollowedUsersList');

const followUsers = async (followByLocationConfig) => {
	if (config.followBot.isStart === true) {
		await ig.init(); // open browser
		await setLanguage(); // set language to en
		await login(config.username, config.password); //login to instagram
		await closeNotificationModal(); // close modal which notification info
		if (config.updateProfileInfo === true) await updateProfileInfo(); // update count number of posts, followers, following ppl

		const locations = JSON.parse(fs.readFileSync('bot/bot-data/locations.json')); // Load all polish city locations code
		const entries = Object.entries(locations); // rewrite object to array which contains pair arrays [[name, value], [[name], [value]]]

		if (followByLocationConfig.locations.length === 0) {
			console.log('Bot will be going to every city from default array of cities.');
			console.log('');
		} else {
			console.log('Bot will be going to every city from declares locations.');
			console.log('');

			for (const [ locationName, locationCode ] of entries) {
				await goToLocation(locationName, locationCode, config.waitAfterChangeLocation);

				// by this newestPhotosLinks bot will go to profiles, each photo = profile
				const newestPhotosLinks = await ig.page.$$eval('article div div div div a', (as) => as.map((a) => a.href));
				const newestPhotosLinksCleared = await [ ...newestPhotosLinks.slice(9, 9 + config.followBot.howMuchFollowsOnLocation - 1) ]; // select profiles (9 cuz 10 first photos are Most liked photos, not newest)

				for (photo of newestPhotosLinksCleared) {
					// go to profile
					//like specyfic count of profile photos
					await ig.page.goto(photo);
					await ig.page.waitFor(1000);

					await ig.page.click('div div h2 a'); // go to profile

					await ig.page.waitFor(3000); // wait after go to profile (time to load profile)

					const allProfilePhotos = await ig.page.$$('article > div > div > div > div > a'); // get all photos of profile
					const profilePhotos = await [ ...allProfilePhotos.slice(0, config.followBot.howMuchProfilePhotoLikes - 1) ]; // select profiles (9 cuz 10 first photos are Most liked photos, not newest)

					for (photo of profilePhotos) {
						await photo.click();

						await ig.page.waitFor(800); // wait for photo modal

						if ((await ig.page.$('section span button span[aria-label="Like"]')) !== null) {
							await ig.page.click('section span button span[aria-label="Like"]'); // like photo

							updateLikeData();

							await ig.page.waitFor(500); // small stop after like photo

							await ig.page.click('.ckWGn'); // close photo modal

							const waitTime = Math.floor(Math.random() * (config.waitAfterLike.max - config.waitAfterLike.min + 1)) + config.waitAfterLike.min; // randomly generated time stop after photo like

							await ig.page.waitFor(waitTime);
						} else if ((await ig.page.$x('//section/span/button/span[contains(@aria-label, "Unlike")]')) !== null) {
							await ig.page.waitFor(1000);
							await ig.page.click('.ckWGn'); // close photo modal
						}
					}

					const userNameElement = await ig.page.$('._7UhW9');
					const userName = await ig.page.evaluate((userNameElement) => userNameElement.innerText, userNameElement);

					await ig.page.waitFor(1000);
					await ig.page.click('._5f5mN'); // follow currently user

					await updateFollowedUsersList(userName); // update followed user list

					await ig.page.waitFor(2000);
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
