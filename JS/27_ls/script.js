// Завдання 1: Виводить "Hello, World!" через 3 секунди з поясненням асинхронності
console.info("Асинхронний код починається...");
setTimeout(() => {
  console.log("Hello, World!");
  console.info("setTimeout виконано після затримки.");
}, 3000);
console.info("Асинхронний код продовжує виконуватись.");

// Завдання 2: Робота з промісами
function fetchWithDelay(url, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Дані з ${url} отримано через ${delay} мс`);
    }, delay);
  });
}

const promise1 = fetchWithDelay("https://example.com/1", 1000);
const promise2 = fetchWithDelay("https://example.com/2", 2000);
const promise3 = fetchWithDelay("https://example.com/3", 1500);

// Promise.all
Promise.all([promise1, promise2, promise3]).then((results) => {
  console.log("Promise.all результати:", results);
});

// Promise.allSettled
Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  console.log("Promise.allSettled результати:", results);
});

// Promise.race
Promise.race([promise1, promise2, promise3]).then((result) => {
  console.log("Promise.race результат:", result);
});

// Promise.any
Promise.any([promise1, promise2, promise3]).then((result) => {
  console.log("Promise.any результат:", result);
});

// Завдання 3: Асинхронний цикл із використанням async/await і Promise
async function asyncLoop() {
  for (let i = 1; i <= 3; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Затримка 1 сек
    console.log(`Асинхронна операція ${i}`);
  }
}

function promiseLoop() {
  let promise = Promise.resolve();
  for (let i = 1; i <= 3; i++) {
    promise = promise.then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            console.log(`Асинхронна операція ${i}`);
            resolve();
          }, 1000);
        })
    );
  }
}

// Викликаємо цикли
asyncLoop();
promiseLoop();

// Завдання 4: Анімація з використанням JavaScript для запуску
const animateBtn = document.getElementById("animateBtn");
const box = document.getElementById("box");

animateBtn.addEventListener("click", () => {
  box.classList.remove("animate"); // Видаляємо клас, якщо він вже є
  void box.offsetWidth; // Перезапускаємо анімацію
  box.classList.add("animate"); // Додаємо клас для анімації
});
