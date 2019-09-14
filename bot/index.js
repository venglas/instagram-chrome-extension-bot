const ig = require('./instagram');
const config = require('./config');

const setLanguage = require('./setLanguage');
const login = require('./login');
const closeNotificationModal = require('./closeNotificationModal');

(async () => {
	await ig.init();

	await setLanguage();

	await login(config.username, config.password);

	await closeNotificationModal();
})();
