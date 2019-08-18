const global_data = () => {
	return {
		options: [ '👻', 'snap', 'Snap', 'snapchat', 'Snapchat', 'sc:', 'Sc:', 'SNAP', 'SNAPCHAT' ],
		snapchats: [],
		likeCounter: 0,
		dislikeCounter: 0,
		message_counter: 0,
		GeneralInterval: null,
		text: '',
		botStatus: false,
		startTimerValue: [],
		deletedMessages: 0,
		initCounter: 0,
		updateCalendarCounter: 0,

		like_button: document.querySelector('.profile-action--yes'), // this not working correctly
		people_to_message: [],
		message_bot_interval: null,
		deleting_message_bot_interval: null,
		blocking_message_bot_interval: null,
		last_message: ''
	};
};

export default global_data;
