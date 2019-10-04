const config = require('../config');

// const openInstagram = require('../helpers/openInstagram');
const showStats = require('../showStats');

const followUsers = require('../follow-bot/by-location/followUsers');
const likePhotosByLocation = require('../like-bot/by-location/likeBotByLocation');

const fullBotMode = async () => {
	if (config.isOn.fullBotMode === true) {
		//check and run functionalities:
		//follow bot (by location)
		//like bot (by location)
		// unfollow

		while (true) {
			if (config.fullBotMode.functionalities.followBot === true) {
				console.log('follow');
				await followUsers(config.followBot);
			}

			if (config.fullBotMode.functionalities.likeBot === true) {
				await likePhotosByLocation(config.likeByLocation);
				await showStats(); // after liking all locations show stats
				// wait some time then close browser
				//wait some time to run next functionality
			}
		}

		// if (config.fullBotMode.functionalities.unfollow) console.log('unfollow bot runs');
	}
};

module.exports = fullBotMode;
