const save_data_to_chrome = (object) => {
    chrome.storage.sync.set(object);
};

export default save_data_to_chrome;