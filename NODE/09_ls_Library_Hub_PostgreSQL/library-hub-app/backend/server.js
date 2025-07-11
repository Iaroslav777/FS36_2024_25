// backend/server.js - Серверна частина Node.js для Library Hub

const http = require("http");
const { URL } = require("url");
const { Client } = require("pg"); // PostgreSQL клієнт
const dayjs = require("dayjs"); // Для логування часу
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
}); // Завантажуємо .env з кореневої папки

const PORT = process.env.BACKEND_PORT || 3000;

// Створюємо єдиний екземпляр PG.Client
const pgClient = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// --- Допоміжні функції ---

// Логування кожного запиту
function logRequest(method, urlPath) {
  const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(`[${timestamp}] Запит: ${method} ${urlPath}`);
}

// Обробка CORS заголовків
function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Дозволяємо тільки фронтенд порт Vite
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400"); // Кешування preflight-запитів на 24 години
}

// Парсинг JSON тіла запиту
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Невірний формат JSON"));
      }
    });
    req.on("error", reject);
  });
}

// --- Маршрути API ---

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathSegments = parsedUrl.pathname
    .split("/")
    .filter((segment) => segment); // Розбиваємо шлях на сегменти
  const [resource, id] = pathSegments; // Очікуємо /books або /books/:id

  logRequest(req.method, req.url); // Логуємо кожен запит
  setCorsHeaders(res); // Встановлюємо CORS заголовки

  // Обробка OPTIONS-запитів (preflight)
  if (req.method === "OPTIONS") {
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  // GET /books - Повертає список усіх книг з пагінацією
  if (req.method === "GET" && resource === "books" && !id) {
    const page = parseInt(parsedUrl.searchParams.get("page")) || 1;
    const limit = parseInt(parsedUrl.searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    try {
      const result = await pgClient.query(
        "SELECT * FROM books ORDER BY id OFFSET $1 LIMIT $2",
        [offset, limit]
      );
      const totalBooksResult = await pgClient.query(
        "SELECT COUNT(*) FROM books"
      );
      const totalBooks = parseInt(totalBooksResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalBooks / limit);

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({
          books: result.rows,
          currentPage: page,
          totalPages: totalPages,
          totalBooks: totalBooks,
        })
      );
    } catch (error) {
      console.error("Помилка при отриманні книг:", error);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({ message: "Помилка сервера при отриманні книг." })
      );
    }
    return;
  }

  // GET /books/:id - Повертає одну книгу за ID
  if (req.method === "GET" && resource === "books" && id) {
    try {
      const result = await pgClient.query("SELECT * FROM books WHERE id = $1", [
        id,
      ]);
      if (result.rows.length > 0) {
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify(result.rows[0]));
      } else {
        res.writeHead(404, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify({ message: "Книгу не знайдено." }));
      }
    } catch (error) {
      console.error("Помилка при отриманні книги за ID:", error);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({ message: "Помилка сервера при отриманні книги." })
      );
    }
    return;
  }

  // POST /books - Додає нову книгу
  if (req.method === "POST" && resource === "books" && !id) {
    try {
      const { title, author, publication_year, rating } = await getRequestBody(
        req
      );

      // Валідація полів
      if (!title || !author || !publication_year || !rating) {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({
            message:
              "Всі поля (title, author, publication_year, rating) є обов'язковими.",
          })
        );
        return;
      }
      if (
        typeof title !== "string" ||
        typeof author !== "string" ||
        typeof publication_year !== "number" ||
        typeof rating !== "number"
      ) {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({ message: "Невірний тип даних для одного з полів." })
        );
        return;
      }
      if (rating < 1 || rating > 5) {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({ message: "Рейтинг повинен бути від 1 до 5." })
        );
        return;
      }

      const result = await pgClient.query(
        "INSERT INTO books (title, author, publication_year, rating) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, author, publication_year, rating]
      );
      res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(result.rows[0]));
    } catch (error) {
      console.error("Помилка при додаванні книги:", error);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({ message: "Помилка сервера при додаванні книги." })
      );
    }
    return;
  }

  // PUT /books/:id - Редагує існуючу книгу
  if (req.method === "PUT" && resource === "books" && id) {
    try {
      const { title, author, publication_year, rating } = await getRequestBody(
        req
      );

      // Валідація полів (якщо вони присутні, перевіряємо їх)
      if (!title && !author && !publication_year && !rating) {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({
            message: "Хоча б одне поле для оновлення повинно бути надано.",
          })
        );
        return;
      }

      const fields = [];
      const values = [];
      let paramIndex = 1;

      if (title !== undefined) {
        fields.push(`title = $${paramIndex++}`);
        values.push(title);
      }
      if (author !== undefined) {
        fields.push(`author = $${paramIndex++}`);
        values.push(author);
      }
      if (publication_year !== undefined) {
        if (typeof publication_year !== "number") {
          res.writeHead(400, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(
            JSON.stringify({ message: "publication_year має бути числом." })
          );
          return;
        }
        fields.push(`publication_year = $${paramIndex++}`);
        values.push(publication_year);
      }
      if (rating !== undefined) {
        if (typeof rating !== "number" || rating < 1 || rating > 5) {
          res.writeHead(400, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(
            JSON.stringify({ message: "Рейтинг має бути числом від 1 до 5." })
          );
          return;
        }
        fields.push(`rating = $${paramIndex++}`);
        values.push(rating);
      }

      if (fields.length === 0) {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify({ message: "Немає полів для оновлення." }));
        return;
      }

      values.push(id); // ID завжди останній параметр
      const queryText = `UPDATE books SET ${fields.join(
        ", "
      )} WHERE id = $${paramIndex} RETURNING *`;

      const result = await pgClient.query(queryText, values);

      if (result.rows.length > 0) {
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify(result.rows[0]));
      } else {
        res.writeHead(404, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({ message: "Книгу не знайдено для оновлення." })
        );
      }
    } catch (error) {
      console.error("Помилка при редагуванні книги:", error);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({ message: "Помилка сервера при редагуванні книги." })
      );
    }
    return;
  }

  // DELETE /books/:id - Видаляє книгу
  if (req.method === "DELETE" && resource === "books" && id) {
    try {
      const result = await pgClient.query(
        "DELETE FROM books WHERE id = $1 RETURNING id",
        [id]
      );
      if (result.rows.length > 0) {
        res.writeHead(204); // No Content
        res.end();
      } else {
        res.writeHead(404, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({ message: "Книгу не знайдено для видалення." })
        );
      }
    } catch (error) {
      console.error("Помилка при видаленні книги:", error);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({ message: "Помилка сервера при видаленні книги." })
      );
    }
    return;
  }

  // Якщо маршрут не знайдено
  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ message: "Маршрут не знайдено." }));
});

// --- Запуск сервера ---
server.listen(PORT, async () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
  try {
    await pgClient.connect(); // Підключаємося до бази даних при старті сервера
    console.log("Підключено до PostgreSQL.");
  } catch (err) {
    console.error("Помилка підключення до PostgreSQL:", err.message);
    process.exit(1); // Виходимо, якщо не вдалося підключитися до БД
  }
});

// Обробка завершення процесу для закриття з'єднання з БД
process.on("SIGINT", async () => {
  console.log("Сервер завершує роботу...");
  await pgClient.end();
  console.log("Відключено від PostgreSQL.");
  process.exit(0);
});
