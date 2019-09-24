const ig = require('../instagram');
const config = require('../config');

const setLanguage = require('../setLanguage');
const login = require('../login');
const closeNotificationModal = require('../closeNotificationModal');

const updateProfileInfo = require('../updateProfileInfo');

const likeByLocations = require('./by-location/likeBotByLocation');

const showStats = require('../showStats');

const initLikeByLocationProcess = async () => {
	console.log('Bot will be running until you stop it.');
	console.log('');

	await ig.init(); // initialize chromium browser and page

	await setLanguage(); // set english language at first

	await login(config.username, config.password); // log in to instagram using config data from config file
	await closeNotificationModal(); // close notification modal which is always showing after login

	if (config.updateProfileInfo === true) await updateProfileInfo(); // update count number of posts, followers, following ppl

	await likeByLocations(config.likeByLocation); //liking newest photos from choiced locations

	await showStats(); // show all collected stats

	await ig.page.waitFor(2000); //wait 2 second before close browser

	await ig.browser.close(); //close the chromum engine
};

const likeBotWholeDayMode = async () => {
	//liking bot will be playing with not end, we must stopped it by myself
	if (config.likeByLocation.wholeDayMode.isStart === true) {
		await initLikeByLocationProcess();

		const breakAfterDone = config.likeByLocation.wholeDayMode.breakAfterDone; // this value is pass in minutes

		const breakAfterDoneMinutes = breakAfterDone * 60 * 1000; // value in minutes converted to miliseconds

		await ig.page.waitFor(breakAfterDoneMinutes);

		initLikeByLocationProcess();
	} else {
		await initLikeByLocationProcess();
	}
};

module.exports = likeBotWholeDayMode;
