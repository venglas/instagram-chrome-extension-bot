const fs = require('fs');
const ig = require('../instagram');

const likePhotos = async (photos) => {
	for (photo of photos) {
		await photo.click();
		await ig.page.waitFor(1000);

		// await ig.page.waitForXPath('//section/span/button/span[contains(@aria-label, "Like")]');

		// const likeButton = ig.page.$x('//section/span/button/span[contains(@aria-label, "Like")]');

		// if likeBot element exist it's means that this photo was not liked yet

		if ((await ig.page.$('section span button span[aria-label="Like"]')) !== null) {
			await ig.page.click('section span button span[aria-label="Like"]');
			await ig.page.waitFor(2000);

			await ig.page.click('.ckWGn'); // close photo modal (div[role=dialog] button:nth-child(3))
			await ig.page.waitFor(3000); //here should be a randomly generated number of seconds to wait
		} else if ((await ig.page.$x('//section/span/button/span[contains(@aria-label, "Unlike")]')) !== null) {
			await ig.page.waitFor(2000);
			await ig.page.click('.ckWGn');
		}
	}
};

module.exports = likePhotos;
