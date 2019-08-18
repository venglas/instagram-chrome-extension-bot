import global_data from '../global_data';
import get_message_from_popup from '../helpers/get_message_from_popup';
import DOM_listener from '../helpers/DOM_listener';
import like from './like';
import close_new_match from './close_new_match';
import like_by_keywords from './like_by_keywords';

let data = null;
const like_bot_data = {
	interval: null,
	speed: null
};

const interval = setInterval(() => {
	if (document.querySelector('.profile-action--yes')) {
		data = global_data();
		clearInterval(interval);
	}
}, 1000);

get_message_from_popup('start_liking', () => {
	let timeout = parseInt(localStorage.getItem('bot_like_speed'));

	like_bot_data.interval = setInterval(() => {
		chrome.storage.sync.get([ 'like_bot' ], (data) => {
			if (data.like_bot.searchBy === true) {
				document.querySelector('.profile-action--no').click();

				if (like_by_keywords() === true) {
					like(document.querySelector('.profile-action--yes'), data);
				}
			} else {
				like(document.querySelector('.profile-action--yes'), data);

				close_new_match();

				DOM_listener('body', undefined, (mutation) => {
					// should be in other funciton and file, and not working correctly
					if (
						//TODO: check this if states, i think here shouldn't be soo much states
						mutation.target.classList &&
						mutation.target.classList[0] === 'body' &&
						mutation.addedNodes[0] &&
						mutation.addedNodes[0].classList &&
						mutation.addedNodes[0].classList[0] === 'ovl' &&
						mutation.addedNodes[0].innerText.substr(0, 20) === "You're out of votes!"
					) {
						// TODO: Here should be function for changing state of like bot in popup
						clearInterval(like_bot_data.interval);
					}
				});
			}
		});
	}, timeout);
});

get_message_from_popup('stop_liking', () => {
	clearInterval(like_bot_data.interval);
});

get_message_from_popup('set_like_speed', (request) => {
	like_bot_data.speed = Math.floor(5 / request.value * 3500); // here is a logic for set correct speed in ms from % of popup progress bar
	localStorage.setItem('bot_like_speed', like_bot_data.speed);
});
