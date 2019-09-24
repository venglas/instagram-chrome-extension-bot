const colorsLog = require('./colorsLog');

const headingLog = (text) => {
	const linebreak = '********** ********** ********** ********** ********** ********** **********'; // up and down linebreake pattern
	const logColor = colorsLog.FgYellow; // color our heading
	text = text.toUpperCase();
	const pattern = [];

	const makePattern = () => {
		for (let i = 0; Math.floor((linebreak.length - text.length) / 2 - 3) >= i; i++) {
			pattern.push('*');
		}
	};

	makePattern(); // add pattern from left side
	pattern.push(`   ${text}   `); // add text to pattern
	makePattern(); // add pattern from right side
	pattern.pop(); // remove last elemento from pattern arayy

	console.log(colorsLog.Reset);
	console.log(logColor, linebreak);
	console.log(colorsLog.Reset);

	console.log(logColor, pattern.join('')); // join array to single string and print it

	console.log(colorsLog.Reset);
	console.log(logColor, linebreak);
	console.log(colorsLog.Reset);
};

module.exports = headingLog;
