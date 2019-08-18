import get_user_mail from './get_user_mail';
import set_profile_settings from './set_profile_settings';

set_profile_settings();

const set_first_settings = () => {
	const user_mail = get_user_mail();

	chrome.storage.sync.get([ 'first_login' ], (store) => {
		if (store.first_login === undefined) {
			chrome.storage.sync.set({ first_login: [], first_login_status: false });
		}

		const check_and_add_new_user = () => {
			if (store.first_login !== undefined && store.first_login.length === 0) {
				chrome.storage.sync.set({ first_login: [ user_mail ], first_login_status: false });
			} else {
				for (let i = 0; i < store.first_login.length; i++) {
					if (!store.first_login.includes(user_mail)) {
						store.first_login.push(user_mail);
						store.first_login_status = false;

						chrome.storage.sync.set(store);
						return;
					}
				}
			}
		};

		check_and_add_new_user();
	});
};

export default set_first_settings;
