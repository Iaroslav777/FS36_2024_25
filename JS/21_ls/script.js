//Уровень 3.1 задачника JavaScript
//1 Дано некоторое число. Проверьте, что цифры этого числа расположены по возрастанию.
let num = 123456;
let isA = num
  .toString()
  .split("")
  .every((digit, index, arr) => index === 0 || digit >= arr[index - 1]);

if (isA) {
  console.log("Цифры числа расположены по возрастанию");
} else {
  console.log("Цифры числа не расположены по возрастанию");
}

//№2

//Дан массив:

//[1, '', 2, 3, '', 5]
//Удалите из массива все пустые строки.

let arr32 = [1, "", 2, 3, "", 5];
arr32 = arr32.filter((elem) => elem !== "");
console.log(arr32);

//№3
//Дан массив:

// [
// 	[2, 1, 4, 3, 5],
// 	[3, 5, 2, 4, 1],
// 	[4, 3, 1, 5, 2],
// ]
// Отсортируйте элементы в каждом подмассиве.

let arr33 = [
  [2, 1, 4, 3, 5],
  [3, 5, 2, 4, 1],
  [4, 3, 1, 5, 2],
];
arr33 = arr33.map((subArray) => subArray.sort((a, b) => a - b));
console.log(arr33);

// №4

// Даны два массива:

// let arr1 = [1, 2, 3];
// let arr2 = [1, 2, 3, 4, 5];
// Удалите из большего массива лишние элементы с конца так, чтобы длины массивов стали одинаковыми.

let arr1_36 = [1, 2, 3];
let arr2_36 = [1, 2, 3, 4, 5];

// Знаходимо мінімальну довжину масивів
let minLength = Math.min(arr1_36.length, arr2_36.length);

// Обрізаємо зайві елементи в обох масивах
arr1_36.length = minLength;
arr2_36.length = minLength;

console.log(arr1_36);
console.log(arr2_36);

//Уровень 3.2 задачника JavaScript
// №1
//Выведите в консоль все числа в промежутке от 10 до 1000,
// у которых предпоследняя цифра четная.

for (let i = 10; i <= 50; i++) {
  if (Math.floor(i / 10) % 2 === 0) {
    console.log(i);
  }
}
console.log("_________________________");
for (let i = 950; i <= 1000; i++) {
  if (Math.floor(i / 10) % 2 === 0) {
    console.log(i);
  }
}

//Завдання 2:
//Видалити кожен п'ятий елемент із масиву.

let arr41 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr41 = arr41.filter((elem, index) => (index + 1) % 5 !== 0);
console.log(arr41);

//Завдання 3: Створити рядок із нулів відповідно до числа.
let num42 = 5;
let str42 = "0".repeat(num42);
console.log(str42);

//Завдання 4: Видалити кожне друге слово з рядка.
let str43 = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
let arr43 = str43.split(" ");
arr43 = arr43.filter((elem, index) => (index + 1) % 2 !== 0);
str43 = arr43.join(" ");
console.log(str43);

//Завдання 5:
// Дан массив:

// [
// 	[1, 2, 3],
// 	[4, 5, 6],
// 	[7, 8, 9],
// ]
// Найдите сумму элементов этого массива.

let arr45 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
let sum = arr45.flat().reduce((acc, num) => acc + num, 0);
console.log(sum);

//
//Уровень 3.3 задачника JavaScript

//Завдання 1:
//Дан массив со словами. Удалите из него слова,
// состоящие более чем из трех символов.

let arr51 = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipisicing",
  "elit",
];
arr51 = arr51.filter((elem) => elem.length <= 3);
console.log(arr51);

//Завдання 2:
// Дано некоторое число:

// 1357
// Проверьте, что все цифры этого числа являются нечетными.

let num52 = 1357;
let isOdd = num52
  .toString()
  .split("")
  .every((digit) => parseInt(digit) % 2 !== 0);
if (isOdd) {
  console.log("Все цифры числа нечетные");
} else {
  console.log("Не все цифры числа нечетные");
}

//Завдання 3:
// Дано некоторое слово:

// 'abcba'
// Проверьте, что это слово читается одинаково с любой стороны.

let str53 = "abcba";
let isPalindrome = str53 === str53.split("").reverse().join("");
if (isPalindrome) {
  console.log("Слово является палиндромом");
} else {
  console.log("Слово не является палиндромом");
}

