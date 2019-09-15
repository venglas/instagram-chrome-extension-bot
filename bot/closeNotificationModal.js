const ig = require('./instagram');
const consoleLineBreak = require('./helpers/consoleLineBreak');

const closeNotificationModal = async () => {
	console.time('Notifications modal closed.');
	const notificationModal = await ig.page.$x('//h2[contains(text(), "Turn on Notifications")]');

	if (notificationModal) {
		await ig.page.waitForXPath('//button[contains(text(), "Not Now")]');
		const closeModalButton = await ig.page.$x('//button[contains(text(), "Not Now")]');
		await closeModalButton[0].click();
	}

	console.timeEnd('Notifications modal closed.');
	consoleLineBreak('=');
};

module.exports = closeNotificationModal;
