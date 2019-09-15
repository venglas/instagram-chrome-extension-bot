const consoleLineBreak = (type) => {
	switch (type) {
		case '=':
			console.log('========== ========== ========== ========== ========== ========== ==========');
			break;

		case '-':
			console.log('---------- ---------- ---------- ---------- ---------- ---------- ----------');
			break;

		case '*':
			console.log('********** ********** ********** ********** ********** ********** **********');
			break;
	}
};

module.exports = consoleLineBreak;
