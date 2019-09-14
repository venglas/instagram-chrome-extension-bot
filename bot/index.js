const ig = require('./instagram');

(async () => {
	await ig.init();

	await ig.login();

	// debugger;
})();
