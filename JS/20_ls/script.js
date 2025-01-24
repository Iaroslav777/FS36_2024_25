// Завдання 1: Через клас створити об'єкт People
class People {
  constructor(name, f_name, old, isMarried, hasPossition, children) {
    this.name = name;
    this.f_name = f_name;
    this.old = old;
    this.isMarried = isMarried;
    this.hasPossition = hasPossition;
    this.children = children;
  }
}
const person = new People("John", "Doe", 30, true, "Developer", [
  "Alice",
  "Bob",
]);
console.log("People object:", person);

// Завдання 2: Через клас shortWork створити методи масивів
class shortWork {
  static filter(array, callback) {
    return array.filter(callback);
  }
  static find(array, callback) {
    return array.find(callback);
  }
  static includes(array, value) {
    return array.includes(value);
  }
  static join(array, separator) {
    return array.join(separator);
  }
  static slice(array, start, end) {
    return array.slice(start, end);
  }
}

// Перевірка методів
const arr = [1, 2, 3, 4, 5];
console.log(
  "filter:",
  shortWork.filter(arr, (x) => x > 2)
);
console.log(
  "find:",
  shortWork.find(arr, (x) => x === 3)
);
console.log("includes:", shortWork.includes(arr, 4));
console.log("join:", shortWork.join(arr, "-"));
console.log("slice:", shortWork.slice(arr, 1, 4));

// Завдання 3: Через клас створити об'єкт Car
class Car {
  constructor(name, model, year, isNew, cost, wheels) {
    this.name = name;
    this.model = model;
    this.year = year;
    this.isNew = isNew;
    this.cost = cost;
    this.wheels = wheels;
  }
}
const car = new Car("Tesla", "Model X", 2023, true, 90000, 4);
console.log("Car object:", car);

// Завдання 4: Через клас створити об'єкт Animal
class Animal {
  constructor(name, species, habitat) {
    this.name = name;
    this.species = species;
    this.habitat = habitat;
  }
}
Animal.prototype.eat = function () {
  console.log(`${this.name} is eating.`);
};
Animal.prototype.sleep = function () {
  console.log(`${this.name} is sleeping.`);
};

// Перевірка
const animal = new Animal("Lion", "Mammal", "Savanna");
animal.eat();
animal.sleep();

// Завдання 5: Створити клас Dog, наслідування від Animal
class Dog extends Animal {
  constructor(name, species, habitat, breed) {
    super(name, species, habitat);
    this.breed = breed;
  }
  bark() {
    console.log(`${this.name} is barking.`);
  }
  fetch() {
    console.log(`${this.name} is fetching the ball.`);
  }
}

// Перевірка
const dog = new Dog("Buddy", "Mammal", "House", "Golden Retriever");
dog.eat();
dog.bark();
dog.fetch();

// Завдання 6: Створити клас Poli
class Poli {
  static description() {
    console.log(
      "Поліморфізм дозволяє об'єктам різних класів реагувати на одні й ті самі методи по-різному."
    );
  }
}
Poli.description();

// Завдання 7: Приклад поліморфізму
class Shape {
  area() {
    return 0;
  }
}
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}
const shapes = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach((shape) => console.log("Area:", shape.area()));

// Завдання 8: Створити клас Inc
class Inc {
  static description() {
    console.log(
      "Інкапсуляція дозволяє приховувати деталі реалізації об'єкта та надавати доступ лише до необхідних частин."
    );
  }
}
Inc.description();

// Завдання 9: Створити клас Калькулятор
class Calculator {
  constructor() {
    this._result = 0;
    this.date = new Date();
    this.startTime = null;
    this.endTime = null;
  }

  get result() {
    return this._result;
  }

  set result(value) {
    this._result = value;
    this.updateDate();
  }

  // Метод для початку роботи (запуск таймера)
  startTimer() {
    this.startTime = Date.now(); // Записуємо поточний час
  }

  // Метод для завершення роботи (завершення таймера)
  endTimer() {
    this.endTime = Date.now(); // Записуємо час завершення
    const elapsed = this.endTime - this.startTime; // Різниця в мілісекундах
    console.log(`Час виконання всіх операцій: ${elapsed} мс`);
  }

  // Арифметичні операції
  add(num) {
    this._result += num;
    this.updateDate();
    return this._result;
  }

  subtract(num) {
    this._result -= num;
    this.updateDate();
  }

  multiply(num) {
    this._result *= num;
    this.updateDate();
    return this._result;
  }

  divide(num) {
    if (num !== 0) {
      this._result /= num;
    } else {
      console.error("Cannot divide by zero.");
    }
    this.updateDate();
  }

  power(exp) {
    this._result = this._result ** exp;
    this.updateDate();
  }

  factorial() {
    const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
    this._result = fact(this._result);
    this.updateDate();
  }

  sqrt() {
    this._result = Math.sqrt(this._result);
    this.updateDate();
  }

  // Оновлюємо дату використання
  updateDate() {
    this.date = new Date();
  }
}

// Перевірка калькулятора з вимірюванням часу
const calc = new Calculator();
calc.startTimer(); // Запускаємо таймер
console.log("add:", calc.add(10));
// calc.add(10);
console.log("add:", calc.multiply(2));
// calc.multiply(2);
calc.subtract(5);
calc.factorial();
calc.sqrt();
calc.endTimer(); // Завершуємо таймер і виводимо час

console.log("Calculator result:", calc.result);
console.log("Last updated:", calc.date);
