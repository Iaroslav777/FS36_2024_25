// server.js - Серверна частина Node.js для веб-додатку

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors"); // Для дозволу крос-доменних запитів під час розробки
const path = require("path");

const app = express();
const PORT = 3000;
const FAKE_STORE_API_URL = "https://fakestoreapi.com/products";

let serverProducts = []; // Масив для зберігання продуктів на сервері
const productStock = {}; // Об'єкт для імітації залишків продуктів на складі { productId: quantity }

// --- Middleware ---
app.use(cors()); // Дозволяє запити з будь-якого домену (для розробки)
app.use(bodyParser.json()); // Парсинг JSON-тіла запитів
app.use(express.static(path.join(__dirname, "public"))); // Обслуговування статичних файлів з папки public

// --- Функція для ініціалізації продуктів та їх залишків ---
async function initializeProducts() {
  try {
    const response = await axios.get(FAKE_STORE_API_URL);
    serverProducts = response.data;
    // Імітуємо випадкові залишки для кожного продукту
    serverProducts.forEach((product) => {
      productStock[product.id] = Math.floor(Math.random() * 20) + 5; // Від 5 до 24 одиниць
    });
    console.log("Продукти успішно завантажені та залишки ініціалізовані.");
    console.log("Приклад залишків:", productStock);
  } catch (error) {
    console.error(
      "Помилка завантаження продуктів з Fake Store API:",
      error.message
    );
    serverProducts = []; // Забезпечуємо порожній масив у разі помилки
  }
}

// --- Маршрути API ---

// GET /products - Віддає всі продукти клієнту
app.get("/products", (req, res) => {
  // Додаємо інформацію про залишки до продуктів перед відправкою
  const productsWithStock = serverProducts.map((product) => ({
    ...product,
    availableStock: productStock[product.id] || 0, // Додаємо поле availableStock
  }));
  res.json(productsWithStock);
});

// POST /sort-preference - Приймає переваги сортування від клієнта (для логування)
app.post("/sort-preference", (req, res) => {
  const { sortBy, order } = req.body;
  console.log(`Клієнт відсортував продукти за: ${sortBy}, порядок: ${order}.`);
  // Тут можна було б зберегти цю інформацію в базі даних або логах
  res.status(200).json({ message: "Переваги сортування отримано." });
});

// POST /purchase - Обробка запиту на покупку
app.post("/purchase", (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Невірні дані для покупки." });
  }

  const currentStock = productStock[productId];
  if (currentStock === undefined) {
    return res.status(404).json({ message: "Продукт не знайдено на складі." });
  }

  if (currentStock < quantity) {
    return res
      .status(400)
      .json({
        message: `Недостатньо товару на складі. Доступно: ${currentStock}.`,
      });
  }

  // Імітація покупки: зменшуємо залишок
  productStock[productId] -= quantity;
  console.log(
    `Покупка успішна: ${quantity} одиниць продукту ID ${productId}. Залишок: ${productStock[productId]}`
  );
  res.status(200).json({
    message: "Покупка успішно оформлена!",
    newStock: productStock[productId],
  });
});

// --- Запуск сервера ---
app.listen(PORT, async () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
  await initializeProducts(); // Завантажуємо продукти при старті сервера
});
