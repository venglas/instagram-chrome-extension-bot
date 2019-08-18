import DOM_listener from '../helpers/DOM_listener';
import update_matches from '../statistics/update_matched';

const close_new_match = () => {
	DOM_listener('body', undefined, (mutation) => {
		if (
			mutation.target.classList &&
			mutation.target.classList[0] === 'body' &&
			mutation.addedNodes[0] &&
			mutation.addedNodes[0].classList &&
			mutation.addedNodes[0].classList[0] === 'ovl' &&
			mutation.addedNodes[0].innerText &&
			mutation.addedNodes[0].innerText.substr(0, 23) === 'Oh, yeah! It’s a match!'
		) {
			document.querySelector('.ovl__close').children[0].click();
			update_matches();
		}
	});
};

export default close_new_match;
