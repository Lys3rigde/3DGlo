const toggleMenu = () => {
    const menu = document.querySelector('menu');
    let menuActive = false;
    const handlerMenu = () => {
        menuActive = !menuActive;
        menu.classList.toggle(`active-menu`);
        animScroll();
    };
    document.body.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest(`.menu`) || target.closest(`active-menu a`)) {
            handlerMenu();
            return;
        }
        if (menuActive) {
            if (!target.closest('.active-menu')) {
                handlerMenu();
            }   else if (target.closest('.close-btn')) {
                handlerMenu();
            }
        }
    });
};

export default toggleMenu;