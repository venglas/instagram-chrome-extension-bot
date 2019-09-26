const fs = require('fs');
const config = require('../config');
const openInstagram = require('../helpers/openInstagram');
const ig = require('../instagram');

const unfollow = async () => {
	if (config.unfollow.isStart === true) {
		const followed = JSON.parse(fs.readFileSync('bot/bot-data/followedUsers.json'));
		const dateNow = Date.now(); // now time in miliseconds
		const hour = 3600000; // hour calculate to miliseconds
		const day = 86400000; // day calculate to miliseconds

		const convertDaysToHours = 24 * hour * config.unfollow.afterDays;

		let i = 0;

		await openInstagram();

		for (user of followed.followedUsers) {
			const followedUserTime = dateNow - user.FollowDate; // time in milisecond since followed this user

			if (followedUserTime / day > config.unfollow.afterDays) {
				await ig.page.goto(`${ig.BASE_URL}/${user.userName}`);
				await ig.page.waitFor(2000);

				const unfollowButton1 = await ig.page.$x("//button[contains(text(), 'Following')]"); // click for open modal for unfollowing
				await unfollowButton1[0].click();

				await ig.page.waitForXPath('//button[contains(text(), "Unfollow")]'); // wait for unfollow modal
				const unfollowButton2 = await ig.page.$x('//button[contains(text(), "Unfollow")]');
				await unfollowButton2[0].click(); // unfollow user

				console.log(`User -> ${user.userName} unfollowed.`);

				followed.followedUsers.splice(i, 1); //remove unfollowed use

				await fs.writeFileSync('bot/bot-data/followedUsers.json', JSON.stringify(followed.followedUsers)); // save data without unfollowed users

				await ig.page.waitFor(1000);
			}
			i++;
		}
	}
};

module.exports = unfollow;
