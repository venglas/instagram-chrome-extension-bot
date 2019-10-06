const fs = require('fs');
const config = require('../config');

const updateFollowedUsersList = async (userName) => {
	const followedUsersList = JSON.parse(fs.readFileSync(`bot/bot-data/user-data/followedUsers-${config.username}.json`));

	const user = {
		userName: userName,
		FollowDate: Date.now() // returns currently date in miliseconds
	};

	followedUsersList.push(user);

	const changedData = JSON.stringify(followedUsersList);
	fs.writeFileSync(`bot/bot-data/user-data/followedUsers-${config.username}.json`, changedData); //rewrite followed user list info .json file
};

module.exports = updateFollowedUsersList;
