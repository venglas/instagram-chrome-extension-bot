import get_data_from_chrome from '../helpers/get_data_from_chrome';

const open_message = (message_list, index) => {
    get_data_from_chrome('last_message');

    if (message_list[index]) {
        message_list[index].click();
    }
};

export default open_message;