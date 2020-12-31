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

export default togglePopup;