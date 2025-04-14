
const args = process.argv.slice(2);

const nameUser = args[0];
const age = args[1];

if (!nameUser || !age) {
  console.log("Йоу! ПОМИЛКА!111, пиши ось так: node greetTest02.js ім'я вік");
} else {
  console.log(`Привіт, ${nameUser}! Тобі ${age} роки.`);
}
//для течтування node greetTest02.js Ярослав 44