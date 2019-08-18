const wait_for_element_visible = (selector, time, callback = function() {}) => {
	if (document.querySelector(selector) != null) {
		callback();
	} else {
		setTimeout(function() {
			wait_for_element_visible(selector, time, callback);
		}, time);
	}
};

export default wait_for_element_visible;
