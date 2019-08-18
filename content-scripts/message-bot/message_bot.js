import open_message_window from './open_message_window';
import get_message_from_popup from '../helpers/get_message_from_popup';
import check_message_window from './check_message_window';
import get_people_to_message from './get_people_to_message';
import message_sender from './message_sender';
import stop_message_bot from './stop_message_bot';
import delete_all_old_messages from './delete_all_old_messages';
import block_all_old_messages from './block_all_old_messages';
import save_user_name from './save_user_name';
import global_data from '../global_data';
import usables from '../message-bot/usables/usables';

let people_to_message; // node list with single message

const message_bot = () => {
	get_message_from_popup('start_messaging', () => {
		save_user_name();

		if (check_message_window() === false) {
			open_message_window();

			setTimeout(() => {
				people_to_message = get_people_to_message();
				message_sender(people_to_message);
			}, 2000);
		} else {
			setTimeout(() => {
				people_to_message = get_people_to_message();
				message_sender(people_to_message);
			}, 500);
		}
	});

	get_message_from_popup('stop_messaging', () => {
		stop_message_bot();
	});

	get_message_from_popup('start_delete_all_old_messages', () => {
		delete_all_old_messages();
	});

	get_message_from_popup('stop_delete_all_old_messages', () => {
		clearInterval(global_data.deleting_message_bot_interval);
	});

	get_message_from_popup('start_blocking_all_old_messages', () => {
		console.log('start_blocking_all_old_messages start');
		block_all_old_messages();
	});

	get_message_from_popup('stop_blocking_all_old_messages', () => {
		console.log('start_blocking_all_old_messages stop');
		clearInterval(global_data.blocking_message_bot_interval);
	});

	usables();
};

export default message_bot;
