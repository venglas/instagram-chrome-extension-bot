const config = require('../config');

const followUsers = require('../follow-bot/by-location/followUsers');

const fullBotMode = async () => {
	if (config.isOn.fullBotMode === true) {
		//check and run functionalities:
		//follow bot (by location)
		//like bot (by location)
		// unfollow

		if (config.fullBotMode.functionalities.followBot) {
			await followUsers(config.followBot);
		}
		if (config.fullBotMode.functionalities.likeBot) console.log('like bot runs');
		if (config.fullBotMode.functionalities.unfollow) console.log('unfollow bot runs');
	}
};

module.exports = fullBotMode;
