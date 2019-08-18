const set_localStorage_data = (item_name, data) => {
	localStorage.setItem(item_name, JSON.stringify(data));
};

export default set_localStorage_data;
