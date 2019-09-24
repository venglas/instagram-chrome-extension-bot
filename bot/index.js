const likeBotWholeDayMode = require('./like-bot/likeBotWholeDayMode');

(async () => {
	likeBotWholeDayMode(); // run like bot all day or if it isn't set in configuration file, like bot will run only one time
})();
