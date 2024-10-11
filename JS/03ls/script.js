//////////// 1 ////////////////
console.log("1 перевести типи\n",Boolean('Hello!'));
console.log(Boolean(0));
console.log(Number('555'));
console.log(Boolean(null));
console.log(Boolean(undefined));
//////////////// 2 //////////////
let res = confirm("Confirm is Ok or do not Ok? :))");
if(res){
  console.log('OK');
}else{
  console.log("ERROR");
}
///////////// 3 ///////////////
confirm("Ok or dont Ok?")?console.log("OK"):console.log("ERROR");
/////////////// 4 ////////////////
let res4 = prompt();
if(1 <= res4 && res4 < 12){
  console.log("you are child");
} else if  (12 <= res4 && res4 < 18) {
  console.log("you are teenager");
} else if ( 18 <= res4 && res4 < 60) {
  console.log("you are adult person");
} else if ( 60 <= res4 && res4 < 110) {
  console.log("you are so old");
} else if ( 110 <= res4) {
  console.log("you are alien:)))");
}
//////////////// 5 /////////////////////////
const name5 = prompt("");
switch(name5){
case "Admin":
  console.log("I have full access");
  break;

case "Student":
  console.log("Im student");
  break;

case "Teacher":
  console.log("Im teacher");
  break;

case "Young":
  console.log("I young and ready to party");
  break;
  default:
    console.log("Who are you, розбійник?))");
}
//////////// 6 /////////////
let a = 5, b = 7;
a > b? false : true;
a < b? false : true;
a >= b? false : true;
a <= b? false : true;
a == b? false : true;
a === b? false : true;
a != b? false : true;
a !== b? false : true;
a || b? false : true;
a && b? false : true;