//Завдання 4:
// Дан массив:

// [
// 	[
// 		[11, 12, 13],
// 		[14, 15, 16],
// 		[17, 17, 19],
// 	],
// 	[
// 		[21, 22, 23],
// 		[24, 25, 26],
// 		[27, 27, 29],
// 	],
// 	[
// 		[31, 32, 33],
// 		[34, 35, 36],
// 		[37, 37, 39],
// 	],
// ]
// Найдите сумму элементов этого массива.

let arr54 = [
  [
    [11, 12, 13],
    [14, 15, 16],
    [17, 17, 19],
  ],
  [
    [21, 22, 23],
    [24, 25, 26],
    [27, 27, 29],
  ],
  [
    [31, 32, 33],
    [34, 35, 36],
    [37, 37, 39],
  ],
];
let sum54 = arr54.flat(2).reduce((acc, num) => acc + num, 0);
console.log(sum54);

//Уровень 3.4 задачника JavaScript
// №1
// Выведите в консоль все числа
// в промежутке от 10 до 1000, у которых первая цифра четная.

for (let i = 10; i <= 1000; i++) {
  let firstDigit = parseInt(i.toString()[0]);
  if (firstDigit % 2 === 0) {
    console.log(i);
  }
}

//№2

// Дан некоторый массив, например, вот такой:

// [1, 2, 3, 4, 5, 6]
// Поменяйте местами пары элементов этого массива:

// [2, 1, 4, 3, 6, 5]

let arr61 = [1, 2, 3, 4, 5, 6];

for (let i = 0; i < arr61.length - 1; i += 2) {
  // Міняємо місцями сусідні елементи
  [arr61[i], arr61[i + 1]] = [arr61[i + 1], arr61[i]];
}

console.log(arr61);

//№3
// Дан следующий объект:

// let obj = {
// 	1: {
// 		1: 11,
// 		2: 12,
// 		3: 13,
// 	},
// 	2: {
// 		1: 21,
// 		2: 22,
// 		3: 23,
// 	},
// 	3: {
// 		1: 24,
// 		2: 25,
// 		3: 26,
// 	},
// }
// Найдите сумму элементов этого объекта.

let obj62 = {
  1: {
    1: 11,
    2: 12,
    3: 13,
  },
  2: {
    1: 21,
    2: 22,
    3: 23,
  },
  3: {
    1: 24,
    2: 25,
    3: 26,
  },
};
let sum62 = Object.values(obj62).reduce((total, subObj) => {
  return (
    total + Object.values(subObj).reduce((subTotal, num) => subTotal + num, 0)
  );
}, 0);

console.log(sum62);

// Уровень 3.5 задачника JavaScript
// №1

// Дан текст со словами. Запишите в массив все слова, начинающиеся на букву 'a'.

let text71 = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
let arr71 = text71.split(" ").filter((word) => word[0].toLowerCase() === "a");
console.log(arr71);

// №2
// Дан массив с числами. Оставьте в нем только те числа, которые делятся на 5.

let arr72 = [1, 4, 5, 7, 10, 11, 15, 20, 25, 30];
arr72 = arr72.filter((num) => num % 5 === 0);
console.log(arr72);

// №3
// Дан массив с числами. Оставьте в нем
// только те числа, которые содержат цифру ноль.

let arr73 = [1, 4, 5, 7, 10, 11, 15, 20, 25, 30];
arr73 = arr73.filter((num) => num.toString().includes("0"));
console.log(arr73);

// №4
// Дан массив со числами. Проверьте, что
// в нем есть число, содержащее в себе цифру 3.

let arr74 = [1, 4, 5, 7, 10, 11, 15, 20, 25, 30];
let hasThree = arr74.some((num) => num.toString().includes("3"));
if (hasThree) {
  console.log("Массив содержит число c цифрой 3");
} else {
  console.log("Массив не содержит число с цифрой 3");
}

// №5
// Дано некоторое число:

// 35142
// Отсортируйте цифры этого числа. В нашем случае должно получится следующее:

// 12345

let num75 = 35142;
let sortedNum = parseInt(num75.toString().split("").sort().join(""));
console.log(sortedNum);

// №6

// Напишите программу, которая сформирует следующую строку:

