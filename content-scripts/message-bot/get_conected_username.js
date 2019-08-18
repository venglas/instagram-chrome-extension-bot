const get_conected_username = (userList, which) => {
	if (userList[which]) {
		return userList[which].children[1].children[0].innerText;
	}
};

export default get_conected_username;
