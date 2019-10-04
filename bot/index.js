const likeBotWholeDayMode = require('./like-bot/likeBotWholeDayMode');
const followUsers = require('./follow-bot/by-location/followUsers');
const unfollow = require('./follow-bot/unfollow');
const fullBotMode = require('./full-bot-mode/fullBotMode');
const config = require('./config');

(async () => {
	await followUsers(config.followBot);
	await unfollow();
	await likeBotWholeDayMode(); // run like bot all day or if it isn't set in configuration file, like bot will run only one time

	await fullBotMode();
})();
