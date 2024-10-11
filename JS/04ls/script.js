////////// 1 //////////////
console.log(Boolean("Hello!"));
console.log(Boolean(0));
console.log(Number("777"));
console.log(Boolean(null));
console.log(Boolean(undefined));
////////// 2 //////////////
let user = {
fName: "Ivan",
lName: "Ivanov",
age: 44,
car: {
model: "BMW",
color: "Black",
age: 2010,
pet:{
  cat: "Tom",
  mouse: "Jerry",
  dog: "Sobachka",
}
}
}
console.log(user.car.model);
console.log(user.car.pet.cat);
console.log(user.car.pet.dog);
////////// 3 //////////////
let arr = [1,2,3,[24,25,26,[37,38,39]]];
console.log(arr[3][0]);
console.log(arr[3][3][1]);
console.log(arr[3][3][2]);
////////// 4 //////////////
for(let i = 2; i < 21; i++){
  if(i%2==0){
    console.log(i);
  }
  continue;
}
////////// 5 //////////////
let mas = ["Apple","Green",44];
console.log(typeof(mas[0]));
console.log(typeof(mas[1]));
console.log(typeof(mas[2]));
// ////////// 6 //////////////
// let num1 = prompt("Enter 1 number: ");
// let num2 = prompt("Enter 2 number: ");
// if(num1 > num2){
//   console.log("Num1: ",num1, "bigger then num2:", num2);
// }else if (num1 < num2){
//   console.log("Num2: ",num2, "bigger then num1:", num1);
// }else{
//   console.log("Num1: ",num1, " === Num2: ", num2);
// }
// ////////// 7 //////////////
for(let i = 1;i<16;i++){
  if(i%2==1){
    console.log(i);
  }
  // continue;
}
////////// 8 //////////////
let arr8 = [1, 5, true, 'hello', false, null, 'iiii', 54, null];
for(let i = 0; i < arr8.length; i++){
  if(i%2==1){
    console.log(arr8[i])
  }
}
////////// 9 //////////////
arr8 = [1, 5, true, 'hello', false, null, 'iiii', 54, null];
for(let i = 0; i < arr8.length; i++){
  if(i%2==0){
    console.log(arr8[i])
  }
}
////////// 10 //////////////
let mas10 = [1, 2, 4, 2, 3, 55, 66, 777, 12];
let sum = 0;
for(let i = 0; i < mas10.length; i++){
  sum += mas10[i];
}
console.log("Summ array10 is: ", sum);
////////// 11 //////////////
let arr11 = [1, 2, 4, 2, 3, 5, 6, 7, 1];
let res = 1;
for(let i = 0; i < arr11.length; i++){
res *= arr11[i];
}
console.log("Result mnozhennya is: ", res);