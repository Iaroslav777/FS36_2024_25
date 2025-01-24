// Завдання 1Через функцію конструктор створити об'єкт Car з полями:
// name, model, old, price, wheels
// Вивести об'єкт в консоль.
function Car(name, model, old, price, wheels) {
  this.name = name;
  this.model = model;
  this.old = old;
  this.price = price;
  this.wheels = wheels;
}
const myCar = new Car("Tesla", "Model S", 2, 80000, 4);
console.log("\n\nЗавдання 1:\nCar object:", myCar);

// Завдання 2: Через прототип створити власні методи масивів some, every, splice
Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return true;
  }
  return false;
};

Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) return false;
  }
  return true;
};

Array.prototype.mySplice = function (start, deleteCount, ...items) {
  const deletedItems = [];
  for (let i = 0; i < deleteCount; i++) {
    deletedItems.push(this[start]);
    this.splice(start, 1);
  }
  this.splice(start, 0, ...items);
  return deletedItems;
};

// Перевірка методів
const arr = [1, 2, 3, 4];
console.log(
  "\n\nЗавдання 2:\nmySome:",
  arr.mySome((x) => x > 3)
);
console.log(
  "myEvery:",
  arr.myEvery((x) => x > 0)
);

// Завдання 3: Створити об'єкт Dog через функцію конструктор
function Dog(name, model, year, cost) {
  this.name = name;
  this.model = model;
  this.year = year;
  this.cost = cost;
}
const myDog = new Dog("Rex", "Bulldog", 3, 500);
console.log("\n\nЗавдання 3:\nDog object:", myDog);

// Завдання 4: Створити об'єкт Parent через функцію конструктор
function Parent(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
console.log("\n\nЗавдання 4:\n");

Parent.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};
Parent.prototype.work = function () {
  console.log(`${this.name} is working as a ${this.job}`);
};

// Завдання 5: Створити об'єкт Son, унаслідувати поведінку від Parent
console.log("\n\nЗавдання 5:\n");
function Son(name, age, job, hobby) {
  Parent.call(this, name, age, job);
  this.hobby = hobby;
}
Son.prototype = Object.create(Parent.prototype);
Son.prototype.constructor = Son;
Son.prototype.play = function () {
  console.log(`${this.name} is playing ${this.hobby}`);
};
Son.prototype.study = function () {
  console.log(`${this.name} is studying.`);
};

// Перевірка Parent і Son
const parent = new Parent("John", 40, "Engineer");
parent.greet();
parent.work();

const son = new Son("Mike", 20, "Student", "Football");
son.greet();
son.play();
son.study();

// Завдання 6: Створити клас People
class People {
  constructor(name, age, isMarried, isChilds, job) {
    this.name = name;
    this.age = age;
    this.isMarried = isMarried;
    this.isChilds = isChilds;
    this.job = job;
  }
}
const person1 = new People("Anna", 25, false, false, "Designer");
const person2 = new People("Bob", 30, true, true, "Developer");
const person3 = new People("Catherine", 40, true, true, "Doctor");
console.log(person1, person2, person3);

// Завдання 7: Створити клас Tiger
class Tiger {
  constructor(name, kind, age, speed, weight, height) {
    this.name = name;
    this.kind = kind;
    this.age = age;
    this.speed = speed;
    this.weight = weight;
    this.height = height;
  }
  changeName(newName) {
    this.name = newName;
  }
  addAge(years) {
    this.age += years;
  }
  changeSpeed(newSpeed) {
    this.speed = newSpeed;
  }
  run() {
    console.log(`${this.name} is running at ${this.speed} km/h`);
  }
}
const myTiger = new Tiger("Stripes", "Bengal", 5, 60, 200, 90);
console.log(myTiger);
myTiger.changeName("Lightning");
myTiger.addAge(2);
myTiger.changeSpeed(70);
myTiger.run();

// Завдання 8: Перевірити походження об'єктів
console.log(myCar instanceof Car);
console.log(myDog instanceof Dog);
console.log(parent instanceof Parent);
console.log(son instanceof Parent);
console.log(son instanceof Son);
console.log(person1 instanceof People);
console.log(myTiger instanceof Tiger);
console.log(myTiger instanceof Object);
