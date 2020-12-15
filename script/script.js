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

        const btnMenu = document.querySelector(`.menu`),
            menu = document.querySelector(`menu`),
            closeBtn = document.querySelector(`.close-btn`),
            menuItems = menu.querySelectorAll(`ul>li`);

        const handlerMenu = () => {
            menu.classList.toggle(`active-menu`);
            animScroll();
        };
        btnMenu.addEventListener(`click`, handlerMenu);
        closeBtn.addEventListener(`click`, handlerMenu);
        menuItems.forEach(elem => elem.addEventListener(`click`, handlerMenu));
    };
    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector(`.popup`),
            popupBtn = document.querySelectorAll(`.popup-btn`),
            popupClose = document.querySelector(`.popup-close`);

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

        popupClose.addEventListener(`click`, () => {
            popup.style.display = `none`;
        });
    };
    togglePopup();

    document.querySelector('main a').addEventListener('click', animScroll);
});
