const fs = require('fs');
const config = require('../config');
const openInstagram = require('../helpers/openInstagram');
const ig = require('../instagram');

const removeUserFromFollowedList = async (index, list) => {
	list.splice(index, 1); //remove unfollowed use
	await fs.writeFileSync(`bot/bot-data/followedUsers-${config.username}.json`, JSON.stringify(list)); // save data without unfollowed users
};

const showCountOfUsersToUnfollow = (followedUsersList, dateNow, day) => {
	const usersToUnfollow = [];

	for (user of followedUsersList) {
		const followedUserTime = dateNow - user.FollowDate; // time in milisecond since followed this user

		if (followedUserTime / day > config.unfollow.afterDays) {
			usersToUnfollow.push(user);
		}
	}

	console.log(`Users to unfollow: ${usersToUnfollow.length}`);
};

const unfollow = async () => {
	if (config.isOn.unfollow === true) {
		let followedUsers = JSON.parse(fs.readFileSync(`bot/bot-data/followedUsers-${config.username}.json`));
		const dateNow = Date.now(); // now time in miliseconds
		const hour = 3600000; // hour calculate to miliseconds
		const day = 86400000; // day calculate to miliseconds

		// const convertDaysToHours = 24 * hour * config.unfollow.afterDays; // not used

		await openInstagram();

		showCountOfUsersToUnfollow(followedUsers, dateNow, day);

		for (const user of followedUsers) {
			let i = 0;
			followedUsers = JSON.parse(fs.readFileSync(`bot/bot-data/followedUsers-${config.username}.json`)); // overwrite followedUsers after unfollow
			const followedUserTime = dateNow - user.FollowDate; // time in milisecond since followed this user

			if (followedUserTime / day > config.unfollow.afterDays) {
				await ig.page.waitFor(500);
				await ig.page.goto(`${ig.BASE_URL}/${user.userName}`);
				await ig.page.waitFor(2000);

				const isUserBlocked = await ig.page.$x("//button[contains(text(), 'Following')]");

				// if bot not find 'following' button that user are not followed or user was blocked
				if (isUserBlocked.length === 0) {
					console.log(`ERROR THIS USER (${user.userName}) WAS BLOCKED ON INSTAGRAM, OR YOU UNFOLLOWED HIM MANUALLY.`);

					removeUserFromFollowedList(i, followedUsers);

					await ig.page.waitFor(1000);
				} else {
					const unfollowButton1 = await ig.page.$x("//button[contains(text(), 'Following')]"); // click for open modal for unfollowing
					await unfollowButton1[0].click();

					await ig.page.waitForXPath('//button[contains(text(), "Unfollow")]'); // wait for unfollow modal
					const unfollowButton2 = await ig.page.$x('//button[contains(text(), "Unfollow")]');
					await unfollowButton2[0].click(); // unfollow user

					console.log(`User -> ${user.userName} unfollowed.`);

					removeUserFromFollowedList(i, followedUsers);

					await ig.page.waitFor(1500);

					const userIsFollowingYou = await ig.page.$x("//button[contains(text(), 'Follow Back')]"); // user must have following you and get text from which button

					// play sound if bot unffolow the user who following you, and add this user to other list
					if (userIsFollowingYou.length > 0) {
						console.log(`You unfollowed ${user.userName}, who following you. Person was added to another list.`);

						const player = require('play-sound')((opts = {}));
						player.play('bot/bot-data/sounds/accomplished.mp3'); // play sound

						const unfollowedUsersWhoFollowingYouList = JSON.parse(await fs.readFileSync(`./bot/bot-data/unfollowedUsersWhoFollowingYou-${config.username}.json`));

						const newUser = {
							userName: user.userName
						};

						unfollowedUsersWhoFollowingYouList.push(newUser);

						await fs.writeFileSync(`./bot/bot-data/unfollowedUsersWhoFollowingYou-${config.username}.json`, JSON.stringify(unfollowedUsersWhoFollowingYouList));

						// TODO: make screenshoot of profile which following you and you unfollowed.
					}
				}
			}
			i++;
		}
	}
};

module.exports = unfollow;
