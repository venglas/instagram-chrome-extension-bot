import update_likes from '../statistics/update_likes';

const like = (like_button, data) => {
	like_button.click();
	data.likeCounter++;

	update_likes();
};

export default like;
