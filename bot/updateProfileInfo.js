const ig = require('./instagram');
const config = require('./config');
const fs = require('fs');
const consoleLineBreak = require('./helpers/consoleLineBreak');
const consoleColors = require('./helpers/colorsLog');

const updateProfileInfo = async () => {
	console.log(consoleColors.FgGreen); // change console font color to green

	console.time('Profile info updated:');
	await ig.page.goto(`${ig.BASE_URL}/${config.username}`);

	// Get text from xPath count number of posts
	const postsCount = await ig.page.$x('//ul/li/span/span');
	const posts = await ig.page.evaluate((span) => span.textContent, postsCount[0]);

	//get text number from followers and following  on profile
	const followersAndFollowingCount = await ig.page.$x('//ul/li/a/span');
	const followers = await ig.page.evaluate((span) => span.textContent, followersAndFollowingCount[0]);

	// Get number of followings ppl
	const following = await ig.page.evaluate((span) => span.textContent, followersAndFollowingCount[1]);

	let profileInfoData = fs.readFileSync(`bot/bot-data/user-data/profileInfo-${config.username}.json`); // load json file
	let profileInfo = JSON.parse(profileInfoData);

	//set new info for .json file (profile info)
	profileInfo.username = config.username;
	profileInfo.posts = posts;
	profileInfo.followers = followers;
	profileInfo.following = following;
	profileInfo.date = new Date();

	const changedData = JSON.stringify(profileInfo);
	fs.writeFileSync(`bot/bot-data/user-data/profileInfo-${config.username}.json`, changedData); //rewrite profile info .json file

	console.timeEnd('Profile info updated:');
	console.log(''); //empty line in terminal view
	console.log(profileInfo);
	consoleLineBreak('=');

	// TODO: add function which show us +/- followers since last bot use
};

module.exports = updateProfileInfo;
