class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId;
    }

    addClock = function(alarmTime, alarmAction, timerId) {
        if (timerId === undefined) {
            throw new Error('Невозможно идентифицировать будильник. Параметр id не передан.');
        }

        if (this.alarmCollection.some(e => e.id === timerId)) {
            console.error('Будильник с таким id уже существует.');
        } else {
            this.alarmCollection.push({
                id: timerId,
                time: alarmTime,
                callback: alarmAction
            });
        }
    }

    removeClock = id => {
        let newArr = this.alarmCollection.filter(e => e.id !== id);
        if (newArr.length === this.alarmCollection.length) {
            return 'Будильник с таким id не найден.';
        } else {
            this.alarmCollection = newArr;
            return 'Будильник успешно удален.'
        }
    }

    start = function() {
        checkClock = function(alarm) {
            if (alarm.alarmTime === getCurrentFormattedTime()) {
                alarm.callback();
            }
        }
    }
}

getCurrentFormattedTime = function() {
    let now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
}