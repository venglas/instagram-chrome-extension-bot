const fs = require('fs');
const ig = require('../instagram');
const config = require('../config');

const updateLikeData = (howMuchPhotoLiked) => {
	// change this way for updating cuz it's  really bad practice to write file on every action
	const profileInfo = JSON.parse(fs.readFileSync(`bot/bot-data/user-data/profileInfo-${config.username}.json`));

	profileInfo.allLikes = profileInfo.allLikes + howMuchPhotoLiked;
	profileInfo.lastLikes = profileInfo.lastLikes + howMuchPhotoLiked;

	const changedData = JSON.stringify(profileInfo);
	fs.writeFileSync(`bot/bot-data/user-data/profileInfo-${config.username}.json`, changedData); //rewrite profile info .json file
};

const likePhotos = async (photos) => {
	let counter = 0;

	for (photo of photos) {
		await photo.click();
		await ig.page.waitFor(1000);

		// if likeBot element exist it's means that this photo was not liked yet
		if ((await ig.page.$('section span button span[aria-label="Like"]')) !== null) {
			await ig.page.click('section span button span[aria-label="Like"]'); // like photo

			updateLikeData();

			await ig.page.waitFor(2000);

			await ig.page.click('.ckWGn'); // close photo modal

			const waitTime = Math.floor(Math.random() * (config.waitAfterLike.max - config.waitAfterLike.min + 1)) + config.waitAfterLike.min;
			await ig.page.waitFor(waitTime);
		} else if ((await ig.page.$x('//section/span/button/span[contains(@aria-label, "Unlike")]')) !== null) {
			await ig.page.waitFor(2000);
			await ig.page.click('.ckWGn'); // close photo modal
		}

		counter++;
	}

	const profileInfo = JSON.parse(fs.readFileSync(`bot/bot-data/user-data/profileInfo-${config.username}.json`));
	console.log(`Profile info updated. Added nuber of liked photos: ${counter}.
	Now all liked photos: ${profileInfo.allLikes + counter}
	`);
	updateLikeData(counter);
};

module.exports = likePhotos;
