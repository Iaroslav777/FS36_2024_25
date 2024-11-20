let obj3 = {
  key1: 111,
  key2: "222",
  key3: true,
};

//Object.values()
let test = Object.values(obj3);
console.log("Object.values()", test);

//Object.keys()
let temp = Object.keys(obj3);
console.log("Object.keys()", temp);

//Object.entries()
temp = Object.entries(obj3);
console.log("Object.entries()", temp);

//Object.freeze()
temp = Object.freeze(obj3);
console.log("Object.freeze()", temp);
temp = Object.isFrozen(obj3);
console.log("Object.isFrozen()", temp);

//Object.seal()
temp = Object.seal(obj3);
console.log("Object.seal()", temp);
temp = Object.isSealed(obj3);
console.log("Object.isSealed()", temp);

const person = {
  name: "Ivan",
  age: 22,
  job: "work",
  salary: 1000,
  retired: true,
};

const person2 = Object.create(
  {},
  {
    name: {
      value: "Stepan",
    },
    retired: {
      value: false,
    },
  }
);

console.log(person);
console.log(person2);

const ob1 = Object.assign({ a: 22 }, { b: 33 });
console.log(ob1);

const ob2 = Object.assign(person, { hello: "greeting" });
console.log(ob2);

const ob3 = Object.assign({}, person); //copy
ob3.age = 33;
delete ob3.retired;
console.log("-----copy obj----");

console.log(person);
console.log(ob3);

console.log(Object.getOwnPropertyDescriptors(person2));

console.log(Object.getOwnPropertyNames(person2));

console.log(obj3.hasOwnProperty("hasOwnProperty"));
////////////////MATH//////////////

let a1 = Math.min(5, 7, 3, 5, 9, 5);
console.log(a1);

let a2 = Math.max(5, 7, 3, 5, 9, 5);
console.log(a2);

console.log(Math); //show all math methods
let b1 = Math.sin(0.5);
console.log(b1);

let b2 = Math.log(3);
console.log(b2);

let b3 = Math.sqrt(25);
console.log(b3);

let b4 = Math.pow(2, 4);
console.log(b4);

let b5 = Math.round(0.5);
console.log(b5);

let b6 = Math.ceil(0.001);
console.log(b6);

let b7 = Math.floor(0.999);
console.log(b7);

let b8 = Math.round(Math.random() * 10); // 0 - 10
console.log(b8);

let arr1 = [1, 3, 5, 6, 8, 1, 4, 5, 3, 15, 19, 20, 11, [11, [true]]];
console.log(
  "\n//1 завдання\n[1, 3, 5, 6, 8, 1, 4, 5, 3, 15, 19, 20 11, [11, [true]]\n"
);

//reverse()
arr1.reverse(); //цей методд мутує масив
console.log("reverse()", arr1);
arr1.reverse(); //в первинний вигляд масив вернув

//flat()
let arrTemp = arr1.flat();
console.log("flat()", arrTemp);

//includes()
let boolTemp = arr1.includes(5);
console.log("includes(5)", boolTemp);

//join()
arrTemp = arr1.join(["\\_/"]);
console.log("join()", arrTemp);

//map()
arrTemp = arr1.map((el) =>
  typeof el === "number" ? "element: " + el * 2 : el
);
console.log("map()", arrTemp);

//reduce()
temp = arr1.reduce((acc, el) => {
  if (typeof el === "number") acc += el;
  return acc;
}, 0);
console.log("reduce()", temp);

//2. рядок: 'Hello world and my dear friend ...'
// Застосувати методи

console.log("//2. \nрядок: 'Hello world and my dear friend ...' ");

let str2 = "Hello world and my dear friend ...";

// split()
temp = str2.split(" ");
console.log(temp);

//trim()
let strTemp = "  Hello!  ";
temp = strTemp.trim();
console.log("trim():\n", temp + temp + temp); //без пробілов

//toLocaleUpperCase()
temp = str2.toLocaleUpperCase();
console.log("toLocaleUpperCase()\n", temp);

//toLocaleLowerCase()
temp = str2.toLocaleLowerCase();
console.log("toLocaleLowerCase()\n", temp);

//charAt()
temp = str2.charAt(0);
console.log("charAt() [0]\n ", temp);

//charCodeAt()
temp = str2.charCodeAt(0);
console.log("charCodeAt() [0]'H'\n ", temp);

//includes()
temp = str2.includes("He");
console.log("includes() 'He'\n ", temp);

//concat()
temp = str2.concat(" Hey");
console.log("concat() +' Hey'\n ", temp);

//search()
temp = str2.search("l");
console.log("search() 'l'\n ", temp);

//startsWith()
temp = str2.startsWith("H");
console.log("startsWith() 'H' ", temp);
temp = str2.startsWith("5");
console.log("startsWith() '5' ", temp);

//endsWith()
temp = str2.endsWith(".");
console.log("endsWith() '.' ", temp);
temp = str2.endsWith("!");
console.log("endsWith() '!' ", temp);

//indexOf()
temp = str2.indexOf(".");
console.log("indexOf() '.' ", temp);

//lastIndexOf()
temp = str2.lastIndexOf(".");
console.log("lastIndexOf() '.' ", temp);

//replace()
temp = str2.replace("H", "YYY");
console.log("replace('H','YYY')", temp);
