// ЗАДАЧА 1

function cachingDecoratorNew(func) {
  let cache = [];
  
  function wrapper(...args) {
    const hash = args.join(','); // получаем правильный хэш
    let objectInCache = cache.find(item => item.hash === hash); // ищем элемент, хэш которого равен нашему хэшу
    if (objectInCache) { // если элемент найден
      console.log("Из кэша: " + objectInCache.result);
        return "Из кэша: " + objectInCache.result;
    }
  
    let result = func(...args); // в кэше результата нет - придётся считать
    cache.push({hash, result}) ; // добавляем элемент с правильной структурой
    if (cache.length > 5) {
      cache.shift(); // если слишком много элементов в кэше надо удалить самый старый (первый) 
    }
    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }
  return wrapper;
}

// ЗАДАЧА 2

function debounceDecoratorNew(func, delay) {
  let isThrottled = false;
  let timeoutId = null;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => isThrottled = false, delay);
    if (isThrottled) {
      return;
    }
    
    func();
    isThrottled = true;
  }
}

function testCase2() {
  const sendSignal = () => console.log("Сигнал отправлен");
  const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);
  setTimeout(upgradedSendSignal); // Сигнал отправлен
  setTimeout(upgradedSendSignal, 300); // проигнорировано так как от последнего вызова прошло менее 2000мс (300 - 0 < 2000)
  setTimeout(upgradedSendSignal, 900); // проигнорировано так как времени от последнего вызова прошло: 900-300=600 (600 < 2000)
  setTimeout(upgradedSendSignal, 1200); // проигнорировано так как времени от последнего вызова прошло: 1200-900=300 (300 < 2000)
  setTimeout(upgradedSendSignal, 2300); // проигнорировано так как времени от последнего вызова прошло: 2300-1200=1100 (1100 < 2000)
  setTimeout(upgradedSendSignal, 4400); // Сигнал отправлен так как времени от последнего вызова прошло: 4400-2300=2100 (2100 > 2000)
  setTimeout(upgradedSendSignal, 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с ...ЧТО??? НЕ БУДЕТ! 4500 - 4400 = 100 (100 < 2000)
}

// ЗАДАЧА 3

function debounceDecorator2(func, delay) {
  wrapper.counter = 0;
  let isThrottled = false;
  let timeoutId = null;
  function wrapper() {
    wrapper.counter++;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => isThrottled = false, delay);
    if (isThrottled) {      
      return;
    }
    
    func();
    isThrottled = true;
  }
  return wrapper;
}

function testCase3() {
  const sendSignal2 = () => console.log("Сигнал " + upgradedSendSignal2.counter + " отправлен");
  const upgradedSendSignal2 = debounceDecorator2(sendSignal2, 2000);
  setTimeout(() => {
    upgradedSendSignal2();
    console.log(upgradedSendSignal2.counter + " запрос обработан");
  }); // Сигнал отправлен
  setTimeout(() => {
    upgradedSendSignal2();
    console.log(upgradedSendSignal2.counter + " запрос обработан");
  }, 300); // проигнорировано так как от последнего вызова прошло менее 2000мс (300 - 0 < 2000)
  setTimeout(() => {
    upgradedSendSignal2();
    console.log(upgradedSendSignal2.counter + " запрос обработан");
  }, 900); // проигнорировано так как времени от последнего вызова прошло: 900-300=600 (600 < 2000)
  setTimeout(() => {
    upgradedSendSignal2();
    console.log(upgradedSendSignal2.counter + " запрос обработан");
  }, 1200); // проигнорировано так как времени от последнего вызова прошло: 1200-900=300 (300 < 2000)
  setTimeout(() => {
    upgradedSendSignal2();
    console.log(upgradedSendSignal2.counter + " запрос обработан");
  }, 2300); // проигнорировано так как времени от последнего вызова прошло: 2300-1200=1100 (1100 < 2000)
  setTimeout(() => {
    upgradedSendSignal2();
    console.log(upgradedSendSignal2.counter + " запрос обработан");
  }, 4400); // Сигнал отправлен так как времени от последнего вызова прошло: 4400-2300=2100 (2100 > 2000)
  setTimeout(() => {
    upgradedSendSignal2();
    console.log(upgradedSendSignal2.counter + " запрос обработан");
  }, 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с ...ЧТО??? НЕ БУДЕТ! 4500 - 4400 = 100 (100 < 2000)
}