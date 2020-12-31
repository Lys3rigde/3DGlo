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

export default setCommandImg;