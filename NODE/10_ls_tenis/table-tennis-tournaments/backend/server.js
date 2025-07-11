import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import { Pool } from "pg"; // Імпортуємо Pool з 'pg'
import cors from "cors"; // Імпортуємо cors

// Налаштування підключення до PostgreSQL
// Будь ласка, замініть 'your_password' на ваш реальний пароль.
// Якщо ви використовуєте стандартні налаштування pgAdmin, можливо, користувач 'postgres'
// і пароль, який ви встановили під час інсталяції.
const pool = new Pool({
  user: "postgres", // Ваш користувач бази даних
  host: "localhost", // Хост бази даних (зазвичай localhost)
  database: "tennis_tournaments_db", // Назва вашої бази даних
  password: "your_password", // Ваш пароль до бази даних
  port: 5432, // Порт PostgreSQL (зазвичай 5432)
});

// Перевірка підключення до бази даних
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Помилка підключення до бази даних:", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release(); // Звільняємо клієнта назад у пул
    if (err) {
      return console.error(
        "Помилка виконання запиту до бази даних:",
        err.stack
      );
    }
    console.log("Успішно підключено до PostgreSQL:", result.rows[0].now);
  });
});

const app = express(); // Ініціалізуємо Express додаток
const server = http.createServer(app); // Створюємо HTTP сервер з Express
const wss = new WebSocketServer({ server }); // Створюємо WebSocket сервер на базі HTTP сервера

// Використання CORS для дозволу запитів з фронтенду
app.use(cors());
app.use(express.json()); // Для парсингу JSON-тіла запитів

// Обробка WebSocket-з'єднань
wss.on("connection", async (ws) => {
  console.log("Новий клієнт підключився до WebSocket");

  try {
    // Завантажуємо і відправляємо існуючі повідомлення з бази даних
    // Вибираємо message_text та created_at
    const res = await pool.query(
      "SELECT message_text, created_at FROM messages ORDER BY created_at ASC"
    );
    res.rows.forEach((row) => {
      // Відправляємо повідомлення як JSON об'єкт, щоб фронтенд міг легко його парсити
      ws.send(
        JSON.stringify({ text: row.message_text, timestamp: row.created_at })
      );
    });
  } catch (err) {
    console.error("Помилка при завантаженні повідомлень з бази даних:", err);
  }

  ws.on("message", async (message) => {
    const messageText = message.toString(); // Перетворюємо буфер у рядок
    console.log("Отримано повідомлення:", messageText);

    try {
      // Зберігаємо нове повідомлення в базу даних
      // created_at буде автоматично встановлено DEFAULT значенням (NOW())
      const res = await pool.query(
        "INSERT INTO messages (message_text) VALUES ($1) RETURNING created_at",
        [messageText]
      );
      console.log("Повідомлення збережено в базу даних");

      // Отримуємо timestamp, який повернула БД
      const timestamp = res.rows[0].created_at;

      // Розсилаємо повідомлення всім підключеним клієнтам (включаючи відправника, якщо потрібно, або виключивши його)
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          // Відправляємо повідомлення у форматі JSON
          client.send(
            JSON.stringify({ text: messageText, timestamp: timestamp })
          );
        }
      });
    } catch (err) {
      console.error("Помилка при збереженні повідомлення в базу даних:", err);
    }
  });

  ws.on("close", () => {
    console.log("Клієнт відключився");
  });

  ws.on("error", (error) => {
    console.error("Помилка WebSocket:", error);
  });
});

// Приклад простого HTTP-маршруту для перевірки роботи сервера
app.get("/", (req, res) => {
  res.send("Сервер працює!");
});

// Додамо API-ендпоінт для отримання всіх повідомлень (якщо потрібно)
app.get("/messages", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT message_text, created_at FROM messages ORDER BY created_at ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Помилка отримання повідомлень:", err);
    res.status(500).send("Помилка сервера");
  }
});

const PORT = process.env.PORT || 3001; // Порт для сервера
server.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
