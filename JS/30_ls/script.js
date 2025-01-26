// Переписаний код з використанням функцій генераторів
function* clearHouseGenerator(isClean) {
  if (isClean) {
    const money = yield 500;
    const restAfterJeans = yield shopGenerator(money);
    const restAfterBurger = yield macGenerator(restAfterJeans);
    console.log("Я отримав залишок після всього:", restAfterBurger);
  } else {
    console.log("Should clear before get money!!!");
  }
}

function shopGenerator(money) {
  const priceOfJeans = 50;
  if (money >= priceOfJeans) {
    const rest = money - priceOfJeans;
    console.log("Я купив джинси, залишок:", rest);
    return rest;
  } else {
    console.log("Not enough money for jeans!");
    return null;
  }
}

function macGenerator(money) {
  const priceOfBurger = 100;
  if (money >= priceOfBurger) {
    const rest = money - priceOfBurger;
    console.log("Я купив бургер, залишок:", rest);
    return rest;
  } else {
    console.log("Not enough money for burger!");
    return null;
  }
}

const generator = clearHouseGenerator(true);
let result = generator.next(); // Початок роботи генератора
while (!result.done) {
  result = generator.next(result.value);
}

// Валідація через Regex
const regex = /^[1-5a-fA-F]{1,9}$/;
const input = document.getElementById("regexInput");
const validationResult = document.getElementById("validationResult");

input.addEventListener("input", () => {
  if (regex.test(input.value)) {
    validationResult.textContent = "Валідація пройдена!";
    validationResult.className = "valid";
  } else {
    validationResult.textContent = "Невірний формат даних!";
    validationResult.className = "invalid";
  }
});
