const get_chatter_info = () => {
	const $userImg = document.querySelector('.header-gallery__img');

	if ($userImg) {
		chrome.storage.sync.get([ 'chatters' ], (data) => {
			if (data.chatters) {
				const userInfo = {
					img: $userImg.getAttribute('src'),
					profileLink: document.querySelector('.js-connection-profile').getAttribute('href'),
					userName: document.querySelector('.connection-header__name').innerText,
					userAge: document.querySelector('.connection-header__age').innerText
				};

				data.chatters.push(userInfo);
				chrome.storage.sync.set(data);
			} else {
				chrome.storage.sync.set({ chatters: [] });
			}
		});
	}
};

export default get_chatter_info;
