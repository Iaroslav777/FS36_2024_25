///////////////////// 1 //////////////////
let num = 5;
let str = '5';
let nul = null;
let und = undefined;
let bool = true;
let bigInt = 9182308987359875734598n;//символ n наприкінці - це BigInt
let id = Symbol("ID");
let obj = {apple: 5}
console.log(
typeof(num), num, '\n',
typeof(str), str, '\n',
typeof(nul), nul, '\n',
typeof(und), und, '\n',
typeof(bool), bool, '\n',
typeof(bigInt), bigInt, '\n',
typeof(id), id, '\n',
)
for(let key in obj){
  console.log('key: ', key,'value: ', obj[key])
}
//////////// 2 /////////////
let a = 5, b = 6, c = 7;
console.log(a + b);
console.log(a - c);
console.log(a * b);
console.log(a / b);
console.log(a ** b);
console.log(a + b * c);
console.log(a % 2);
console.log(a*b/c);
console.log(c - b + a);
console.log(a / b / c);
////////////////////// 3 ///////////
let num3 = Number('555');
num3 = Number('True');
let bool3 = Boolean(0);
bool3 = Boolean('555');
let str3 = String(true);
str3 = String(777);
//////////////// 4 ///////////////
let x = 5, y = 6;
let res = x + y;
console.log(res);

res = x - y;
console.log(res);

res = x * y;
console.log(res);

res = x ** y;
console.log(res);

res = x / y;
console.log(res);

res = x % 2;
console.log(res);
