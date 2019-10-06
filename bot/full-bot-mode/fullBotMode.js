const config = require('../config');

// const openInstagram = require('../helpers/openInstagram');
const showStats = require('../showStats');
const ig = require('../instagram');

const followUsers = require('../follow-bot/by-location/followUsers');
const likePhotosByLocation = require('../like-bot/by-location/likeBotByLocation');

const fullBotMode = async () => {
	if (config.isOn.fullBotMode === true) {
		while (true) {
			if (config.fullBotMode.functionalities.followBot === true) {
				await followUsers(config.followBot);
				await ig.page.waitFor(config.fullBotMode.breakes.afterFollowNot);
			}

			if (config.fullBotMode.functionalities.likeBot === true) {
				await likePhotosByLocation(config.likeByLocation);
				await showStats(); // after liking all locations show stats
				await ig.page.waitFor(config.fullBotMode.breakes.afterLikeBot);
				// wait some time then close browser
				//wait some time to run next functionality
			}
		}

		// if (config.fullBotMode.functionalities.unfollow) console.log('unfollow bot runs');
	}
};

module.exports = fullBotMode;
