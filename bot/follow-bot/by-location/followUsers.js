const fs = require('fs');

const config = require('../../config');
const ig = require('../../instagram');

const openInstagram = require('../../helpers/openInstagram');
const goToLocation = require('../../helpers/goToLocation');
const updateLikeData = require('../../helpers/updateLikeData');

const updateFollowedUsersList = require('../../helpers/updateFollowedUsersList');
const headingLog = require('../../helpers/headingLog');

const goFollow = async (locations) => {
	for (const [ locationName, locationCode ] of locations) {
		await goToLocation(locationName, locationCode, config.followBot.waitAfterChangeLocation);

		// by this newestPhotosLinks bot will go to profiles, each photo = profile
		const newestPhotosLinks = await ig.page.$$eval('article div div div div a', (as) => as.map((a) => a.href));
		const newestPhotosLinksCleared = await [ ...newestPhotosLinks.slice(9, 9 + config.followBot.howMuchFollowsOnLocation) ]; // select profiles (9 cuz 10 first photos are Most liked photos, not newest)

		for (photo of newestPhotosLinksCleared) {
			await ig.page.goto(photo);
			await ig.page.waitFor(1000);

			await ig.page.click('div div h2 a'); // go to profile

			await ig.page.waitFor(3000); // wait after go to profile (time to load profile)

			const allProfilePhotos = await ig.page.$$('article > div > div > div > div > a'); // get all photos of profile
			const profilePhotos = await [ ...allProfilePhotos.slice(0, config.followBot.howMuchProfilePhotoLikes) ]; // select profiles (9 cuz 10 first photos are Most liked photos, not newest)

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

			const userNameElement = await ig.page.$('._7UhW9'); // element which contains user profile name
			const userName = await ig.page.evaluate((userNameElement) => userNameElement.innerText, userNameElement); // get text from element (username)

			await ig.page.waitFor(500);
			const followButton = await ig.page.$x("//button[contains(text(), 'Follow')]");
			await followButton[0].click();

			await updateFollowedUsersList(userName); // update followed user list

			console.log(`User -> ${userName} followed.`);
			console.log('');

			await ig.page.waitFor(2000);
		}
	}
};

let counter = 0; // counter for followUsers function which doesn't let open browser more than one time
const followUsers = async (followByLocationConfig) => {
	//if fullBotMode is true and followBot is true it will runs, but if fullBotMode is false this will be running only for basic followBot (not entire day)
	if ((config.isOn.fullBotMode === true && config.fullBotMode.functionalities.followBot === true) || config.isOn.followBot === true) {
		headingLog('Start followers bot');

		//if bot is running at full mode (working whole day) just open once browser window
		if (config.isOn.fullBotMode === true && counter === 0) {
			await openInstagram();
		}

		const locations = JSON.parse(fs.readFileSync('bot/bot-data/locations.json')); // Load all polish city locations code
		const locationsEntries = Object.entries(locations); // rewrite object to array which contains pair arrays [[name, value], [[name], [value]]]

		if (followByLocationConfig.locations.length === 0) {
			console.log('Bot will be going to every city from default array of cities.');
			console.log('');
			await goFollow(locationsEntries);
		} else {
			console.log('Bot will be going to every city from declares locations.');
			console.log('');

			const declaredLocations = []; // here will be storing locations which was set in config file

			for (const [ locationName, locationCode ] of locationsEntries) {
				if (config.followBot.locations.includes(locationName)) {
					declaredLocations.push([ locationName, locationCode ]); // set locations from config file
				}
			}

			await goFollow(declaredLocations);
		}
	}
	counter++;
	// console.log('Counter: ', counter);
};

module.exports = followUsers;
