const update_send_messages = () => {
	chrome.storage.sync.get([ 'bot_stats' ], (stats) => {
		stats.bot_stats.messages++;
		chrome.storage.sync.set(stats);
	});
};
export default update_send_messages;
