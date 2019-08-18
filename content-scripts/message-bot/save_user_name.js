const save_user_name = () => {
    if (localStorage.getItem('user_name') === null) {
        localStorage.setItem("user_name", document.querySelector('.sidebar-info__name').innerText);
    }
};

export default save_user_name;