const fs = require('fs');

const updateLikeData = () => {
	// TODO: refactorize this function to new file in helpers

	// change this way for updating cuz it's  really bad practice to write file on every action
	const profileInfo = JSON.parse(fs.readFileSync('bot/bot-data/profileInfo.json'));

	profileInfo.allLikes = profileInfo.allLikes + 1;
	profileInfo.lastLikes = profileInfo.lastLikes + 1;

	const changedData = JSON.stringify(profileInfo);
	fs.writeFileSync('bot/bot-data/profileInfo.json', changedData); //rewrite profile info .json file
};

module.exports = updateLikeData;
