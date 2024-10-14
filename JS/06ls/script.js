///////////// 1 ///// (Prettier - Code formatter для форматування)
const arr = [
  "Київ",
  "Херсон",
  "Крим",
  "Запоріжжя",
  "Донецьк",
  "Білгород",
  "Львів",
];
// const isIndex = prompt("Введіть назву міста ['Київ', 'Херсон', 'Крим', 'Запоріжжя', 'Донецьк', 'Білгород', 'Львів']");
// let isIndex = "Донецьк"; // хай наприклад буде Херсон
console.log("1. _.-=*<лінійний пошук>*=-._");
console.log(`*<<${arr}>>*`); // повинен показати всі значення масиву, тестую
for (let i = 0; i < arr.length; i++) console.log(i + ": " + arr[i]);
//зробив цикл з декілька міст пошуком з масива в масиві)
let iTest = 0;
const arrTestCities = ["Лондон", "Донецьк", "Інше_місто", "Запоріжжя"];
while (iTest < arrTestCities.length) {
  isIndex = arrTestCities[iTest];
  let i = 0;
  while (i < arr.length) {
    if (isIndex === arr[i]) {
      console.log("Місто ", isIndex, " знаходиться в [", i, "] индексу");
      break;
    }
    i++;
  }
  if (i === arr.length) {
    console.log('Помилка, такого міста: "', isIndex, '" немає');
  }
  iTest++;
}

/////////// 2 ////////////////
console.log("\t\t\t * * *\n2. _.-=*<Бінарний пошук>*=-._");
const arrBin = [
  1, 3, 5, 6, 9, 10, 20, 30, 32, 33, 44, 50, 55, 56, 60, 100, 110,
];
console.log(`масив: ${arrBin}`);
//вивели[індекс]:значення - масив arrBin
let iForIndex = 0;
for (let i of arrBin) {
  console.log(iForIndex + ": " + i);
  iForIndex++;
}
console.log("\t\tБінарний алгоритм пошуку");
const arrFind = [3, 222, 10, 555, 44, 56, 100, 110, 1, 999, 888, 5];
//зробив масив з різними цифрами для пошуку
for (let i of arrFind) {
  console.log("Шукаємо: " + i);
  let start = 0;
  let finish = arrBin.length - 1;
  let middle;
  let countIteration = 0; //скількі ітерацій пошуку пройшло
  let isFind = false; //число знайдено?
  while (start <= finish) {
    countIteration++;
    middle = Math.floor((start + finish) / 2);
    if (i === arrBin[middle]) {
      console.log(
        "Знайшли число " +
          i +
          " за " +
          countIteration +
          " ітерацій на [" +
          middle +
          "] індексі"
      );
      isFind = true; //число знайшли і перевили флаг в true
      break;
    }
    if (i > arrBin[middle]) {
      //тут сама логіка пошуку
      start = middle + 1;
    } else {
      finish = middle - 1;
    }
  }
  if (!isFind) {
    //на випадок, якщо такої цифри немає в бінарному масиві
    console.log("Цифри " + i + " немає в масиві");
  }
}
