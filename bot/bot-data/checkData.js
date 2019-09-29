const fs = require('fs');
const consoleLineBreak = require('../helpers/consoleLineBreak');

const checkData = async () => {
	if ((await fs.existsSync('bot/bot-data/followedUsers.json')) === false) {
		console.log('Create followedUsers.json file');
		consoleLineBreak('=');

		await fs.writeFileSync('bot/bot-data/followedUsers.json', JSON.stringify({ followedUsers: [] }));
	}

	if ((await fs.existsSync('bot/bot-data/profileInfo.json')) === false) {
		console.log('Create profileInfo.json file');
		consoleLineBreak('=');

		await fs.writeFileSync('bot/bot-data/profileInfo.json', JSON.stringify({ username: '', posts: 0, followers: 0, following: 0, date: '', allLikes: 0, lastLikes: 0 }));
	}

	if ((await fs.existsSync('bot/bot-data/unfollowedUsersWhoFollowingYou.json')) === false) {
		console.log('Create unfollowedUsersWhoFollowingYou.json file');
		consoleLineBreak('=');

		await fs.writeFileSync('bot/bot-data/unfollowedUsersWhoFollowingYou.json', JSON.stringify([]));
	}
};

module.exports = checkData;
