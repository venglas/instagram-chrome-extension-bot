import get_conected_username from '../get_conected_username';
import check_message_window from '../check_message_window';
import past_message_txt from '../past_message_txt';
import send_message from '../send_message';
import update_send_messages from '../../statistics/update_likes';

const get_active_chatter_name = () => {
	const message_list = document.querySelectorAll('.contact-card');
	let index;

	for (let i = 0; i < message_list.length; i++) {
		if (message_list[i].classList.contains('is-current')) {
			index = i;
		}
	}

	return get_conected_username(message_list, index);
};

const send_message_on_arrow = () => {
	if (check_message_window() === true) {
		past_message_txt(get_active_chatter_name());
	}

	setTimeout(() => {
		send_message(); // click on "send" button
		update_send_messages();
	}, 200);
};

export default send_message_on_arrow;
