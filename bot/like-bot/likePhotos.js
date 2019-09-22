const fs = require('fs');
const ig = require('../instagram');

const likePhotos = async (photos) => {
	for (photo of photos) {
		await photo.click();
		await ig.page.waitFor(1000);

		// if likeBot element exist it's means that this photo was not liked yet
		if ((await ig.page.$('section span button span[aria-label="Like"]')) !== null) {
			await ig.page.click('section span button span[aria-label="Like"]'); // like photo
			await ig.page.waitFor(2000);

			await ig.page.click('.ckWGn'); // close photo modal

			const waitTime = Math.floor(Math.random() * (8000 - 1500 + 1)) + 1500;
			await ig.page.waitFor(waitTime);
		} else if ((await ig.page.$x('//section/span/button/span[contains(@aria-label, "Unlike")]')) !== null) {
			await ig.page.waitFor(2000);
			await ig.page.click('.ckWGn');
		}
	}
};

module.exports = likePhotos;
