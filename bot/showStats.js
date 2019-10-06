const config = require('./config');
const fs = require('fs');
const consoleLineBreak = require('./helpers/consoleLineBreak');
const colorlogs = require('./helpers/colorsLog');

const showStats = () => {
	consoleLineBreak('=');
	console.log(colorlogs.FgGreen); // change color log to green

	let profileInfo = JSON.parse(fs.readFileSync(`bot/bot-data/profileInfo-${config.username}.json`)); // load json file
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
