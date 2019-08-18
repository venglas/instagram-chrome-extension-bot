const like_by_keywords = () => {
	const data = {
		opt: [],
		match: []
	};

	chrome.storage.sync.get([ 'like_bot' ], (chromeData, data) => {
		const keywords = chromeData.like_bot.keywords.split(',');

		const keywordsArray = keywords.map(function(el) {
			return el.trim();
		});

		localStorage.setItem('likeKeywords', JSON.stringify(keywordsArray));
	});

	const reg = new RegExp(JSON.parse(localStorage.getItem('likeKeywords')).join('|'), 'gi');

	function check_string() {
		const bio = document.querySelector('.profile-section__txt-line')
			? document.querySelector('.profile-section__txt-line').innerText
			: false;

		if (bio !== false) {
			if (
				document.querySelector('.profile-section__txt-line') !== null &&
				document.querySelector('.profile-section__txt-line').innerText.match(reg) !== null &&
				document.querySelector('.profile-section__txt-line').innerText.match(reg).length >= 1
			) {
				document.querySelector('.profile-section__txt-line').innerHTML = bio.replace(reg, function(val) {
					data.match.push(val);
					return `<span style="color: red; font-weight: bold;">${val}</span>`;
				});

				console.log(`Matched`);

				return true;
			}
		}
	}

	return check_string();
};

export default like_by_keywords;
