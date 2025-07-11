// backend/server.js - Бэкенд для додатка "Розмовник"

const http = require("http");
const fs = require("fs").promises; // Для асинхронних файлових операцій
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Для генерації унікальних ID
// Завантажуємо .env з кореневої папки проекту (phrasebook-app/.env)
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.BACKEND_PORT || 5000;
const PHRASES_FILE = path.join(__dirname, "phrases.json");

let phrases = []; // Зберігання фраз у пам'яті

// --- Допоміжні функції для роботи з файлом ---

// Завантаження фраз з файлу
async function loadPhrases() {
  try {
    const data = await fs.readFile(PHRASES_FILE, "utf8");
    phrases = JSON.parse(data);
    console.log(`Фрази успішно завантажені з ${PHRASES_FILE}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Файл phrases.json не знайдено, створюємо новий.");
      phrases = [];
      await savePhrases(); // Створюємо порожній файл
    } else {
      console.error("Помилка при завантаженні фраз:", error);
      phrases = []; // Скидаємо фрази у випадку помилки
    }
  }
}

// Збереження фраз у файл
async function savePhrases() {
  try {
    await fs.writeFile(PHRASES_FILE, JSON.stringify(phrases, null, 2), "utf8");
    console.log(`Фрази успішно збережені у ${PHRASES_FILE}`);
  } catch (error) {
    console.error("Помилка при збереженні фраз:", error);
  }
}

// --- Обробник HTTP-запитів ---
const server = http.createServer(async (req, res) => {
  const { method, url, headers } = req;
  const parsedUrl = new URL(url, `http://${req.headers.host}`); // Парсимо URL для зручності

  // Встановлюємо CORS заголовки для всіх відповідей
  res.setHeader("Access-Control-Allow-Origin", "*"); // Дозволяємо будь-який домен
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Обробка OPTIONS-запитів (preflight-запити для CORS)
  if (method === "OPTIONS") {
    res.writeHead(204); // Без вмісту
    res.end();
    return;
  }

  // --- GET /api/phrases - Повертає всі фрази (з фільтрацією за ключовим словом) ---
  if (method === "GET" && parsedUrl.pathname === "/api/phrases") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const searchTerm = parsedUrl.searchParams.get("search"); // Отримуємо параметр пошуку

    let filteredPhrases = phrases;
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredPhrases = phrases.filter(
        (phrase) =>
          phrase.english.toLowerCase().includes(lowerCaseSearchTerm) ||
          phrase.ukrainian.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    res.writeHead(200);
    res.end(JSON.stringify(filteredPhrases));
    return;
  }

  // --- POST /api/phrases - Додає нову фразу ---
  if (method === "POST" && parsedUrl.pathname === "/api/phrases") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const { english, ukrainian } = JSON.parse(body);
        if (!english || !ukrainian) {
          res.writeHead(400, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(
            JSON.stringify({
              message: 'Поля "english" та "ukrainian" є обов\'язковими.',
            })
          );
          return;
        }
        const newPhrase = {
          id: uuidv4(),
          english,
          ukrainian,
          learned: false, // За замовчуванням не вивчено
        };
        phrases.push(newPhrase);
        await savePhrases();
        res.writeHead(201, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify(newPhrase));
      } catch (error) {
        console.error("Помилка при додаванні фрази:", error);
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({
            message: "Невірний формат JSON або помилка сервера.",
          })
        );
      }
    });
    return;
  }

  // --- DELETE /api/phrases/:id - Видаляє фразу ---
  if (method === "DELETE" && parsedUrl.pathname.startsWith("/api/phrases/")) {
    const id = parsedUrl.pathname.split("/").pop();
    const initialLength = phrases.length;
    phrases = phrases.filter((phrase) => phrase.id !== id);

    if (phrases.length < initialLength) {
      await savePhrases();
      res.writeHead(204); // Без вмісту
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ message: "Фразу не знайдено." }));
    }
    return;
  }

  // --- PUT /api/phrases/:id - Змінює статус на "вивчено" ---
  if (method === "PUT" && parsedUrl.pathname.startsWith("/api/phrases/")) {
    const id = parsedUrl.pathname.split("/").pop();
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const { learned } = JSON.parse(body); // Очікуємо { learned: true/false }
        const phraseIndex = phrases.findIndex((phrase) => phrase.id === id);

        if (phraseIndex !== -1) {
          phrases[phraseIndex].learned = !!learned; // Перетворюємо на булеве значення
          await savePhrases();
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify(phrases[phraseIndex]));
        } else {
          res.writeHead(404, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify({ message: "Фразу не знайдено." }));
        }
      } catch (error) {
        console.error("Помилка при оновленні фрази:", error);
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({
            message: "Невірний формат JSON або помилка сервера.",
          })
        );
      }
    });
    return;
  }

  // --- GET /api/phrases/export - Експортує всі фрази у JSON файл ---
  if (method === "GET" && parsedUrl.pathname === "/api/phrases/export") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="phrases_export.json"'
    );
    res.writeHead(200);
    res.end(JSON.stringify(phrases, null, 2));
    return;
  }

  // --- Обробка невідомих маршрутів ---
  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ message: "Маршрут не знайдено." }));
});

// --- Запуск сервера ---
server.listen(PORT, async () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
  await loadPhrases(); // Завантажуємо фрази при старті сервера
});
