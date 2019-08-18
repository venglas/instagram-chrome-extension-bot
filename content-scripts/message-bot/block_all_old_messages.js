import global_data from '../global_data';
import check_message_window from './check_message_window';
import open_message_window from './open_message_window';

const get_people_to_delete = () => {
	//TODO: should be as a new function file cuz same is in delete_all_old_messages.js
	const user_name = localStorage.getItem('user_name');

	const data = [ ...document.querySelectorAll('.contact-card__message') ].map(function callback(currentValue) {
		if (
			currentValue.parentElement.parentElement.children.length === 3 &&
			currentValue.innerText.substring(0, 11) !== 'You matched' &&
			!currentValue.parentElement.parentElement.children[2].classList.contains('is-active') &&
			currentValue.innerText.substring(0, 11) !== `Hey ${user_name} ! `
		) {
			// here should be other examples
			return currentValue.parentElement.parentElement;
		}
	});

	return data.filter((value) => {
		return value !== undefined;
	});
};

const blocking_all_messages = () => {
	global_data.blocking_message_bot_interval = setInterval(() => {
		if (get_people_to_delete()[0] && document.querySelector('.js-im-abuse-user')) {
			get_people_to_delete()[0].click(); // open message for delete

			setTimeout(() => {
				document.querySelector('.js-im-abuse-user').click(); // open deleting menu
			}, 300);
		}

		setTimeout(() => {
			if (document.querySelector('.js-abuse')) {
				document.querySelector('.js-abuse').click(); // confirm deleting
			}
		}, 700);

		setTimeout(() => {
			if (document.querySelector('.js-send-abuse-button')) {
				document.querySelector('.js-send-abuse-button').click();
			}
		}, 850);

		if (get_people_to_delete().length < 1) {
			clearInterval(global_data.deleting_message_bot_interval);
		}
	}, 1200);
};

const block_all_old_messages = () => {
	if (check_message_window() === true) {
		blocking_all_messages();
	} else {
		open_message_window();
		blocking_all_messages();
	}
};

export default block_all_old_messages;
