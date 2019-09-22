const ig = require('./instagram');
const config = require('./config');

const setLanguage = require('./setLanguage');
const login = require('./login');
const closeNotificationModal = require('./closeNotificationModal');
const updateProfileInfo = require('./updateProfileInfo');

const likeByLocations = require('./like-bot/by-location/likeBotByLocation');

const showStats = require('./showStats');

(async () => {
	await ig.init(); // initialize chromium browser and page

	await setLanguage(); // set english language at first
	await login(config.username, config.password); // log in to instagram using config data from config file
	await closeNotificationModal(); // close notification modal which is always showing after login

	if (config.updateProfileInfo === true) await updateProfileInfo(); // update count number of posts, followers, following ppl

	await likeByLocations(config.likeByLocation); //liking newest photos from choiced locations

	await showStats(); // show all collected stats
})();
