// Задача 1.

class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = 100;
        this.type = null;
    }

    fix() {
        this.state = this.state * 1.5;
    }

    set state(newState) {
        if(newState <= 0) {
            this._state = 0;
        } else if (newState >= 100) {
            this._state = 100;
        } else {
            this._state = newState;
        }
    }

    get state() {
        return this._state;
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "book";
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

// Задача 2.

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if(book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(type, value) {
        let book = null;
        for (let item of this.books) {
            if(item[type] === value) {
                book = item;
            }            
        }
        return book;
    }

    giveBookByName(bookName) {
        let book = null;
        for (let key in this.books) {
            if (this.books[key].name === bookName) {
                book = this.books.splice(key, 1)[0];
            }
        }
        return book;
    }
}

// Задача 3.

class Student {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.subjects = [];
    }
      
    addMark(mark, subjectName) {
        if(mark < 1 || mark > 5 || isNaN(mark)) {
            return "Ошибка, оценка должна быть числом от 1 до 5";
        } else {
            let index = this.subjects.findIndex(item => item.name === subjectName);
            if (index !== -1) {
                this.subjects[index].marks.push(mark);
            } else {
                this.subjects.push({
                    name: subjectName,
                    marks: []
                });
                this.subjects.at(-1).marks.push(mark);
            }
        }
    }

    getAverageBySubject(subjectName) {
        let index = this.subjects.findIndex(item => item.name === subjectName);
        if (index !== -1) {
            return this.subjects[index].marks.reduce((acc, mark) => acc + mark, 0) / this.subjects[index].marks.length;
        } else {
            return "Несуществующий предмет";
        }
    }
      
    getAverage() {
        let resultingArray = [];
        for (let i = 0; i < this.subjects.length; i++) {
            for (let j = 0; j < this.subjects[i].marks.length; j++) {
                resultingArray.push(this.subjects[i].marks[j]);
            }            
        }
        return resultingArray.reduce((acc, mark) => acc + mark, 0) / resultingArray.length;
    }
      
    exclude(reason) {
        delete this.subjects;
        this.excluded = reason;
    }

    // попытка реализовать метод, вносящий несколько оценок по предмету
    addMarks(subjectName, ...marks) {
        for (let mark of marks) {
            if(mark < 1 || mark > 5 || isNaN(mark)) {
                return "Ошибка, оценка должна быть числом от 1 до 5";
            } else {
                let index = this.subjects.findIndex(item => item.name === subjectName);
                if (index !== -1) {
                    this.subjects[index].marks.push(mark);
                } else {
                    this.subjects.push({
                        name: subjectName,
                        marks: []
                    });
                this.subjects.at(-1).marks.push(mark);
                }
            }
        }
    }
}