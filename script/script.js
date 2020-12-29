/* eslint-disable arrow-parens */

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

window.addEventListener(`DOMContentLoaded`, () => {

    // getZero
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

    //calculator
    const calc = (price = 100) => {

        const calcBlock = document.querySelector(`.calc-block`),
            calcType = document.querySelector(`.calc-type`),
            calcSquare = document.querySelector(`.calc-square`),
            calcCount = document.querySelector(`.calc-count`),
            calcDay = document.querySelector(`.calc-day`),
            totalValue = document.getElementById(`total`);

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            }   else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener(`change`, (event) => {
            const target = event.target;

            if (target.matches(`select`) || target.matches(`input`)) {
                countSum();
            }

        });
    };
    calc(100);

    //send-ajax-form

    const sendForm = () => {
        const errorMessage = `Что-то пошло не так :(`,
            loadMessage = `Загрузка...`,
            successMessage = `Спасибо! Скоро мы с вами свяжемся!`;

        const form = document.getElementById(`form1`),
            popup = document.querySelector(`.popup`),
            bottomForm = document.getElementById(`form2`),
            popupForm = document.getElementById(`form3`);


        const statusMessage = document.createElement(`div`);

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener(`readystatechange`, () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                }   else {
                    errorData(request.status);
                }
            });
            request.open(`POST`, `./server.php`);
            request.setRequestHeader(`Content-Type`, `application/json`);
            request.send(JSON.stringify(body));
        };

        form.addEventListener(`submit`, (e) => {
            e.preventDefault();
            form.append(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body,
                () => {
                    statusMessage.textContent = successMessage;
                },
                (error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        });

        bottomForm.addEventListener(`submit`, (e) => {
            e.preventDefault();
            bottomForm.append(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(bottomForm);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body, () => {
                statusMessage.textContent = successMessage;
                bottomForm.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2699);
            }, (error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
        });

        popupForm.addEventListener(`submit`, (e) => {
            e.preventDefault();
            statusMessage.style.color = `#19b5fe`;
            popupForm.append(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(popupForm);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body, () => {
                statusMessage.textContent = successMessage;
                popupForm.reset();
                setTimeout(() => {
                    statusMessage.remove();
                    popup.style.display = `none`;
                }, 3000);
            }, (error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
        });

    };

    sendForm();

    //forms-validation

    const phoneForm = document.querySelectorAll(`.form-phone`),
        nameForm = document.querySelectorAll(`.form-name`),
        bottomNameForm = document.getElementById(`form2-name`),
        messageForm = document.getElementById(`form2-message`);

    phoneForm.forEach((i) => {
        i.addEventListener(`input`, () => {
            i.value = i.value.replace(/[^+0-9]/,  '');
        });
    });

    nameForm.forEach((i) => {
        i.addEventListener(`input`, () => {
            i.value = i.value.replace(/[^а-я]/gi, '');
        });
    });

    bottomNameForm.addEventListener(`input`, () => {
        bottomNameForm.value = bottomNameForm.value.replace(/[^а-я]/gi, '');
    });

    messageForm.addEventListener(`input`, () => {
        messageForm.value = messageForm.value.replace(/[^а-я,.!?'":;0-9 ]/gi, '');
    });
});
