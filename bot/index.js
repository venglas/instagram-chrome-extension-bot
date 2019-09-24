const likeBotWholeDayMode = require('./like-bot/likeBotWholeDayMode');
const followUsers = require('./follow-bot/followUsers');
const config = require('./config');

(async () => {
	await followUsers(config.followBot);
	// likeBotWholeDayMode(); // run like bot all day or if it isn't set in configuration file, like bot will run only one time
})();
