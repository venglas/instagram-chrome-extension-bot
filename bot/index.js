const ig = require('./instagram');
const config = require('./config');

(async () => {
	await ig.init();

	await ig.setLanguage();

	await ig.login(config.username, config.password);

	await ig.closeNotificationModal();
})();
