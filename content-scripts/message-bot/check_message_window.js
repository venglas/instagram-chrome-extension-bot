const check_message_window = () => {
    if ( document.querySelector('.js-messenger-wrap') ){
        return true;
    } else {
        return false;
    }
};

export default check_message_window;