// '-1-2-3-4-5-'

let str76 = Array.from({ length: 5 }, (_, i) => i + 1).join("-");
str76 = "-" + str76 + "-";
console.log(str76);

// №7
// Дан следующий объект:

// let obj = {
// 	1: {
// 		1: {
// 			1: 111,
// 			2: 112,
// 			3: 113,
// 		},
// 		2: {
// 			1: 121,
// 			2: 122,
// 			3: 123,
// 		},
// 	},
// 	2: {
// 		1: {
// 			1: 211,
// 			2: 212,
// 			3: 213,
// 		},
// 		2: {
// 			1: 221,
// 			2: 222,
// 			3: 223,
// 		},
// 	},
// 	3: {
// 		1: {
// 			1: 311,
// 			2: 312,
// 			3: 313,
// 		},
// 		2: {
// 			1: 321,
// 			2: 322,
// 			3: 323,
// 		},
// 	},
// }
// Найдите сумму элементов этого объекта.

let obj77 = {
  1: {
    1: {
      1: 111,
      2: 112,
      3: 113,
    },
    2: {
      1: 121,
      2: 122,
      3: 123,
    },
  },
  2: {
    1: {
      1: 211,
      2: 212,
      3: 213,
    },
    2: {
      1: 221,
      2: 222,
      3: 223,
    },
  },
  3: {
    1: {
      1: 311,
      2: 312,
      3: 313,
    },
    2: {
      1: 321,
      2: 322,
      3: 323,
    },
  },
};
let sum77 = Object.values(obj77).reduce((total, subObj) => {
  return (
    total +
    Object.values(subObj).reduce((subTotal, subSubObj) => {
      return (
        subTotal +
        Object.values(subSubObj).reduce((subSubTotal, num) => {
          return subSubTotal + num;
        }, 0)
      );
    }, 0)
  );
}, 0);
console.log(sum77);

//Уровень 3.6 задачника JavaScript
// №1

// Дан массив со числами. Удалите из него числа, состоящие более чем из трех цифр.

let arr81 = [1, 12, 123, 1234, 12345, 123456];
arr81 = arr81.filter((num) => num.toString().length <= 3);
console.log(arr81);

// №2
// Дано число, например, вот такое:

// let num = 12345;
// Проверьте, что все цифры этого числа больше нуля.

let num82 = 12345;
let isPositive = num82
  .toString()
  .split("")
  .every((digit) => parseInt(digit) > 0);
if (isPositive) {
  console.log("Все цифры числа больше нуля");
} else {
  console.log("Не все цифры числа больше нуля");
}

// №3
// Дан некоторый массив, например, вот такой:

// [123, 456, 789]
// Слейте все элементы этого массива в один массив, разбив их посимвольно:

// [1, 2, 3, 4, 5, 6, 7, 8, 9]

let arr83 = [123, 456, 789];
arr83 = arr83
  .map((num) => num.toString().split(""))
  .flat()
  .map((num) => parseInt(num));
console.log(arr83);

// №4
// Дан следующая структура:

// let data = [
// 	{
// 		1: 11,
// 		2: 12,
// 		3: 13,
// 	},
// 	{
// 		1: 21,
// 		2: 22,
// 		3: 23,
// 	},
// 	{
// 		1: 24,
// 		2: 25,
// 		3: 26,
// 	},
// ];
// Найдите сумму элементов этой структуры.

let data84 = [
  {
    1: 11,
    2: 12,
    3: 13,
  },
  {
    1: 21,
    2: 22,
    3: 23,
  },
  {
    1: 24,
    2: 25,
    3: 26,
  },
];
let sum84 = data84.reduce((total, obj) => {
  return (
    total + Object.values(obj).reduce((subTotal, num) => subTotal + num, 0)
  );
}, 0);
console.log(sum84);

// Уровень 3.7 задачника JavaScript
// №1

// Дана строка со словами. Отсортируйте слова в алфавитном порядке.

let str91 = "lorem ipsum dolor sit amet consectetur adipisicing elit.";
let arr91 = str91.split(" ").sort();
str91 = arr91.join(" ");
console.log(str91);

// №2 Дано число. Получите массив делителей этого числа.
let num92 = 28;
let divisors = [];
for (let i = 1; i <= num92; i++) {
  if (num92 % i === 0) {
    divisors.push(i);
  }
}
console.log(divisors);

