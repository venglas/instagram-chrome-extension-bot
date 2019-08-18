import global_data from '../global_data';
import check_message_window from './check_message_window';

const stop_message_bot = () => {
    if ( check_message_window() === true ) {
        clearInterval(global_data.message_bot_interval);

        document.querySelector('.messenger-ovl__close').click();
    }
};

export default stop_message_bot;