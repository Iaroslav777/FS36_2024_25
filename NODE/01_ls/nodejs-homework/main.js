// main.js - Усі завдання Node.js в одному файлі

const fs = require("fs").promises; // Використовуємо fs.promises для асинхронних операцій
const path = require("path");
const dayjs = require("dayjs"); // Для Завдання 6 та 7, 9
const chalk = require("chalk"); // Для Завдання 7

// --- Загальні допоміжні функції (інтегровані з завдань) ---

/**
 * Завдання 2: Форматує текст: перша літера велика, решта маленькі.
 * @param {string} text Вхідний текст.
 * @returns {string} Відформатований текст.
 */
function formatText(text) {
  if (!text || typeof text !== "string") {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Завдання 6: Повертає поточну дату та час у форматі "DD/MM/YYYY HH:mm:ss".
 * @returns {string} Відформатована дата та час.
 */
function getFormattedTime() {
  return dayjs().format("DD/MM/YYYY HH:mm:ss");
}

/**
 * Завдання 9: Реалізує простий логер, який записує повідомлення у файл app.log.
 * Повідомлення містить час, рівень логування (info, warn, error) та сам текст.
 * @param {string} level Рівень логування (info, warn, error).
 * @param {string} message Текст повідомлення.
 */
async function log(level, message) {
  const logFilePath = path.join(__dirname, "app.log");
  const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

  try {
    await fs.appendFile(logFilePath, logEntry, "utf8");
    // console.log(`Лог записано: ${logEntry.trim()}`); // Для відладки
  } catch (error) {
    console.error("Помилка запису логу у файл:", error);
  }
}

const logger = {
  // Об'єкт логера для зручності
  info: (message) => log("info", message),
  warn: (message) => log("warn", message),
  error: (message) => log("error", message),
};

/**
 * Завдання 10: Повертає об'єкт конфігурації зі змінних середовища.
 * Встановлює значення за замовчуванням, якщо змінні не передано.
 * @returns {object} Об'єкт конфігурації.
 */
function getEnvConfig() {
  return {
    NODE_ENV: process.env.NODE_ENV || "development", // За замовчуванням 'development'
    PORT: parseInt(process.env.PORT || "3000", 10), // За замовчуванням 3000, парсимо як число
    API_KEY: process.env.API_KEY || "default_api_key_123", // За замовчуванням 'default_api_key_123'
  };
}

// --- Функції для виконання кожного завдання ---

// Завдання 1: Створити файл логу
async function createTaskLog(directoryPath) {
  const fileName = "log.txt";
  const logMessage = "Лог створено";
  const targetPath = directoryPath
    ? path.resolve(directoryPath)
    : process.cwd();
  const filePath = path.join(targetPath, fileName);

  try {
    await fs.mkdir(targetPath, { recursive: true });
    await fs.writeFile(filePath, logMessage);
    console.log(
      `Файл логу "${fileName}" успішно створено у директорії: ${targetPath}`
    );
    logger.info(`Створено лог файл у ${targetPath}`);
  } catch (err) {
    console.error(`Помилка при створенні лог файлу:`, err);
    logger.error(`Помилка створення лог файлу: ${err.message}`);
  }
}

// Завдання 3: Вивід та сортування ключів глобального об'єкта
async function processGlobalKeys() {
  const globalKeys = Object.keys(global);
  globalKeys.sort((a, b) => a.length - b.length);
  const contentToWrite = globalKeys.join("\n");
  const filePath = path.join(__dirname, "globals.txt");

  try {
    await fs.writeFile(filePath, contentToWrite, "utf8");
    console.log(
      `Усі ключі глобального об'єкта відсортовано за довжиною та збережено у файлі: ${filePath}`
    );
    logger.info(`Оновлено globals.txt`);
  } catch (err) {
    console.error("Помилка при записі у файл globals.txt:", err);
    logger.error(`Помилка запису globals.txt: ${err.message}`);
  }
}

// Завдання 4: CLI-утиліта для обробки файлів
async function processFiles(srcPath, destPath) {
  const sourceFilePath = path.resolve(srcPath);
  const destFilePath = path.resolve(destPath);

  try {
    const data = await fs.readFile(sourceFilePath, "utf8");
    const processedText = data.replace(/test/g, "exam"); // Заміна "test" на "exam"
    await fs.writeFile(destFilePath, processedText, "utf8");
    console.log(
      `Файл успішно оброблено. Результат збережено у: ${destFilePath}`
    );
    logger.info(`Обробка файлу з ${srcPath} до ${destPath}`);
  } catch (err) {
    console.error(`Помилка обробки файлу:`, err);
    logger.error(`Помилка обробки файлу ${srcPath}: ${err.message}`);
  }
}

// Завдання 5: Зчитування package.json та вивід автора
async function readPackageAuthor() {
  const packageJsonPath = path.join(__dirname, "package.json");
  try {
    const data = await fs.readFile(packageJsonPath, "utf8");
    const packageData = JSON.parse(data);
    const projectAuthor = packageData.projectAuthor;

    if (projectAuthor) {
      console.log(`Привіт від автора проекту: ${projectAuthor}!`);
      logger.info(`Виведено автора проекту: ${projectAuthor}`);
    } else {
      console.log('Поле "projectAuthor" не знайдено у package.json.');
      logger.warn('Поле "projectAuthor" відсутнє.');
    }
  } catch (err) {
    console.error("Помилка читання/парсингу package.json:", err);
    logger.error(`Помилка читання package.json: ${err.message}`);
  }
}

// Завдання 8: Копіювання файлів
async function copyFiles(inputDirName = "input", outputDirName = "output") {
  const inputDir = path.join(__dirname, inputDirName);
  const outputDir = path.join(__dirname, outputDirName);

  try {
    await fs.mkdir(outputDir, { recursive: true });
    console.log(`Директорія "${outputDir}" перевірена/створена.`);
    logger.info(`Директорія ${outputDir} готова.`);

    const files = await fs.readdir(inputDir);
    console.log(`Знайдено файлів у "${inputDir}": ${files.length}`);
    logger.info(`Знайдено ${files.length} файлів у ${inputDir}`);

    if (files.length === 0) {
      console.log("Директорія input порожня. Немає файлів для копіювання.");
      logger.warn("Директорія input порожня.");
      return;
    }

    for (const file of files) {
      const sourceFilePath = path.join(inputDir, file);
      const destinationFilePath = path.join(outputDir, file);

      const stats = await fs.stat(sourceFilePath);
      if (stats.isFile()) {
        await fs.copyFile(sourceFilePath, destinationFilePath);
        console.log(`Скопійовано: "${file}" до "${outputDir}"`);
        logger.info(`Скопійовано ${file}`);
      } else {
        console.log(`Пропущено директорію: "${file}"`);
        logger.info(`Пропущено директорію ${file}`);
      }
    }
    console.log("Копіювання файлів завершено.");
    logger.info("Копіювання файлів завершено.");
  } catch (error) {
    console.error("Помилка під час копіювання файлів:", error);
    logger.error(`Помилка копіювання файлів: ${error.message}`);
  }
}

// --- Головна логіка виконання завдань на основі аргументів CLI ---

async function runTasks() {
  const args = process.argv.slice(2); // Отримуємо аргументи командного рядка

  // Завдання 7: Вивід поточної дати та повідомлення про зміну файлу з кольором
  // Цей блок виконується завжди при запуску main.js (особливо з nodemon)
  console.log(
    chalk.green(`[${getFormattedTime()}] main.js запущено / Файл змінено!`)
  );
  logger.info("main.js запущено / Файл змінено");
  await processGlobalKeys(); // Виконуємо Завдання 3 при кожному запуску/зміні для nodemon.json

  // Завдання 10: Вивід конфігурації середовища
  const config = getEnvConfig();
  console.log(chalk.cyan("\n--- Конфігурація середовища (Завдання 10) ---"));
  console.log(chalk.cyan(`NODE_ENV: ${config.NODE_ENV}`));
  console.log(chalk.cyan(`PORT: ${config.PORT}`));
  console.log(chalk.cyan(`API_KEY: ${config.API_KEY}`));
  console.log(chalk.cyan("----------------------------------------------"));
  logger.info(
    `Конфігурація середовища: NODE_ENV=${config.NODE_ENV}, PORT=${config.PORT}`
  );

  // Обробка CLI команд для конкретних завдань
  const command = args[0];

  switch (command) {
    case "create-log": // Завдання 1
      const dirPath = args[1];
      await createTaskLog(dirPath);
      break;

    case "greet-user": // Завдання 2
      const userName = args[1];
      if (userName) {
        const formattedName = formatText(userName);
        console.log(`Привіт, ${formattedName}! (Завдання 2)`);
        logger.info(`Привітання користувача: ${formattedName}`);
      } else {
        console.log(
          "Будь ласка, передайте ім'я користувача як аргумент. Використання: node main.js greet-user John"
        );
        logger.warn("Спроба привітати користувача без імені.");
      }
      break;

    case "process-file": // Завдання 4
      const srcIndex = args.indexOf("--src");
      const destIndex = args.indexOf("--dest");
      if (
        srcIndex !== -1 &&
        destIndex !== -1 &&
        args[srcIndex + 1] &&
        args[destIndex + 1]
      ) {
        await processFiles(args[srcIndex + 1], args[destIndex + 1]);
      } else {
        console.log(
          "Використання: node main.js process-file --src <вихідний_файл> --dest <цільовий_файл>"
        );
        logger.warn("Некоректні аргументи для process-file.");
      }
      break;

    case "read-author": // Завдання 5
      await readPackageAuthor();
      break;

    case "copy-files": // Завдання 8
      const inputDirArg = args[1]; // Опційний аргумент для input директорії
      const outputDirArg = args[2]; // Опційний аргумент для output директорії
      await copyFiles(inputDirArg, outputDirArg);
      break;

    case "show-time": // Завдання 6 (додатковий спосіб демонстрації)
      console.log(
        `Поточна відформатована дата та час: ${getFormattedTime()} (Завдання 6)`
      );
      logger.info(`Показано поточний час: ${getFormattedTime()}`);
      break;

    case "test-logger": // Завдання 9 (додатковий спосіб демонстрації)
      logger.info("Це інформаційне повідомлення з CLI.");
      logger.warn("Це попередження з CLI!");
      logger.error("Сталася критична помилка з CLI!");
      console.log(
        "Повідомлення логера відправлені у app.log (перевірте файл)."
      );
      break;

    default:
      if (command) {
        console.log(`Невідома команда: "${command}"`);
      }
      console.log(
        chalk.yellow(
          "\n--- Доступні команди CLI (node main.js <команда> [аргументи]) ---"
        )
      );
      console.log(
        chalk.yellow("  create-log [шлях/до/директорії] - Завдання 1")
      );
      console.log(chalk.yellow("  greet-user <ім'я> - Завдання 2"));
      console.log(
        chalk.yellow("  process-file --src <файл> --dest <файл> - Завдання 4")
      );
      console.log(chalk.yellow("  read-author - Завдання 5"));
      console.log(
        chalk.yellow("  copy-files [input_dir] [output_dir] - Завдання 8")
      );
      console.log(chalk.yellow("  show-time - Завдання 6 (демонстрація часу)"));
      console.log(
        chalk.yellow("  test-logger - Завдання 9 (демонстрація логера)")
      );
      console.log(chalk.yellow("\nДля Завдання 7 (nodemon): npm run dev"));
      console.log(
        chalk.yellow(
          "Для Завдання 3 (globals.txt): виконується автоматично при кожному запуску main.js"
        )
      );
      console.log(
        chalk.yellow(
          "Для Завдання 10 (.env): змінні середовища зчитуються автоматично при кожному запуску main.js"
        )
      );
      break;
  }
}

// Запускаємо головну функцію
runTasks();
