///////////////// 1 ///////////////////////
// 1. Напишіть цикл, який виводить всі парні числа від 20 до 32.
// for
console.log("1.)\nfor");
for(let i = 20;i<33;i++){
  if(i%2==0)
    console.log(i);
}
// for of
console.log("for..of");
let arr = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
for(let num of arr){
  if(num%2===0){
    console.log(num);
  }
}
// for in
console.log("for..in");
for(let i in arr){
  if(arr[i]%2===0){
    console.log(arr[i]);
  }
}
// while
console.log("while");
let start = 20;
while(start <=32){
  console.log(start);
  start += 2;
}
// do..while
console.log("do..while");
start = 20;
do{
  console.log(start);
  start += 2;
}
while(start <=32);
  
///////////////// 2 ///////////////////////
console.log("2.)\n");
let arr2 = ["Apple","Green","Yaroslav",777,44];
let index =0;
for(let i of arr2){
  console.log(index,i,": ",typeof(i));
  index++;
}
///////////////// 3 ///////////////////////
// 3. Напишіть цикл який виводить всі непарні числа від 17 до 39.
console.log("3.)\nвсі непарні числа від 17 до 39:");
let arr3 = [17,39];
for(let i = arr3[0];i <= arr3[1];i++){
  if(i%2===1){
    console.log(i);
  }
}
///////////////// 4 ///////////////////////
//4. парні:[1, 5, true, 'hello', false, null, 'iiii', 54, null]
console.log("4.)\nпарні:[1, 5, true, 'hello', false, null, 'iiii', 54, null]");
let arr4 = [1, 5, true, 'hello', false, null, 'iiii', 54, null];
for (let i = 0; i < arr4.length; i++){
  if(i%2===1){
    console.log(arr4[i]);
  }
}
///////////////// 5 ///////////////////////
//5. НЕ парні:[1, 5, true, 'hello', false, null, 'iiii', 54, null]
console.log("5.)\n НЕ парні:[1, 5, true, 'hello', false, null, 'iiii', 54, null]");
let arr5 = [1, 5, true, 'hello', false, null, 'iiii', 54, null];
for (let i = 0; i < arr5.length; i++){
  if(i%2===0){
    console.log(arr5[i]);
  }
}
///////////////// 6 ///////////////////////
// 6 for
let arr6 = [1, 2, 4, 2, 3, 55, 66, 777, 12];
let sum = 0;
for (let i = 0;i<arr6.length;i++){
  sum += arr6[i];
}
console.log("6.)\nsum for: ", sum);
//for of
sum = 0;
for (let i of arr6) {
  sum += i;
}
console.log("sum for of:", sum);
// for in
sum = 0
for (let i in arr6){
  sum += arr6[i];
}
console.log("sum for-in:", sum);
// while
sum = 0;
let i = 0;
while (i < arr6.length) {
  sum += arr6[i];
  i++;
}
console.log("sum while:", sum);
// do-while
sum = 0;
i = 0;
do {
  sum += arr6[i];
  i++;
} while (i < arr6.length);
console.log("sum do-while:", sum);
///////////////// 7 ///////////////////////
// 7: Перемножити та вивести [1, 2, 4, 2, 3, 5, 6, 7, 1]
// for
let arr7=[1,2,4,2,3,5,6,7,1];
let product = 1;

for (let i = 0;i<arr7.length; i++){
  product *= arr7[i];
}
console.log("7.)\nproduct for:",product);
// for of
product = 1;

for(let num of arr7){
  product *= num;
}
console.log("product for-of:",product);
// for-in
product = 1
for(let i in arr7){
  product *= arr7[i];
}
console.log("product for-in:",product);
// while
product = 1;
i = 0;
while(i<arr7.length){
  product *= arr7[i];
  i++;
}
console.log("product while:", product);
// do-while
product = 1;
i = 0;
do{
  product *= arr7[i];
  i++;
} while (i < arr7.length);
console.log("product do-while:", product);
///////////////// 8 ///////////////////////
let p8 = +prompt("Enter number 0-200:");
// for
console.log("8. for:");
for (let i =0;i< p8;i++){
  if (i >= 5&& i <= 10)
     continue;
  if (i >= 100)
     break;
  console.log(i);
}
// while
console.log("while:");
i = 0;
while(i< p8){
  if(i >=5&&i <= 10){
    i++;
    continue;
  }
  if (i >= 100) {
    break;
  }
  console.log(i);
  i++;
}
// do while
console.log("do while:");
let j = 0;
do{
  if(j >=5&&j<= 10){
    j++;
    continue;
  }
  if (j >= 100){
    break;
  }
  console.log(j);
  j++;
} while(j < p8);
//вручну заповнюю масив від 0 до (p8)-що вказали
let mas8 = [];
for(let i = 0;i<= p8; i++){
  mas8[i] = i;
}
// for of
console.log("for of:");
for(let v of mas8){
  if(v >=5&&v<= 10)
     continue;
  if(v>= 100)
     break;
  console.log(v);
}
// for in
console.log("for in:");
for(let i in mas8){
  let v = mas8[i];
  if(v>= 5&& v<= 10)
     continue;
  if(v>= 100)
     break;
  console.log(v);
}
