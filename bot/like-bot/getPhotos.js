const ig = require('../instagram');
const config = require('../config');

const getPhotos = async () => {
	const newestPhotosOfTag = await ig.page.$$('article > div:nth-child(4) img[decoding="auto"]');

	return [ ...newestPhotosOfTag.slice(0, config.howMuchPhotosLike - 1) ]; // return an array of photos (number of photos is in config file)
};

module.exports = getPhotos;
