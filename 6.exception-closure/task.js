// Задача 1.

function parseCount(inputValue) {
    let parsedValue = Number.parseInt(inputValue);
    if (Number.isNaN(parsedValue)) {
        throw new Error('Невалидное значение');
    } 
    return parsedValue;
}

function validateCount(inputValue) {
    try {
        return parseCount(inputValue)
    } catch (error) {
        return error;
    }    
}

// Задача 2.

class Triangle {
    constructor(a, b, c) {
        if ((a + b) < c || (a + c) < b || (b + c) < a) {
            throw new Error('Треугольник с такими сторонами не существует');
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getPerimeter = () => this.a + this.b + this.c;

    getArea = () => {
        let p = this.getPerimeter() / 2;
        let s = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
        return Number.parseFloat(s.toFixed(3));
    }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch (error) {
        return {
            getArea() {
                return 'Ошибка! Треугольник не существует'
            },
            getPerimeter() {
                return 'Ошибка! Треугольник не существует'
            }
        }        
    }
}