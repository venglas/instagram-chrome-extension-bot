const fs = require('fs');
const consoleLineBreak = require('../helpers/consoleLineBreak');
const config = require('../config');

const resetLastLikeData = () => {
	const profileInfo = JSON.parse(fs.readFileSync(`bot/bot-data/user-data/profileInfo-${config.username}.json`));
	profileInfo.lastLikes = 0;
	const changedData = JSON.stringify(profileInfo);
	fs.writeFileSync(`bot/bot-data/user-data/profileInfo-${config.username}.json`, changedData); //rewrite profile info .json file
};

const checkData = async () => {
	resetLastLikeData();

	if ((await fs.existsSync(`bot/bot-data/user-data/followedUsers-${config.username}.json`)) === false) {
		console.log(`Create followedUsers-${config.username}.json file`);
		consoleLineBreak('=');

		await fs.writeFileSync(`bot/bot-data/user-data/followedUsers-${config.username}.json`, JSON.stringify([]));
	}

	if ((await fs.existsSync(`bot/bot-data/user-data/profileInfo-${config.username}.json`)) === false) {
		console.log(`Create profileInfo-${config.username}.json file`);
		consoleLineBreak('=');

		await fs.writeFileSync(
			`bot/bot-data/user-data/profileInfo-${config.username}.json`,
			JSON.stringify({ username: '', posts: 0, followers: 0, following: 0, date: '', allLikes: 0, lastLikes: 0 })
		);
	}

	if ((await fs.existsSync(`bot/bot-data/user-data/unfollowedUsersWhoFollowingYou-${config.username}.json`)) === false) {
		console.log(`Create unfollowedUsersWhoFollowingYou-${config.username}.json file`);
		consoleLineBreak('=');

		await fs.writeFileSync(`bot/bot-data/user-data/unfollowedUsersWhoFollowingYou-${config.username}.json`, JSON.stringify([]));
	}
};

module.exports = checkData;
