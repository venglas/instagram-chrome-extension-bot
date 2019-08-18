import global_data from '../global_data';
import check_message_window from './check_message_window';
import open_message_window from './open_message_window';

// TODO: here should be function for blocing user cuz if we block user we will get rid of pair second time with smae person

const get_people_to_delete = () => {
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

const deleting_all_messages = () => {
	global_data.deleting_message_bot_interval = setInterval(() => {
		if (get_people_to_delete()[0] && document.querySelector('.js-im-contact-remove')) {
			get_people_to_delete()[0].click(); // open message for delete

			setTimeout(() => {
				document.querySelector('.js-im-contact-remove').click(); // open deleting menu
			}, 300);
		}

		setTimeout(() => {
			if (document.querySelector('.js-im-confirm-delete')) {
				document.querySelector('.js-im-confirm-delete').click(); // confirm deleting
			}
		}, 700);

		if (get_people_to_delete().length < 1) {
			clearInterval(global_data.deleting_message_bot_interval);
		}
	}, 1200);
};

const delete_all_old_messages = () => {
	if (check_message_window() === true) {
		deleting_all_messages();
	} else {
		open_message_window();
		deleting_all_messages();
	}
};

export default delete_all_old_messages;
