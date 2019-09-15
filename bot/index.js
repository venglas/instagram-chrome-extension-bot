const ig = require('./instagram');
const config = require('./config');

const setLanguage = require('./setLanguage');
const login = require('./login');
const closeNotificationModal = require('./closeNotificationModal');
const updateProfileInfo = require('./updateProfileInfo');

(async () => {
	await ig.init(); // initialize chromium browser and page

	await setLanguage(); // set english language at first

	await login(config.username, config.password); // log in to instagram using config data from config file

	await closeNotificationModal(); // close notification modal which is always showing after login

	await updateProfileInfo(); // update count number of posts, followers, following ppl
})();
