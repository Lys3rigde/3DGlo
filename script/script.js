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

    //slider

    const slider = () => {
        const slide = document.querySelectorAll(`.portfolio-item`),
            btn = document.querySelectorAll(`.portfolio-btn`),
            ulDots = document.querySelector(`.portfolio-dots`),
            slider = document.querySelector(`.portfolio-content`);

        const addDots = () => {
            for (let i = 0; i < slide.length; i++) {
                const li = document.createElement(`li`);
                li.classList.add(`dot`);
                ulDots.insertAdjacentElement(`beforeend`, li);
            }
            ulDots.querySelector(`li`).classList.add(`dot-active`);
        };
        addDots();

        const dot = document.querySelectorAll(`.dot`);
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, `portfolio-item-active`);
            prevSlide(dot, currentSlide, `dot-active`);
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, `portfolio-item-active`);
            nextSlide(dot, currentSlide, `dot-active`);

        };

        const startSlide = (time = 3000) => {

            interval = setInterval(autoPlaySlide, time);

        };

        const stopSLide = () => {
            clearInterval(interval);
        };

        slider.addEventListener(`click`, (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches(`.portfolio-btn, .dot`)) {
                return;
            }

            prevSlide(slide, currentSlide, `portfolio-item-active`);
            prevSlide(dot, currentSlide, `dot-active`);

            if (target.matches(`#arrow-right`)) {
                currentSlide++;
            }   else if (target.matches(`#arrow-left`)) {
                currentSlide--;
            }   else if (target.matches(`.dot`)) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, `portfolio-item-active`);
            nextSlide(dot, currentSlide, `dot-active`);

        });

        slider.addEventListener(`mouseover`, (event) => {
            if (event.target.matches(`.portfolio-btn`) ||
                event.target.matches(`.dot`)) {
                stopSLide();
            }
        });

        slider.addEventListener(`mouseout`, (event) => {
            if (event.target.matches(`.portfolio-btn`) ||
                event.target.matches(`.dot`)) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();

    //cmd-data

    const setCommandImg = () => {
        const command = document.querySelector(`#command .row`);

        const changeImg = () => {
            const target = event.target;

            if (target.classList.contains(`command__photo`)) {
                const lastSrc = target.src;

                target.src = target.dataset.img;
                target.dataset.img = lastSrc;
            }
        };

        command.addEventListener('mouseover', changeImg);
        command.addEventListener('mouseout', changeImg);
    };
    setCommandImg();

    //calc-valid

    const calcBlock = document.querySelector(`.calc-block`),
        calcBlockInput = calcBlock.querySelectorAll(`input`);

    calcBlockInput.forEach((i) => {
        i.addEventListener(`input`, () => {
            i.value = i.value.replace(/\D/g, '');
        });
    });
});
