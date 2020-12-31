
const animScroll = () => {

    const target = event.target.closest('[href^="#"]'),
        speed = 0.57;

    if (target) {
        const pageY = window.pageYOffset,
            regEx = target.href.replace(/[^#]*(.*)/, '$1'),
            distTopPosition = document.querySelector(regEx).getBoundingClientRect().top;

        let start = 0;

        const step = time => {
            if (!start) start = time;

            const progress = time - start;

            const e = (distTopPosition < 0 ?
                Math.max(pageY - progress / speed, pageY + distTopPosition) :
                Math.min(pageY + progress / speed, pageY + distTopPosition));

            window.scrollTo(0, e);

            if (e < pageY + distTopPosition) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);

    }
};

const toggleMenu = () => {

    const menu = document.querySelector('menu'),
        body = document.querySelector('body');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
        animScroll();
    };

    body.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.menu')) {
            handlerMenu();
        } else if (!target.closest('.active-menu') && menu.classList.contains('active-menu')) {
            handlerMenu();
        } else if (target.closest('.close-btn')) {
            handlerMenu();
        } else if (target.closest('a')) {
            handlerMenu();
        }
    });
};

export default toggleMenu;
