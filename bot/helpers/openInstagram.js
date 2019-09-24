const ig = require('../instagram');
const setLanguage = require('../setLanguage');
const login = require('../login');
const config = require('../config');
const closeNotificationModal = require('../closeNotificationModal');
const updateProfileInfo = require('../updateProfileInfo');
const checkData = require('../bot-data/checkData');

const openInstagram = async () => {
	await checkData();
	await ig.init(); // open browser
	await setLanguage(); // set language to en
	await login(config.username, config.password); //login to instagram
	await closeNotificationModal(); // close modal which notification info
	if (config.updateProfileInfo === true) await updateProfileInfo(); // update count number of posts, followers, following ppl
};

module.exports = openInstagram;
