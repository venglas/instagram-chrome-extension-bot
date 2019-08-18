const past_message_txt = (chatter_name) => {
	if (document.querySelector('.messenger-tools__input') && document.querySelector('.message__content') === null) {
		if (
			document.querySelector('.messenger-tools__input') &&
			document.querySelector('.message__content') === null &&
			chatter_name !== null
		) {
			const msg = JSON.parse(localStorage.getItem('last_message')).last_message;

			const msg_with_names = msg.replace(/{name}/g, chatter_name);

			document.querySelector('.messenger-tools__input').innerText = msg_with_names;
		} else {
			document.querySelector('.messenger-tools__input').innerText = JSON.parse(
				localStorage.getItem('last_message')
			).last_message;
		}
	}
};

export default past_message_txt;
