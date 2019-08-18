const get_localStorage_data = (item_name) => {
	return JSON.parse(localStorage.getItem(item_name));
};

export default get_localStorage_data;
