// 1 - Напишіть 5 прикладів анонімної функції
console.log("1.- Напишіть 5 прикладів анонімної функції");
//1.1 приклад
console.log("1.1 перший приклад");

((q1, f1, f2) => {
  confirm(q1) ? f1() : f2();
})(
  "1 завдання 1 приклад\nВи згодні?",
  () => alert("Так, ви згодні"),
  function () {
    alert("Ні, ви не згодні");
  }
);

//1.2
(function (num) {
  console.log(`${num}.2 другий приклад`);
})(1);

//1.3
((num1, num2) => {
  console.log(num1 + "." + (num1 + num2), "третій приклад ");
})(1, 2);

//1.4
(function (temp) {
  temp();
})(() => {
  console.log("1.4 четвертий приклад");
});

//1.5
const func15 = (param) => param();
func15(function () {
  console.log("1.5 п'ятий приклад анонімної функції");
});

//2. - Напишіть 5 прикладів самовикликаючої функції

//2.1
(function f21(a) {
  console.log("2 - Напишіть 5 прикладів \n самовикликаючої функції", a);
})("\nце перший приклад");

//2.2
(function f22(a) {
  console.log("qqq", a);
})("2.2 другий приклад");

//2.3
(function () {
  console.log("2.3 третій приклад");
})();

//2.4
(function () {
  console.log("2.4 четверлий приклад" + (2 + 3 * 6));
})();

//2.5
(function () {
  const f25 = () => console.log("2.5 п'ятий приклад \nсамовикликаючої функції");
  f25();
})();

//3. - Повторіть колбек функцію bubbleSort з лекці
console.log(`//3. 
- Повторіть колбек функцію 
        bubbleSort з лекці`);

// зробимо рандомний масив 10 єлементів від -10 до 10 включно
function randomArr() {
  let arr = [];
  for (let i = 0; i < 10; i++) arr[i] = Math.floor(Math.random() * 21) - 10;
  return arr;
}

function bubbleSort(callbeck, randomArr) {
  arr = randomArr();
  console.log(
    `невідсортований масив:
              ${arr}\n`,
    arr
  );
  callbeck(arr);
}

function callbFunc(mas) {
  for (let i = 0; i < mas.length; i++) {
    for (let j = 0; j < mas.length - i; j++) {
      mas[j] > mas[j + 1]
        ? ([mas[j], mas[j + 1]] = [mas[j + 1], mas[j]])
        : true;
    }
  }
  console.log(
    `Відсортований nim-to-max масив:
             ${mas}\n`,
    mas
  );
}
bubbleSort(callbFunc, randomArr);

//4. Калькурятор.
//  Створіть функцію calc(num1, num2, action), яка приймає 2 числа з prompt
//  та знак по якому потірбно порахувати приклад. Мусять бути наступні дії: (+, -, /, *)
//  Результат повернути (return) і вивести

console.log(`4. Calc`);

const num41 = 5;
const num42 = 8;
const sign = "/";
// const num41 = prompt("Введіть перше число");
// const num42 = prompt("Введіть друге число");
// const sign = prompt("Введіть мат.дію +_*/");

calc(num41, num42, sign);
calc(5, 5, "+");
calc(7, 8, "-");
calc(3, 4, "*");
calc(3, 0, "/");
calc(7, 4, "%");

function calc(num1, num2, action) {
  switch (action) {
    case "+":
      return console.log(num1 + " + " + num2 + " = " + (num1 + num2));
    case "-":
      return console.log(num1 + " - " + num2 + " = " + (num1 - num2));
    case "*":
      return console.log(num1 + " * " + num2 + " = " + num1 * num2);
    case "/":
      return console.log(
        num2 !== 0
          ? num1 + " / " + num2 + " = " + num1 / num2
          : "ПОМИЛКА! На нуль ділити неможна!"
      );
    default:
      return console.log(action, " Помилка! Невірна матиматична дія!");
  }
}

// На основі цього завдання зробіть 3 приклади:
// 1  - Зробіть калькулятор застосовуючи підхід
// Function in function (1-ий приклад Function in function в лекції)
(() => {
  console.log("1.функція в функціі");
  calc(7, 8, "-");
})();

function calc51(a, b, act) {
  function add() {
    return a + b;
  }
  function min() {
    return a - b;
  }
  function mul() {
    return a * b;
  }
  function dil() {
    return a / b;
  }

  switch (act) {
    case "+":
      return add();
    case "-":
      return min();
    case "*":
      return mul();
    case "/":
      return dil();
  }
}
let res = calc51(5, 7, "*");
console.log("1. варіант\n5 * 7 =", res);

//  2 - Зробіть калькулятор застосовуючи підхід
// Function in function (2-ий приклад Function in function в лекції)
console.log("2.функція в функціі 2 варіант");
function add(a, b) {
  return a + b;
}
function min(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function dil(a, b) {
  return a / b;
}

function calc52(a, b, act) {
  switch (act) {
    case "+":
      return add(a, b);
    case "-":
      return min(a, b);
    case "*":
      return mul(a, b);
    case "/":
      return dil(a, b);
  }
}

let a521 = calc52(2, 5, "+");
console.log(a521);

let a522 = calc52(5, 2, "/");
console.log(a522);

//  3 - Зробіть калькулятор використовуючи
// функцію зворотнього виклику (callback function),
console.log("3.функція в функціі 3 callback");

const num111 = function () {
  return 5;
};
const num222 = function () {
  return 7;
};
const sign333 = function () {
  return "*";
};

let a531 = calcCalb53(num111, num222, sign333);
const result = num111() + sign333() + num222() + " = " + a531;
console.log(result);

function calcCalb53(a, b, act) {
  switch (act()) {
    case "+":
      return a() + b();
    case "-":
      return a() - b();
    case "*":
      return a() * b();
    case "/":
      return a() / b();
  }
}
