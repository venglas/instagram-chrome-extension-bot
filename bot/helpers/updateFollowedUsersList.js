const fs = require('fs');

const updateFollowedUsersList = async (userName) => {
	const followedUsersList = JSON.parse(fs.readFileSync('bot/bot-data/followedUsers.json'));

	const user = {
		userName: userName,
		FollowDate: Date.now() // returns currently date in miliseconds
	};

	followedUsersList.push(user);

	const changedData = JSON.stringify(followedUsersList);
	fs.writeFileSync('bot/bot-data/followedUsers.json', changedData); //rewrite followed user list info .json file
};

module.exports = updateFollowedUsersList;