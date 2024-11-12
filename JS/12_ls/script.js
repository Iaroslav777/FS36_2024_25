// 1 масив: [1, 3, 5, 6, 8, 1, 4, 5, 3, 15, 19, 20 11, [11, [true]]
//Застосувати наступні методи:
//reverse, flat, includes, join, map, reduce

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
let temp = arr1.reduce((acc, el) => {
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

//3. Застосувати інші методи які були використані в лекції

const obj3 = {
  key1: 111,
  key2: "222",
  key3: true,
};

//Object.values()
test = Object.values(obj3);
console.log("Object.values()", test);

//Object.keys()
temp = Object.keys(obj3);
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
