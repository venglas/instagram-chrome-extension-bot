const likeBotWholeDayMode = require('./like-bot/likeBotWholeDayMode');
const followUsers = require('./follow-bot/by-location/followUsers');
const config = require('./config');

const unfollow = require('./follow-bot/unfollow');

(async () => {
	await followUsers(config.followBot);
	await unfollow();
	await likeBotWholeDayMode(); // run like bot all day or if it isn't set in configuration file, like bot will run only one time
})();
