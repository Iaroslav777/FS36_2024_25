console.log("//15 ls\nwriteProgram => buyKeyboard => visitCinema");

// Backend
function writeProgram(isWrite, cb) {
  console.log("Program start $1000");

  setTimeout(() => {
    if (isWrite) {
      const salary = 1000;
      cb(null, 1000);
    } else {
      cb("error: Program is not writed", 0);
    }
  }, 2200);
}

function buyKeyboard(money, cb) {
  console.log("Keyboard start $250");
  setTimeout(() => {
    const costOfKeyboard = 250;

    if (costOfKeyboard <= money) {
      const rest = money - costOfKeyboard;
      cb(null, rest);
    } else {
      cb("Need more money", money);
    }
  }, 2000);
}

function visitCinema(money, cb) {
  console.log("Cinema start $200");
  setTimeout(() => {
    const costOfCinema = 200;

    if (money >= costOfCinema) {
      const rest = money - costOfCinema;
      cb(null, rest);
    } else {
      cb("error: I didn't watch the movie:(\n. Need more money", money);
    }
  }, 1000);
}

//добавив політ Літаком
function flight(money, cb) {
  console.log("Flight on an airplane $230");
  setTimeout(() => {
    const costOfFlight = 230;

    if (money >= costOfFlight) {
      const rest = money - costOfFlight;
      cb(null, rest);
    } else {
      console.log("error:Need more money didn't fly on the plane", money);
    }
  }, 1000);
}

//(e - f , d - l)(error,payload)

// Frontend
writeProgram(true, (error, salary) => {
  if (!error) {
    console.log("Ura, Program is writed!", salary);

    buyKeyboard(salary, (errorKeyboard, restOfKeyboard) => {
      if (!errorKeyboard) {
        console.log("I bougth Keyboard !!", restOfKeyboard);

        visitCinema(restOfKeyboard, (errorCinema, restOfCinema) => {
          if (!errorCinema) {
            console.log("I watched the movie! Look look!))", restOfCinema);

            flight(restOfCinema, (errorFlight, restOfFlight) => {
              if (!errorFlight) {
                console.log("I'm flying on a plane!))", restOfFlight);
              } else {
                console.log("((((", errorFlight, restOfFlight);
              }
            });
          } else {
            console.log("((((", errorCinema, restOfCinema);
          }
        });
      } else {
        console.log(errorKeyboard, restOfKeyboard);
      }
    });
  } else {
    console.log("((((((((", error, salary);
  }
});

//=============це повтор, що робили на уроці
// // Backend
// function clearHouse(isClean, cb) {
//   console.log("House start");

//   setTimeout(() => {
//     if (isClean) {
//       const salary = 500;
//       cb(null, 500);
//     } else {
//       cb("error: house is not cleared", 0);
//     }
//   }, 3000);
// }

// function shop(money, cb) {
//   console.log("Shop start");
//   setTimeout(() => {
//     const costOfJeans = 100;

//     if (costOfJeans <= money) {
//       const rest = money - costOfJeans;
//       cb(null, rest);
//     } else {
//       cb("Need more money", money);
//     }
//   }, 2000);
// }

// function mac(money, cb) {
//   setTimeout(() => {
//     const costOfBurger = 100;

//     if (costOfBurger <= money) {
//       const rest = money - costOfBurger;
//       cb(null, rest);
//     } else {
//       cb("error: I`m hungry. Need more money", money);
//     }
//   }, 1000);
// }

// //(e - f , d - l)(error,payload)

// // Frontend
// clearHouse(true, (error, salary) => {
//   if (!error) {
//     console.log("Ura", salary);

//     shop(salary, (errorShop, restOfShop) => {
//       if (!errorShop) {
//         console.log("I bougth jeans !!", restOfShop);

//         mac(restOfShop,(errorMac, restOfMac)=>{
//           if (!errorMac) {
//             console.log("Yummy Yummy", restOfMac);

//           } else {
//             console.log("((((",errorMac,restOfMac);

//           }
//         })
//       } else {
//         console.log(errorShop, restOfShop);
//       }
//     });
//   } else {
//     console.log("((((((((", error, salary);
//   }
// });
