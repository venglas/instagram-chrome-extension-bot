// TODO: Debaunce this observer
const DOM_listener = (
	element,
	options = {
		childList: true,
		attributes: true,
		subtree: true //Omit or set to false to observe only changes to the parent node.
	},
	childListCallback = function() {},
	attributesCallback = function() {}
) => {
	const targetNode = document.querySelector(element);

	const observer = new MutationObserver(callback);
	observer.observe(targetNode, options);

	function callback(mutationList, observer) {
		mutationList.forEach((mutation) => {
			switch (mutation.type) {
				case 'childList':
					childListCallback(mutation);
					break;

				case 'attributes':
					attributesCallback(mutation);
					break;
			}
		});
	}
};

export default DOM_listener;

// EXAMPLE WAY TO USE
// DOM_listener(
// 	'body',
// 	{
// 		childList: true,
// 		attributes: true,
// 		subtree: true //Omit or set to false to observe only changes to the parent node.
// 	},
// 	(mutation) => {
// 		if (mutation.target.classList[0] === 'body' && mutation.addedNodes[0].classList[0] === 'ovl') {
// 			console.log(mutation);
// 		}
// 	}
// );
