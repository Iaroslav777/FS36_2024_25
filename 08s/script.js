//1 Створіть функцію для обчислення факторіалу числа
console.log("1. функція для обчислення факторіалу числа");

const result1 = function calculateFactorial(n) {
  let res = 1;
  for (let i = 1; i <= n; i++) {
    res *= i;
  }
  return res;
};
// let n = +prompt("Введіть число: ");
let n = 5; //120 test
console.log(`факторіал ${n} => ${result1(n)}`);

//2 Підрахунок кількості букв у рядку
console.log("2. Підрахунок кількості букв у рядку");

const countChar = function countSymb(sym) {
  let counter = 0;
  for (let i = 0; i < sym.length; i++) {
    //перевірка на пробілbи, коми крапки, та ! та ?
    if (
      sym[i] !== " " &&
      sym[i] !== "." &&
      sym[i] !== "," &&
      sym[i] !== "!" &&
      sym[i] !== "?"
    )
      counter++;
  }
  return counter;
};

// let word = prompt("Enter word: ");
let word = "Hello word!"; // 9 букв
console.log(`У слові ${word} ${countChar(word)} букв.`);

//3. функція для визначення чи ціле число
console.log("3. функція для визначення чи ціле число");
const isNumInteger = function isInt(number) {
  //int(від Integer) - це ціле число
  let res;
  //number % 1 === 0 -  переввіряємо чи число ціле чи дрібне
  number % 1 === 0 ? (res = true) : (res = false);
  return res;
};
// let num = +prompt("Введіть число ціле чи дрібне: ");
let num = 500; //true
console.log(`Ваше число ${num} ціле? - ${isNumInteger(num)}`);
num = 500.1; // false
console.log(`Ваше число ${num} ціле? - ${isNumInteger(num)}`);

//4. Запит на пароль
function passwordPrompt() {
  let counter = 0; //лічільник скільки раз запуск функціі
  let word1 = ""; //тут першій пароль кладемо
  return function passFunc(key) {
    if (counter === 0) {
      word1 = key;
      counter++;
      return "//4. Запит на пароль\nЩе раз введіть пароль:"; //ret undef
    }
    if (counter === 1) {
      if (word1 === key) {
        return "Успіх!";
      } else return "Невдача!";
    }
  };
}
//тут ми в змінну funcZamikanie кідаем ретурн з функціі passwordPrompt(),
//а ретурн і є ще одна функція passFunc(key)
//так ми спіймали внєшнюю функцію і вона стала лічільником для внутренней ф-ціі passFunc(key),
//по суті ми робимо ссилку на внутрішню ф-цію: passFunc(key){}
let funcZamikanie = passwordPrompt();
let pass = prompt("//4. Запит на пароль\nВведить пароль: ");
const res = funcZamikanie(pass);
pass = prompt(res);
const res2 = funcZamikanie(pass);

console.log(res2);

//5. факторіал чисел в діапазоні
console.log("5. факторіал чисел в діапазоні");
//беру функцію находження факторіала з першого завдання result1 = calculateFactorial(n){};
let start = +prompt("//5. факторіал чисел в діапазоні\nВведіть початок діапазону: ");
let end = +prompt("//5. факторіал чисел в діапазоні\nВкажіть кінець діапазону включно: ");

let faktorialy = {};

for (let i = start; i <= end; i++) {
  faktorialy[i] = result1(i); //беру факторіали та кладу в значення об'єкта
}

console.log(faktorialy);

for (let i in faktorialy) {
  console.log(`${i} = факторіал ${faktorialy[i]}`);
}

//6. Калькулятор
//спробую зробити замиканіями
console.log("6. Калькулятор");

function calc() {
  let num1 = undefined;
  let num2 = undefined;
  let sygn = undefined;
  let res = undefined;
  return function calcRes(i, key) {
    if (i === 1) {
      num1 = key;
      return `перше число: ${num1}\nВведіть друге число:`; //це в консолі текст
    } else if (i === 2) {
      num2 = key;
      return `друге ${num2}\nВведіть знак +-*/`;
    } else if (i === 3) {
      sygn = key;
      switch (sygn) {
        case "+":
          res = num1 + num2;
          break;
        case "-":
          res = num1 - num2;
          break;
        case "*":
          res = num1 * num2;
          break;
        case "/":
          if (num2 === 0) {
            return "на 0 ділити неможна!";
          } else {
            res = num1 / num2;
            break;
          }
        default:
          return `ERROR!!! такого знака ${sygn} нема!`;
      }
    }
    return `Знак${sygn}\nОтвет: ${res}`;
  };
}

const res6 = calc();
console.log(res6(1, +prompt("//6. Калькулятор\nВведіть перше число")));
console.log(res6(2, +prompt("//6. Калькулятор\nВведіть друге число")));
console.log(res6(3, prompt("//6. Калькулятор\nВведіть знак +-*/"))); //в консолі вивод результата
