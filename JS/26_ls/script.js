// Завдання 1: Код із використанням колбеків
function fetchDataWithCallback(url, callback) {
  setTimeout(() => {
    console.log(`Дані отримані з ${url}`);
    callback(null, { data: `Дані з ${url}` });
  }, 1000);
}

fetchDataWithCallback("https://example.com", (err, data) => {
  if (err) {
    console.error("Помилка:", err);
  } else {
    console.log("Результат з колбеку:", data);
  }
});

// Завдання 2: Промисифікація функції
function fetchDataWithPromise(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Дані отримані з ${url}`);
      resolve({ data: `Дані з ${url}` });
    }, 1000);
  });
}

// Завдання 3: Ланцюжок викликів через Promise
fetchDataWithPromise("https://example.com")
  .then((result) => {
    console.log("Результат 1:", result);
    return fetchDataWithPromise("https://example.com/next");
  })
  .then((result) => {
    console.log("Результат 2:", result);
  })
  .catch((error) => {
    console.error("Помилка у ланцюжку:", error);
  });

// Завдання 4: Ланцюжок викликів через async/await
async function fetchSequentialData() {
  try {
    const result1 = await fetchDataWithPromise("https://example.com");
    console.log("Результат 1 (async/await):", result1);

    const result2 = await fetchDataWithPromise("https://example.com/next");
    console.log("Результат 2 (async/await):", result2);
  } catch (error) {
    console.error("Помилка в async/await:", error);
  }
}

fetchSequentialData();

// Завдання 5: Використання Promise.all, Promise.allSettled, Promise.race
const promises = [
  fetchDataWithPromise("https://example.com/1"),
  fetchDataWithPromise("https://example.com/2"),
  fetchDataWithPromise("https://example.com/3"),
];

// Promise.all: Виконує всі проміси, якщо всі успішні
Promise.all(promises)
  .then((results) => {
    console.log("Promise.all результати:", results);
  })
  .catch((error) => {
    console.error("Promise.all помилка:", error);
  });

// Promise.allSettled: Повертає результати всіх промісів, незалежно від статусу
Promise.allSettled(promises).then((results) => {
  console.log("Promise.allSettled результати:", results);
});

// Promise.race: Повертає перший виконаний проміс (успіх чи помилка)
Promise.race(promises)
  .then((result) => {
    console.log("Promise.race результат:", result);
  })
  .catch((error) => {
    console.error("Promise.race помилка:", error);
  });
