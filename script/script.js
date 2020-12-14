/* eslint-disable no-unused-vars */
window.addEventListener(`DOMContentLoaded`, () => {


    // Timer
    function countTimer(deadline) {
        const hours = document.querySelector(`#timer-hours`),
            minutes = document.querySelector(`#timer-minutes`),
            seconds = document.querySelector(`#timer-seconds`),
            dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime();

        console.log(dateNow);
        console.log(dateStop);
    }
    countTimer('01 january 2021');
});
