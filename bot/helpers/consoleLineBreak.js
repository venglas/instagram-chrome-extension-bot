const colorsLog = require('./colorsLog');

const consoleLineBreak = (type) => {
	switch (type) {
		case '=':
			console.log(colorsLog.Reset);
			console.log(colorsLog.FgBlue, '========== ========== ========== ========== ========== ========== ==========');
			console.log(colorsLog.Reset);
			break;

		case '-':
			console.log(colorsLog.Reset);
			console.log(colorsLog.FgBlue, '---------- ---------- ---------- ---------- ---------- ---------- ----------');
			console.log(colorsLog.Reset);
			break;

		case '*':
			console.log(colorsLog.Reset);
			console.log(colorsLog.FgBlue, '********** ********** ********** ********** ********** ********** **********');
			console.log(colorsLog.Reset);
			break;
	}
};

module.exports = consoleLineBreak;
