const color_log = (txt, way = 'default') => {

    switch(way){
        case 'default':
            console.log(txt);
        break;

        case 'warning':
            console.log(`%c ${txt}`, 'background: red; color: black');
        break;

        case 'tip':
            console.log(`%c ${txt}`, 'background: gold; color: black');
        break;

        case 'info':
            console.log(`%c ${txt}`, 'background: green; color: white');
        break;

        case 'test':
            console.log(`%c ${txt}`, 'background: yellow; color: green');
        break;
    }
};

export default color_log;