// №3
// Даны два числа. Получите массив общих делителей этих чисел.

let num93_1 = 28;
let num93_2 = 35;
let cDiv = [];
for (let i = 1; i <= Math.min(num93_1, num93_2); i++) {
  if (num93_1 % i === 0 && num93_2 % i === 0) {
    cDiv.push(i);
  }
}
console.log(cDiv);

// №4
// Дано число. Проверьте, что у этого числа есть
// только один делитель, кроме него самого и единицы.

let num94 = 17;
let div94 = [];
for (let i = 1; i <= num94; i++) {
  if (num94 % i === 0) {
    div94.push(i);
  }
}
if (div94.length === 2) {
  console.log("Число простое");
} else {
  console.log("Число не простое");
}

// №5

// Через запятую написаны числа. Получите максимальное из этих чисел.

let str95 = "1, 2, 3, 4, 5, 6, 7, 8, 9, 10";
let max95 = Math.max(...str95.split(", ").map((num) => parseInt(num)));
console.log(max95);

// let str95 = "1,2,3,4,5,6,7,8,9,10";
// let max95 = Math.max(...str95.split(",").map(Number));
// console.log(max95);

// №6

// Дан массив с числами. После каждого однозначного числа вставьте еще такое же.

let arr96 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr96 = arr96.flatMap((num) => (num < 10 ? [num, num] : num));
console.log(arr96);

// №7

// Дана строка. Удалите из нее все гласные буквы.

let str97 = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
str97 = str97.replace(/[aeiouy]/gi, "");
console.log(str97);

// №8

// Дана строка. Сделайте заглавной последнюю букву каждого слова в этой строке.

let str98 = "lorem ipsum dolor sit amet consectetur adipisicing elit.";
str98 = str98.replace(/\b\w+\b/g, (word) => {
  return word.slice(0, -1) + word.slice(-1).toUpperCase();
});
console.log(str98);

// №9

// Дан следующая структура:

// let data = [
// 	{
// 		1: [1, 2, 3],
// 		2: [1, 2, 3],
// 		3: [1, 2, 3],
// 	},
// 	{
// 		1: [1, 2, 3],
// 		2: [1, 2, 3],
// 		3: [1, 2, 3],
// 	},
// 	{
// 		1: [1, 2, 3],
// 		2: [1, 2, 3],
// 		3: [1, 2, 3],
// 	},
// ];
// Найдите сумму элементов этой структуры.

let data99 = [
  {
    1: [1, 2, 3],
    2: [1, 2, 3],
    3: [1, 2, 3],
  },
  {
    1: [1, 2, 3],
    2: [1, 2, 3],
    3: [1, 2, 3],
  },
  {
    1: [1, 2, 3],
    2: [1, 2, 3],
    3: [1, 2, 3],
  },
];
let sum99 = data99.reduce((total, obj) => {
  return (
    total +
    Object.values(obj).reduce((subTotal, arr) => {
      return subTotal + arr.reduce((subSubTotal, num) => subSubTotal + num, 0);
    }, 0)
  );
}, 0);
console.log(sum99);

// Уровень 3.8 задачника JavaScript
// №1

// Дан массив со числами. Проверьте,
//  что все числа из этого массива содержат в себе цифру 3.

let arr101 = [13, 23, 32, 43, 50, 63, 77, 83, 96];
let hasThree101 = arr101.every((num) => num.toString().includes("3"));
if (hasThree101) {
  console.log("Все числа содержат цифру 3");
} else {
  console.log("Не все числа содержат цифру 3");
}

// №2
// Дана строка в формате:

// 'kebab-case'
// Преобразуйте ее в формат:

// 'snake_case'

let str102 = "kebab-case";
str102 = str102.replace(/-/g, "_");
console.log(str102);

// №3

// Дана строка в формате:

// 'snake_case'
// Преобразуйте ее в формат:

// 'camelCase'

let str103 = "snake_case";
str103 = str103.replace(/_./g, (match) => match[1].toUpperCase());
console.log(str103);

// №4
// Дана строка в формате:

// 'camelCase'
// Преобразуйте ее в формат:

// 'snake_case'

let str104 = "camelCase";
str104 = str104.replace(/[A-Z]/g, (match) => "_" + match.toLowerCase());
console.log(str104);

