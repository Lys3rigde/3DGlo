const sendForm = () => {
    const errorMessage = `Что-то пошло не так :(`,
        loadMessage = `Загрузка...`,
        successMessage = `Спасибо! Скоро мы с вами свяжемся!`;

    const statusMessage = document.createElement(`div`);
    statusMessage.style.color = `#ade4f4`;

    const postData = (body) => fetch(`./server.php`, {
        method: `POST`,
        headers: {
            'Content-type': `application/json`
        },
        body: JSON.stringify(body)
    });

    const sendData = (form) => {
        event.preventDefault();
        form.append(statusMessage);
        let flag = true;

        statusMessage.textContent = loadMessage;
        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
            if (val.trim() !== '') {
                body[key] = val;
            }   else {
                flag = false;
            }
        });

        if (lengthVerify(body) === false) {
            statusMessage.textContent = `Пожалуйста, заполните верно поля формы`;
            lengthVerify(body);
        }   else {
            if (flag) {

                postData(body)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error(`Error network not 200`);
                        }
                        statusMessage.textContent = successMessage;
                        form.reset();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 3000);
                    }, (error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    })
                    .catch(() => {
                        statusMessage.textContent = `Ошибка при отправке формы!`;
                    });
            } else {
                statusMessage.textContent = `Заполните верно все поля формы!`;
            }
        }

    };

    document.body.addEventListener(`submit`, (event) => {
        const target = event.target;
        sendData(target);
    });

};


const phoneForm = document.querySelectorAll(`.form-phone`),
nameForm = document.querySelectorAll(`.form-name`),
bottomNameForm = document.getElementById(`form2-name`),
messageForm = document.getElementById(`form2-message`);

const lengthVerify = (body) => {

if (body.user_name === '' || body.user_phone === '' || body.user_email === '') {
    return false;
} else if (body.user_name.length < 2) {
    return false;
} else if (body.user_phone.length <= 7 || body.user_phone.length >= 12) {
    return false;
} else {
    return true;
}


};

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

export default sendForm;