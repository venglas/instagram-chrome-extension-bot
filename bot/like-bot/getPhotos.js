const ig = require('../instagram');

const getPhotos = async (howMuch) => {
	const newestPhotosOfTag = await ig.page.$$('article > div:nth-child(4) img[decoding="auto"]');

	return [ ...newestPhotosOfTag.slice(0, howMuch - 1) ]; // return an array of photos (number of photos is in config file)
};

module.exports = getPhotos;
