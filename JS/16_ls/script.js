/////////////// Rest //////////////////////
console.log("Rest");

function hello(firstWord, ...othersWords) {
  console.log(firstWord + othersWords.join("_"));
}
hello("", "Hello", "word", "!!!", "demo", "rest");

//////////////
const arrOfNumber = (...nums) => {
  console.log(nums);
};
arrOfNumber(9, 70, 53, 76);

////////////////
const auto = { model: "BMW", cuontry: "DE", year: 2002 };
const { model, ...other } = auto;
console.log(model, "===", other);

/////////////перемножити всі вхідні
function multiplyNums(...nums) {
  return nums.reduce((mult, num) => mult * num, 1);
}
let res = multiplyNums(8, 5, 6, 3);
console.log(res);

////////////////
const [one, two, ...n] = [111, 222, 555, 777, 999, 888];
console.log(n);
console.log(one, two);

/////////////// Spread ////////////////
//////////////////////////////////////
console.log("Spread");

const ob1 = { f: 555, s: 777 };
const ob2 = { ...ob1 };
console.log(ob2);

////////////////
const ob11 = { model: "BMW" };
const ob22 = { year: 2002 };
const ob11AddedOb22 = { ...ob11, ...ob22 };
console.log(ob11AddedOb22);

////////////////
const arr1 = [7, 9, 8, 5, 6];
const copyOfArr1 = [...arr1];
console.log(copyOfArr1);

////////////////
const arr77 = ["A", "B", "C"];
const arr88 = [800, 700];
const arr99 = [...arr77, ...arr88];
console.log(arr99);

//////////////////
const arrNums = [9, 5, 7, 3, 5];
const res5 = Math.min(...arrNums);
console.log(res5);

/////////////////copy of OBJECTS /////////////////
//////////////////////////////////////////////////
console.log("///////////////copy of OBJECTS");

const obj9 = { first: { second: "AUDI" } };
const obj9Copy = { ...obj9 };
console.log(obj9Copy.first.second);
//test
obj9.first.second = "BMW";
console.log(obj9.first.second);
console.log(obj9Copy.first.second);

/////////////////////////////
const obj99 = { first: { second: "MERSRDES" } };
const obj99Copy = { ...obj99, first: { ...obj99.first } };
console.log(obj99Copy.first.second);
//test
obj99.first.second = "TOYOTA";
console.log(obj99.first.second);
console.log(obj99Copy.first.second);

///////////////////////////////////
const obj777 = { model: "Slavuta" };
const obj7788 = { ...obj777, color: "Green" };
console.log(obj7788);

////////////////////////
const obj77 = { model: "Tavria NOVA", color: "Red" };
const obj778 = { ...obj77 };
console.log(obj778);

////////////////////////////
const obj123 = { yyyyyy: 12345 };
const obj234 = { xxxxxx: 98765 };
const obj345 = { ...obj123, ...obj234 };
console.log(obj345);

/////////////////copy of ARREYS /////////////////
//////////////////////////////////////////////////
console.log("////////////////copy of ARREYS");

const arr11 = [
  [777, 666],
  [555, 444],
]; //поверхневе
const copyArr11 = [...arr11];
console.log(copyArr11[0][0]);
//test
copyArr11[0][0] = "TEST";
console.log(arr11[0][0]);
console.log(copyArr11[0][0]);

////////////////////////
const arr22 = [
  [777, 666],
  [555, 444],
]; //глибоке
const copyArr22 = arr22.map((e) => [...e]);
console.log(copyArr22[0][0]);
//test
copyArr22[0][0] = "TEST";
console.log(arr22[0][0]);
console.log(copyArr22[0][0]);

////////////////////////
const arr33 = [567, 456, 345];
const arr3344 = [...arr33, 234, 123];
console.log(arr3344);

/////////////////////////
const arr44 = [789, 678, 567, 345];
const copyArr44 = [...arr44];
console.log(copyArr44);

/////////////////////////
const arr444 = [5678, 4578, 3456, 9876];
const copyOfArr444 = [...arr444];
console.log(copyOfArr444);

/////////////////////////
const arr5555 = [678, 456];
const arr5577 = ["ert", "sdf"];
const arr5599 = [...arr5555, ...arr5577];
console.log(arr5599);

///////////////// DESTRUKTURISATION /////////////////
//////////////////////////////////////////////////
console.log("////////////////DESTRUKTURISATION");

const moto = {
  model: "YAMAHA",
  year: 2018,
  country: "JAPAN",
};

const { model: modelMoto, year: yearMoto, country: cMoto } = moto;
console.log("Модель:", modelMoto, "Рік:", yearMoto, "Країна:", cMoto);

/////////////////////////////

const models = [" MERSEDES", "TAVRIA", "BMW", "TOYOTA", "RENAULT"];
const [firstModel, secondModel, ...restModels] = models;
console.log(firstModel);
console.log(secondModel);
console.log(restModels);
