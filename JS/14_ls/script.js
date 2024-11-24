//Recursion

const arr = [11, null, true, 7, 8];

for (let a = 0; a <= arr.length - 1; a++) {
  console.log(arr[a]);
}

function recersionArray(a) {
  let temp = Math.round(Math.random() * 10);
  temp % 2 === 0 ? (a += temp) : (a -= temp);
  console.log(a);
  // recersionArray(a);
  if (a > 3) {
    recersionArray(a);
  }
}
recersionArray(0);
console.log(arr);

function recursionArray2(arr, i = 0) {
  if (arr.length > i) {
    console.log(arr[i]);
    recursionArray2(arr, ++i);
  }
}
console.log("===========");
recursionArray2(arr);
console.log("===========");
recursionArray2([1, 2, 3, 4, 5, 6]);
console.log("===========");

function recursionArray3(arr, i = 0) {
  if (arr.length <= i) return;

  console.log(`${i + 1}: ${arr[i]}`);
  recursionArray3(arr, ++i);
}
recursionArray3(arr);

//Closes
console.log("===//Closes========");

function stepper() {
  let numb = 0;

  function dec() {
    numb++;
  }
  function inc() {
    numb--;
  }
  return {
    dec: dec,
    inc: inc,
    numb: numb,
  };
}
console.log(stepper());
console.log(stepper().numb);
stepper().dec();
console.log(stepper().numb);

const st = stepper();
console.log(st);
st.dec();
console.log(st);

//колбек функція
console.log("//колбек функція");

function clearHouse(isClean, cb) {
  if (isClean) {
    cb(500);
  } else {
    cb("Should clear before get money!!!");
  }
}

function shop(money, cb) {
  const priceOfJeans = 50;

  if (money >= priceOfJeans) {
    const rest = money - priceOfJeans;
    cb(rest);
  } else {
    cb("Not enoygth money!");
  }
}

function mac(money, cb) {
  const pricweOfBurger = 100;

  if (money >= pricweOfBurger) {
    const rest = money - pricweOfBurger;
    cb(rest);
  } else {
    console.log("Need more money");
  }
}
clearHouse(true, (response) => {
  if (typeof response === "number") {
    console.log("Ura, I got money!!!");

    shop(response, (restJeans) => {
      if (typeof restJeans === "number") {
        console.log("Uraa I bougth jeans, I have rest: ", restJeans);

        mac(restJeans, (restBurger) => {
          if (typeof restBurger === "number") {
            console.log("Yummy Yummy!!! I have: ", restBurger);
          } else {
            console.log("I will hungry all day");
          }
        });
      } else {
        console.log("Selery is too low");
      }
    });
  } else {
    console.log("not lucky not lucky :(");
  }
});

console.log("=====================");
