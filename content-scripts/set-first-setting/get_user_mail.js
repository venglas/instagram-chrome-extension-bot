const get_user_mail = () => {
	return localStorage.getItem('signin_login');
};

export default get_user_mail;
