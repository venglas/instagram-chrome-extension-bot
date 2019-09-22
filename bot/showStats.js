// const config = require('./config');
const fs = require('fs');
const consoleLineBreak = require('./helpers/consoleLineBreak');

const showStats = () => {
	let profileInfo = JSON.parse(fs.readFileSync('bot/bot-data/profileInfo.json')); // load json file
	const logInfo = `stats: 
    username: ${profileInfo.username}
    followers: ${profileInfo.followers}
    following: ${profileInfo.following}
    last bot liked: ${profileInfo.lastLikes} photos
    all bot liked: ${profileInfo.allLikes} photos
    `;

	console.log(logInfo);

	consoleLineBreak('=');
};

module.exports = showStats;
