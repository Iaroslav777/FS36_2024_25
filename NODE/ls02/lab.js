// Лабораторна 2.1 Змінна та верхній регістр
const nameUser = "John";
console.log("1. Name in uppercase:", nameUser.toUpperCase());

// Лабораторна 2.2 Масив та сума через reduce
const numbers = [5, 10, 15];
const sum = numbers.reduce((acc, val) => acc + val, 0);
console.log("2. Sum of array:", sum);

// Лабораторна 2.3 Перевірка на парність
const isEven = (n) => n % 2 === 0;
console.log("3. isEven(2):", isEven(2)); // true
console.log("3. isEven(3):", isEven(3)); // false
console.log("3. isEven(0):", isEven(0)); // true
console.log("3. isEven(-4):", isEven(-4)); // true

// Лабораторна 2.4 Імпорт os та ім'я користувача
const os = require("os");
console.log("4. Username from os.userInfo():", os.userInfo().username);

// Лабораторна 2.5 Працюємо з path
const path = require("path");
const fullPath = path.join(__dirname, "data.txt");
console.log("5. Full path to data.txt:", fullPath);

// Лабораторна 2.6 Читання списку файлів у поточній папці
const fs = require("fs");
const files = fs.readdirSync(".");
console.log("6. Files in current directory:", files);
