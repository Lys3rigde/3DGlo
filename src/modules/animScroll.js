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

export default animScroll;