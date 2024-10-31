//1. Напишіть цикл forEach, який виводить всі парні числа від 20 до 32.
console.log(`//1 Напишіть цикл forEach,
  який виводить всі парні числа від 20 до 32`);

const arr = Array.from({ length: 13 }, (_, i) => 20 + i);
console.log(arr);

arr.forEach((i) => {
  if (i % 2 === 0) {
    console.log(i);
  }
});

//2Створіть масив зі списком
console.log("//2. Створіть масив зі списком");

const arr2 = ["Apple", "Green", "Viktory", 47, 44];
arr2.forEach((i) => {
  console.log(i + " = " + typeof i);
});

//3. Напишіть цикл який виводить всі непарні числа від 17 до 39
console.log("//3. arr виводить всі непарні числа від 17 до 39");

const arr3 = Array.from({ length: 39 - 17 + 1 }, (_, i) => i + 17);
arr3.forEach((i) => {
  if (i % 2 !== 0) {
    console.log(i);
  }
});

//4. Даний масив, виведіть парні елементи
//[1, 5, true, 'hello', false, null, 'iiii', 54, null]
console.log(
  "//4. виведіть парні\n[1, 5, true, 'hello', false, null, 'iiii', 54, null]"
);

const arr4 = [1, 5, true, "hello", false, null, "iiii", 54, null];
arr4.forEach((el, i) => {
  if (i % 2 !== 0) {
    console.log(el);
  }
});

//5. Даний масив, виведіть НЕ парні елементи
//[1, 5, true, 'hello', false, null, 'iiii', 54, null]
console.log(
  "\n//5. виведіть НЕ парні\n[1, 5, true, 'hello', false, null, 'iiii', 54, null]"
);

const arr5 = [1, 5, true, "hello", false, null, "iiii", 54, null];
arr5.forEach((el, i) => {
  if (i % 2 === 0) {
    console.log(el);
  }
});

//6. Виведіть суму всіх  елементів масиву
//[1, 2, 4, 2, 3, 55, 66, 777, 12]// sum is922
console.log(
  "\n//6. Виведіть суму всіх ел. масиву\n[1, 2, 4, 2, 3, 55, 66, 777, 12]"
);
let sum = 0;
const arr6 = [1, 2, 4, 2, 3, 55, 66, 777, 12];
arr6.forEach((el) => {
  sum += el;
});
console.log("Сума = " + sum);

//7. Перемножити та вивести всі елементи масиву
//[1, 2, 4, 2, 3, 5, 6, 7, 1]
console.log(
  "\n//7. Перемножити та вивести всі елементи масиву\n[1, 2, 4, 2, 3, 5, 6, 7, 1] "
);
let umn = 1;
const arr7 = [1, 2, 4, 2, 3, 5, 6, 7, 1];
arr7.forEach((el) => {
  console.log(el);
  umn *= el;
});
console.log("Результат множення = " + umn, arr7);

//8. Створіть prompt в якому потрібно проітерувати число з 0.
//Якщо це числа 5, 6, 7, 8, 9, 10 то пропустити ітерацію.
//Якщо це числа 100 і більше, завершити ітерацію.

console.log("8. Створіть prompt в якому потрібно проітерувати число з 0");

//введемо наприклад 123
const num8 = 123; //+prompt("Введіть число:");
//зробив масив з числами від 0 до вказаного включно
let arr8 = [];
let iter = 0;
while (iter <= num8) {
  arr8[iter] = iter;
  iter++;
}

arr8.forEach((el) => {
  if (el >= 100) return;
  if (el >= 5 && el <= 10) return;
  console.log(el);
});

///////////////////////// = = * Використовуємо Math = = ////////////////////////
////////////////////////////////////////////////////////////////////////////////

//9. Створіть функцію яка приймає дробове значення
//   (наприклад 1.34 чи 55.43),
//   та заокруглює його до меншого числа і повертає значення.

console.log("\n//9. ф-ція заокруглює в меньшу сторону");
let num9 = 55.99;

const res9 = ((e) => {
  console.log("Було: ", e);
  e = Math.floor(e);
  return e;
})(num9);
console.log("Стало:", res9);

//10. Створіть функцію яка приймає дробове значення
//   (наприклад 1.34 чи 55.43),
//   та заокруглює його до Більшого числа і повертає значення.

console.log("\n//10. ф-ція заокруглює в БІЛЬШУ сторону");
let num10 = 33.123;

const res10 = ((e) => {
  console.log("Було: ", e);
  e = Math.ceil(e);
  return e;
})(num10);
console.log("Стало:", res10);

//11. функцію яка генерує рандомне число
//    (випадкове) від 0 до 1000 і повертає його

console.log("\n//11. ф-ція генерує рандомне 0-1000 і повертає");
function rand10() {
  return Math.floor(Math.random() * 1001);
  //*1001 =>  від 0 до 1000 включно, якщо множити на 1000, то буде діапаззон 0-999
}
const res11_1 = rand10();
const res11_2 = rand10();
const res11_3 = rand10();

console.log(res11_1);
console.log(res11_2);
console.log(res11_3);

//12. Створіть функцію яка приймає 2 числа
// та виодить степіть перше число основне, друге сама степіть.
console.log("\n//12 func => num1 ** num2 ");

const n12 = 5;
const stup = 7;

((e, s) => console.log(e + " ^ " + s + " = " + e ** s))(n12, stup);