// №5
// Сформируйте с помощью циклов следующий массив:

// [
// 	[1, 2, 3],
// 	[1, 2, 3],
// 	[1, 2, 3],
// 	[1, 2, 3],
// 	[1, 2, 3],
// ]

let arr105 = Array.from({ length: 5 }, () =>
  Array.from({ length: 3 }, (_, i) => i + 1)
);
console.log(arr105);
// let arr105 = [];
// for (let i = 0; i < 5; i++) {
//   let innerArray = [];
//   for (let j = 1; j <= 3; j++) {
//     innerArray.push(j);
//   }
//   arr105.push(innerArray);
// }
// console.log(arr105);

// Уровень 3.9 задачника JavaScript
// №1

// Дана строка. Проверьте, что эта строка состоит только из цифр.

let str111 = "123a45";
let isDigits = /^\d+$/.test(str111);
if (isDigits) {
  console.log("Строка состоит только из цифр");
} else {
  console.log("Строка не состоит только из цифр");
}

// №2

// Дана строка. Проверьте, что эта строка состоит только из четных цифр.

let str112 = "24680";
let isEvenDigits = /^[02468]+$/.test(str112);
if (isEvenDigits) {
  console.log("Строка состоит только из четных цифр");
} else {
  console.log("Строка не состоит только из четных цифр");
}

// №3

// Дан массив со числами. Удалите из него числа, имеющие два и более нуля.

let arr113 = [100, 200, 300, 1, 2000, 30];
arr113 = arr113.filter((num) => num.toString().split("0").length - 1 < 2);
console.log(arr113);

// №4

// Найдите все числа от 1 до 1000, сумма цифр которых равна 13.

let nums114 = [];
for (let i = 1; i <= 1000; i++) {
  let sum = i
    .toString()
    .split("")
    .reduce((acc, num) => acc + parseInt(num), 0);
  if (sum === 13) {
    nums114.push(i);
  }
}

console.log(nums114);

// №5

// Сформируйте с помощью циклов следующий массив:

// [
// 	[1, 2, 3],
// 	[4, 5, 6],
// 	[7, 8, 9],
// ]

let arr115 = Array.from({ length: 3 }, (_, i) =>
  Array.from({ length: 3 }, (_, j) => i * 3 + j + 1)
);

console.log(arr115);

// Уровень 3.10 задачника JavaScript
// №1

// Дан массив. Сделайте так, чтобы в нем каждый элемент повторился два раза.

let arr121 = [1, 2, 3, 4, 5];
arr121 = arr121.flatMap((num) => [num, num]);
console.log(arr121);

// №2

// Дан массив и число. Оставьте в массиве только
// те числа, которые являются делителями заданного числа.

let arr122 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let num122 = 6;
arr122 = arr122.filter((elem) => num122 % elem === 0);
console.log(arr122);

// №3

// Даны два числа. Получите массив цифр,
// которые есть и в одном, и во втором числе.

let num123_1 = 6123458;
let num123_2 = 543219;

let digits1 = num123_1.toString().split("");
let digits2 = num123_2.toString().split("");

let commonDigits = digits1.filter((digit) => digits2.includes(digit));
console.log([...new Set(commonDigits)]);

// №4

// Дано число. Получите массив позицией всех
//  цифр 3 в этом числе, за исключением первой и последней.

let num124 = 12345367893;

let positions = num124
  .toString()
  .split("")
  .map((digit, index, arr) =>
    digit === "3" && index !== 0 && index !== arr.length - 1 ? index : null
  )
  .filter((pos) => pos !== null);

console.log(positions);

// №5

// Дан массив со числами. Оставьте в нем числа,
//  состоящие из разных цифр, а остальные удалите.

let arr125 = [123, 456, 789, 111, 222, 333];
arr125 = arr125.filter(
  (num) => new Set(num.toString()).size === num.toString().length
);
console.log(arr125);

// №6

// Дан массив:

// [
// 	[1, 2, 3],
// 	[4, 5, 6],
// 	[7, 8, 9],
// ]
// Слейте элементы этого массива в один одномерный массив:

// [1, 2, 3, 4, 5, 6, 7, 8, 9]

let arr126 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
arr126 = arr126.flat();
console.log(arr126);