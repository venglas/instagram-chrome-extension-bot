const get_people_to_message = () => {
	const user_name = localStorage.getItem('user_name');

	const data = [ ...document.querySelectorAll('.contact-card__message') ].map(function callback(currentValue) {
		if (
			currentValue.innerText.substring(0, 11) === 'You matched' ||
			currentValue.innerText.substring(0, 11) === `Hey ${user_name} ! `
		) {
			// here should be other examples
			return currentValue.parentElement.parentElement;
		}
	});

	return data.filter((value) => {
		return value !== undefined;
	});
};

export default get_people_to_message;
