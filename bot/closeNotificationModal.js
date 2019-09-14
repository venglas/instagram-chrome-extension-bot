const ig = require('./instagram');

const closeNotificationModal = async () => {
	const notificationModal = await ig.page.$x('//h2[contains(text(), "Turn on Notifications")]');

	if (notificationModal) {
		await ig.page.waitForXPath('//button[contains(text(), "Not Now")]');
		const closeModalButton = await ig.page.$x('//button[contains(text(), "Not Now")]');
		await closeModalButton[0].click();

		console.log('Notifications modal closed.');
	}
};

module.exports = closeNotificationModal;
