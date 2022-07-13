class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null;
    }

    addClock(alarmTime, alarmAction, id) {
        if (!id) {
            throw new Error('Невозможно идентифицировать будильник. Параметр id не передан.');
        }

        if (this.alarmCollection.some(e => e.id === id)) {
            console.error('Будильник с таким id уже существует.');
        } else {
            this.alarmCollection.push({
                id: id,
                time: alarmTime,
                callback: alarmAction
            });
        }
    }

    removeClock(id) {
        let newArr = this.alarmCollection.filter(e => e.id !== id);
        if (newArr.length === this.alarmCollection.length) {
            return 'Будильник с таким id не найден.';
        } else {
            this.alarmCollection = newArr;
            return 'Будильник успешно удалён.'
        }
    }

    getCurrentFormattedTime() {
        let now = new Date();
        let hours = now.getHours() < 10 ? `0${now.getHours()}` : `${now.getHours()}`;
        let minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
        return `${hours}:${minutes}`;
    }

    start() {
        let func = this.getCurrentFormattedTime;
        function checkClock(alarm) {
            if (alarm.time === func()) {
                alarm.callback();
            }
        }

        if (!this.timerId) {
            this.timerId = setInterval(() => this.alarmCollection.forEach(element => checkClock(element)), 1000);
        }
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms() {
        console.log(`Печать всех будильников в количестве ${this.alarmCollection.length}`);
        for (let e of this.alarmCollection) {
            console.log (`Будильник №${e.id} заведён на ${e.time}`);
        }
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}

function getFormattedTime(minutesToAdd) {
    let time = new Date();
    time.setMinutes(time.getMinutes() + minutesToAdd);
    let hours = time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
    let minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
    return `${hours}:${minutes}`;
}

function testCase() {
    let alarm1 = new AlarmClock();

    alarm1.addClock(getFormattedTime(1), () => console.log('Пора вставать!\n(Будильник №1 сработал)'), 1);

    alarm1.addClock(getFormattedTime(2), () => {
        console.log('Вставай!\n(Будильник №2 сработал)');
        alarm1.printAlarms();
        alarm1.removeClock(2);
        console.log('Будильник №2 удален');
        alarm1.printAlarms();
    }, 2);

    alarm1.addClock(getFormattedTime(2), () => console.log('Вставай, а то проспишь!'), 1); // существующий id

    alarm1.addClock(getFormattedTime(3), () => {
        console.log('Вставай, а то проспишь!\n(Будильник №3 сработал)');
        alarm1.printAlarms();
        alarm1.clearAlarms();
        console.log('Все будильники удалены');
        alarm1.printAlarms();
    }, 3);

    alarm1.start();

    try {
        alarm1.addClock('09:01', () => console.log('Иди умываться!'));
    } catch (err) {
        console.error(err);
    }
}