//13.  13. Створіть функцію яка приймає число,
// виводить з нього корінь, заокруглює його і повертає.
console.log("\n//13 func виводить з нього корінь, заокруглює його і повертає");
const n13 = 777; //(округлили(взяли_корінь(числа)))(передали число); <- та запустили ф.
const r13 = ((n) => Math.round(Math.sqrt(n)))(n13);
console.log("sqrt of ", n13, " is ", r13);

///////////////////////////// * Використовувати методи масивів /////////////////////
////////////////////////////////////////////////////////////////////////////////////

//14. Дано масив [1, 5, true], додати в кінець масиву 'Hello'
console.log("\n//14. Дано масив [1, 5, true] \nдодати в кінець масиву 'Hello'");

let arr14 = [1, 5, true];
arr14.push("Hello");
console.log(arr14);

//15. Дано масив [1, 5, true], додати в початок масиву 'HelloArray'
console.log(
  "\n//15. Дано масив [1, 5, true] \nдодати в початок масиву 'HelloArray'"
);
let arr15 = [1, 5, true];
arr15.unshift("HelloArray");
console.log(arr15);

//16. Дано масив [1, 5, true], видалити останній елемент з масиву
console.log("\n//16. [1, 5, true] видалити останній");
let arr16 = [1, 5, true];
arr16.pop();
console.log(arr16);

//17. Дано масив [1, 5, true], видалити перший
console.log("\n//17. [1, 5, true] видалити перший");
let arr17 = [1, 5, true];
arr17.shift();
console.log(arr17);

//18 [5, true, 'hello', false, null, 5] вирізати *в новий масив* з 1 по 5 індекс
console.log("\n//18. [5, true, 'hello', false, null, 5]");
let arr18 = [5, true, "hello", false, null, 5];
let newArr18 = arr18.slice(1, 6);
console.log("oldAdd", arr18);
console.log("newAdd", newArr18);

//19. [5, true, 'hello', false, null, 50] вирізати з 1 по 5 індекс дані
console.log(
  "\n//19. [5, true, 'hello', false, null, 50]\nвирізати з 1 по 5 індекс дані"
);
let arr19 = [5, true, "hello", false, null, 50];
arr19.splice(1, 6);
console.log("Модифікований оригінальний масив: ", arr19);

//20. Дано масив [5, true, 'hello', false, null, 50]
//    вирізати з 1 по 5 індекс та вставити 10, 100, 111, 222
console.log("\n//20. [5, true, 'hello', false, null, 50]");
let arr20 = [5, true, "hello", false, null, 50];
arr20.splice(1, 6, 10, 100, 111, 222);
console.log("Модифікований оригінальний масив:\n", arr20);

//21. Створені масиви під час виконанняцього завдання
//    об'єднайте в рядок, а потім назад приведіть рядок в масив.

//1
const str1 = arr.join("-");
console.log("\n//1 Array to Str\n", str1);
const tempArr1 = str1.split("-");
console.log("Str to Array", tempArr1);

//2
const str2 = arr2.join("-");
console.log("\n//2 Array to Str\n", str2);
const tempArr2 = str2.split("-");
console.log("Str to Array", tempArr2);

//3
const str3 = arr3.join("-");
console.log("\n//3 Array to Str\n", str3);
const tempArr3 = str3.split("-");
console.log("Str to Array", tempArr3);

//4
const str4 = arr4.join("-");
console.log("\n//4 Array to Str\n", str4);
const tempArr4 = str4.split("-");
console.log("Str to Array", tempArr4);

//5
const str5 = arr5.join("-");
console.log("\n//5 Array to Str\n", str5);
const tempArr5 = str5.split("-");
console.log("Str to Array", tempArr5);

//6
const str6 = arr6.join("-");
console.log("\n//6 Array to Str\n", str6);
const tempArr6 = str6.split("-");
console.log("Str to Array", tempArr6);

//7
const str7 = arr7.join("-");
console.log("\n//7 Array to Str\n", str7);
const tempArr7 = str7.split("-");
console.log("Str to Array", tempArr7);

//8
const str8 = arr8.join("-");
console.log("\n//8 Array to Str\n", str8);
const tempArr8 = str8.split("-");
console.log("Str to Array", tempArr8);

//14
const str14 = arr14.join("-");
console.log("\n//14 Array to Str\n", str14);
const tempArr14 = str14.split("-");
console.log("Str to Array", tempArr14);

//15
const str15 = arr15.join("-");
console.log("\n//15 Array to Str\n", str15);
const tempArr15 = str15.split("-");
console.log("Str to Array", tempArr15);

//16
const str16 = arr16.join("-");
console.log("\n//16Array to Str\n", str16);
const tempArr16 = str16.split("-");
console.log("Str to Array", tempArr16);

//17
const str17 = arr17.join("-");
console.log("\n//17 Array to Str\n", str17);
const tempArr17 = str14.split("-");
console.log("Str to Array", tempArr17);

//18
const str18 = newArr18.join("-");
console.log("\n//18 Array to Str\n", str18);
const tempArr18 = str18.split("-");
console.log("Str to Array", tempArr18);

//19
const str19 = arr14.join("-");
console.log("\n//19 Array to Str\n", str19);
const tempArr19 = str19.split("-");
console.log("Str to Array", tempArr19);

//20
const str20 = arr20.join("-");
console.log("\n//20 Array to Str\n", str20);
const tempArr20 = str20.split("-");
console.log("Str to Array", tempArr20);
