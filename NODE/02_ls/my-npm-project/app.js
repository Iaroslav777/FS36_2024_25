// app.js - Основний файл для демонстрації NPM та завдань 5, 6

const fs = require("fs").promises; // Для читання package.json
const path = require("path");
const dayjs = require("dayjs"); // Встановлений через NPM

// --- Завдання 6: Функція для отримання відформатованого часу ---
/**
 * Повертає поточну дату та час у форматі "DD/MM/YYYY HH:mm:ss".
 * @returns {string} Відформатована дата та час.
 */
function getFormattedTime() {
  return dayjs().format("DD/MM/YYYY HH:mm:ss");
}

// --- Завдання 5: Скрипт для читання package.json та виводу автора ---
async function readPackageAuthor() {
  const packageJsonPath = path.join(__dirname, "package.json");
  try {
    const data = await fs.readFile(packageJsonPath, "utf8");
    const packageData = JSON.parse(data);
    const projectAuthor = packageData.projectAuthor;

    if (projectAuthor) {
      console.log(`Привіт від автора проекту: ${projectAuthor}!`);
    } else {
      console.log('Поле "projectAuthor" не знайдено у package.json.');
    }
  } catch (err) {
    console.error("Помилка читання/парсингу package.json:", err);
  }
}

// --- Головна логіка запуску ---
// Перевіряємо аргументи командного рядка для виконання конкретних завдань
const args = process.argv.slice(2);

if (args[0] === "greet-author") {
  readPackageAuthor(); // Виконуємо завдання 5
} else {
  console.log(
    `Поточна відформатована дата та час (Завдання 6): ${getFormattedTime()}`
  );
  console.log("\nВикористання:");
  console.log("  node app.js                   - показує поточний час");
  console.log(
    "  npm run greet                 - показує привітання від автора з package.json"
  );
}
