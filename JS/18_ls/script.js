//ф-ція: кількість раз прописати \n - експеримент)
function n(count) {
  return "\n".repeat(count);
}

//1. Через функцію конструктор створити об'єкт People з полями:
//name, f_name, old, isMarried, hasPossition, children
//Вивести об'єкт в консоль.

console.log(n(3) + "//1. завдання");

function People(name, f_name, old, isMarried, hasPossition, children) {
  this.name = name || "User";
  this.f_name = f_name || "Useroff";
  this.old = old || 25;
  this.isMarried = isMarried || false;
  this.hasPosition = hasPossition || true;
  this.children = children || [];
}

const citizen = new People(
  "Stepan", //зминив
  undefined,
  undefined,
  undefined,
  undefined,
  ["Mary", "John"] //змінив
);
console.log(n(2), citizen);

//////////////////////////////////////////////////////////////////////////////
//2. Через прототайп створити власні методи масивів:
//   filter, find, includes, join, slice
console.log(n(3) + "//2. завдання arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];");

// filter
Array.prototype.filter = function (cb) {
  //в параметр кб-функцію
  const arr = []; //створив пустий масив
  for (let i = 0; i < this.length; i++) {
    //фором пробігся по зис-масиву, котрий фільтруємо
    if (cb(this[i], i, this)) arr.push(this[i]); //якщо умова тру, то добавим єлемент в кінець нового масиву
  }
  return arr; //віддаємо новий відфільтрований масив
};

// find
Array.prototype.find = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

// includes
Array.prototype.includes = function (el) {
  for (let i = 0; i < this.length; i++) {
    if (el === this[i]) return true;
  }
  return false;
};

//join
Array.prototype.join = function (param = ", ") {
  //якщо пустий масив то повернемо ""
  if (!this.length) return "";
  let str = "";
  //цикл до передОстаннього єлемента, щоб рохділовий
  //знак після останнього не ставити
  for (let i = 0; i < this.length - 1; i++) {
    str += this[i];
    str += param;
  }
  //останній елемент масиву добавив в стрічку щоб
  //останнього не було розділового знаку(наприклад ,)
  str += this[this.length - 1];
  return str;
};

//slice
Array.prototype.slice = function (begin = 0, end = this.length) {
  //перевірка:якщо начало чи кінеці будуть меніші чи більші дліні масиву
  if (begin < this.length * -1) begin = 0;
  if (end < this.length * -1) end = 0;
  if (begin < 0) begin = this.length + begin; //-2 це 2 з кінця, наприклад
  if (end < 0) end = this.length + end;
  if (begin > this.length) begin = this.length;
  if (end > this.length) end = this.length;

  const arr = [];
  for (let i = begin; i < end; i++) {
    arr.push(this[i]);
  }
  return arr;
};

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(
  n(2) + "Результати:" + n(2),
  "filter element > 5:\t",
  arr.filter((e) => e > 5), //всі більше 5-ти
  n(2),
  "find 3:\t",
  arr.find((e) => e === 3),
  n(2),
  "includes 2:\t",
  arr.includes(2),
  n(2),
  "join ' - ':\t",
  arr.join(" - "),
  n(2),
  "slice -3:\t",
  arr.slice(-3)
);

//////////////////////////////////////////////////////////////////////////////
//3. Через функцію конструктор створити об'єкт Car з полями:
//name, model, year, isNew, cost, wheels
//Вивести об'єкт в консоль.
console.log(n(3) + "//3. завдання");

function Car(name, model, year, isNew, cost, wheels) {
  this.name = name || "TOYOTA";
  this.model = model || "COROLA";
  this.year = year || 2010;
  this.isNew = isNew || false;
  this.cost = cost || 25000;
  this.wheels = wheels || 4;
}
//змінив в об'єкті ім'я та модель авто
const car = new Car("BMW", "E38");
console.log(car);

//////////////////////////////////////////////////////////////////////////////
//4. Через функцію конструктор створити об'єкт Animal, створити мінімум 3 поля,
// та додати через прототайп поведінку для об'єкту (мінімум 2 методи).
console.log(
  n(3) +
    "//4. завдання. створити об'єкт Animal, створити мінімум 3 поля, 2 методи"
);

function Animal(type, name, age) {
  this.type = type || "animal";
  this.name = name || "N/A";
  this.age = age || 2;
}

Animal.prototype.eat = function () {
  return (
    "Hello, I`m " +
    this.type +
    " my name is " +
    this.name +
    " and I`m eating now."
  );
};

Animal.prototype.sleep = function () {
  return this.name + " is sleeping.";
};

Animal.prototype.run = function () {
  return (
    "Hello, I`m " + this.name + ", me " + this.age + " old and I`m runing."
  );
};

const animal = new Animal();
console.log(animal);
console.log(animal.eat());
console.log(animal.sleep());
console.log(animal.run());

//////////////////////////////////////////////////////////////////////////////
//5. Створити об'єкт Dog, через прототип унаслідувати поведінку від об'єкту Animal
//   та додати власну поведінку (мінімум 2 методи).
console.log(
  n(3) +
    "//5. завдання. Створити об'єкт Dog, унаслідувати" +
    " поведінку від об'єкту Animal, додати 2 методи"
);

function Dog(name, color, age) {
  //підключаю конструктор Анімал, щоб пользуватись полями Анімал через Дог
  Animal.call(this, "dog", name, age);
  //"dog" тому що всі екземпляри будуть типом собакою
  this.color = color || "white";
  //і своє поле колор добавив
}
//унаслідували від Енімал всі методи
Dog.prototype = Object.create(Animal.prototype);
//злитіла силка на Дог після наслідовання від Анімал у встроеному методі (конструктор)
Dog.prototype.constructor = Dog;
//метод сидіти
Dog.prototype.sit = function () {
  return (
    "Hello, I`m " +
    this.color +
    " " +
    //використав поле Анімал (тайп) в методі конструктора Дог
    this.type +
    " " +
    this.name +
    " and I sitting."
  );
};

//метод лежати
Dog.prototype.lieDown = function () {
  return "I`m " + this.color + " " + this.name + " and I`m lie down now.";
};

const dog = new Dog("Charley", 4, "Brown");
console.log(dog);
//методи Анімал в Дог
console.log(dog.eat());
console.log(dog.sleep());
console.log(dog.run());
//власні методи
console.log(dog.sit());
console.log(dog.lieDown());
