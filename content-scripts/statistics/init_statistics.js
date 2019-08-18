const init_statistics = () => {
	chrome.storage.sync.get([ 'bot_stats' ], (stats) => {
		if (typeof stats === 'object' && stats.likes === undefined) {
			chrome.storage.sync.set({
				// here should be use snake_case cuz this is replace to string with spacebar
				bot_stats: {
					likes: 0,
					messages: 0,
					delete_messages: 0,
					matches: 0
				}
			});
		}
	});
};

export default init_statistics;
