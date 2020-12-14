const date = new Date(),
    days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ],
    hours = date.getHours(),
    day = days[date.getDay()],
    time = date.toLocaleTimeString('en'),
    newDate = new Date(new Date().getFullYear() + 1, 0, 1);

const greeting = document.createElement('h1'),
    dayWeek = document.createElement('h2'),
    currentTime = document.createElement('h3'),
    newYearTimer = document.createElement('h4');

const changeEnding = num => {
    const textVariant = [ 'день', ' дня', ' дней'];
    const n1 = num % 100,
        n2 = num % 10;
    if (n1 > 4 && n1 < 21) {
        return num + textVariant[2];
    }   else if (n2 === 1) {
        return num + textVariant[0];
    }   else if (n2 > 1 && n2 < 5) {
        return num + textVariant[1];
    }   else {
        return num + textVariant[2];
    }
};

if (hours < 5 || hours > 22) {
    greeting.innerHTML = 'Доброй ночи';
}   else if (hours < 10) {
    greeting.innerHTML = `Доброе утро`;
}   else if (hours < 17) {
    greeting.innerHTML = 'Добрый день';
}   else {
    greeting.innerHTML = 'Добрый вечер';
}

dayWeek.innerHTML = 'Сегодня: ' + day;
currentTime.innerHTML = 'Текущее время: ' + time;
newYearTimer.innerHTML = 'До нового года осталось ' +
    changeEnding(Math.ceil((newDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24));

document.body.append(greeting, dayWeek, currentTime, newYearTimer);
