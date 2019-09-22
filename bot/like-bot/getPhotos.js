const ig = require('../instagram');

const getPhotos = async () => {
	const newestPhotosOfTag = await ig.page.$$('article > div:nth-child(4) img[decoding="auto"]');

	return [ ...newestPhotosOfTag.slice(0, 9) ]; // return an array of 10 photo elements
};

module.exports = getPhotos;
