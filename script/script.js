/* eslint-disable arrow-parens */

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

window.addEventListener(`DOMContentLoaded`, () => {

    function getZero(num) {
        if (num > 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    // Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector(`#timer-hours`),
            timerMinutes = document.querySelector(`#timer-minutes`),
            timerSeconds = document.querySelector(`#timer-seconds`);

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hour = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hour, minutes, seconds };
        }

        function updateClock() {
            let timer = getTimeRemaining();

            timerHours.innerHTML = getZero(timer.hour);
            timerMinutes.innerHTML = getZero(timer.minutes);
            timerSeconds.innerHTML = getZero(timer.seconds);

            if (timer.timeRemaining > 0) {
                setInterval(updateClock, 1000);
            }   else {
                clearInterval(updateClock);
                timerHours.innerHTML = '00';
                timerMinutes.innerHTML = '00';
                timerSeconds.innerHTML = '00';
            }
        }

        updateClock();
    }
    countTimer('23 december 2020');

    //scroller
    const animScroll = () => {

        let target = event.target.closest('[href^="#"]'),
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

    // menu
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
    toggleMenu();




    //popup

    const togglePopup = () => {
        const popup = document.querySelector(`.popup`),
            popupBtn = document.querySelectorAll(`.popup-btn`);

        const animPopup = () => {
            const popupContent = document.querySelector('.popup-content');
            popupContent.style.position = `absolute`;
            popupContent.style.top = `-50%`;

            let count = -50,
                animInterval;

            const animation = () => {
                animInterval = requestAnimationFrame(animation);
                count += 2.3;
                if (count <= 15) {
                    popupContent.style.top = count + `%`;
                }   else {
                    cancelAnimationFrame(animInterval);
                }
            };
            animInterval = requestAnimationFrame(animation);
        };

        popupBtn.forEach(elem => {
            elem.addEventListener(`click`, () => {
                popup.style.display = `block`;
                if (document.documentElement.clientWidth > 768) {
                    animPopup();
                }
            });
        });

        popup.addEventListener(`click`, (event) => {
            let target = event.target;

            if (target.classList.contains(`popup-close`)) {
                popup.style.display = `none`;
            }   else {
                target = target.closest(`.popup-content`);

                if (!target) {
                    popup.style.display = `none`;
                }
            }


        });
    };


    togglePopup();


    //tabs

    const tabs = () => {
        const tabHeader = document.querySelector(`.service-header`),
            tab = tabHeader.querySelectorAll(`.service-header-tab`),
            tabContent = document.querySelectorAll(`.service-tab`);

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add(`active`);
                    tabContent[i].classList.remove(`d-none`);
                }   else {
                    tab[i].classList.remove(`active`);
                    tabContent[i].classList.add(`d-none`);
                }
            }
        };

        tabHeader.addEventListener(`click`, (event) => {
            let target = event.target;
            target = target.closest(`.service-header-tab`);
            if (target) {
                if (target.classList.contains(`service-header-tab`)) {
                    tab.forEach((item, i) => {
                        if (item === target) {
                            toggleTabContent(i);
                        }
                    });
                }
            }
        });
    };
    tabs();

    document.querySelector('main a').addEventListener('click', animScroll);
});
