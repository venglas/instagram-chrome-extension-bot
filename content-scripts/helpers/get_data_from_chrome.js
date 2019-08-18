const get_data_from_chrome = (data_name) => {
    chrome.storage.sync.get([data_name], data => {
        localStorage.setItem(data_name, JSON.stringify(data) );
    });
};

export default get_data_from_chrome;