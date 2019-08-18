const update_matches = () => {
	chrome.storage.sync.get([ 'bot_stats' ], (stats) => {
		stats.bot_stats.matches++;
		chrome.storage.sync.set(stats);
	});
};

export default update_matches;
