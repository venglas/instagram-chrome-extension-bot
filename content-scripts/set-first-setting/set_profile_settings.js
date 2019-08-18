import get_message_from_popup from '../helpers/get_message_from_popup';

const set_profile_settings = () => {
	get_message_from_popup('set_correct_settings', () => {
		if (document.querySelector('[rel=settings]')) {
			document.querySelector('[rel=settings]').click();
		} else {
			alert('If you want to configure go to your profile.');
		}

		setTimeout(() => {
			document.querySelector('[data-qa-role="section-language"]').click();
		}, 1000);

		setTimeout(() => {
			document.querySelector('.select-field__label').click();
			document.querySelectorAll('.react-button--narrow')[6].addEventListener('click', () => {
				chrome.storage.sync.set({ first_login_status: true });
				alert('Configured correctly!');
			});
		}, 1700);
	});
};

export default set_profile_settings;
