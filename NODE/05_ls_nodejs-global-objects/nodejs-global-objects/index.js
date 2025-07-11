// index.js - Все задания Node.js Global Objects and Functions в одном файле

const crypto = require("crypto"); // Для Завдання 7
const dayjs = require("dayjs"); // Для Завдання 1, 4, 10
const chalk = require("chalk"); // Для Завдання 10
const readline = require("readline"); // Для Завдання 8
require("dotenv").config(); // Для Завдання 6: завантажує змінні з .env

// --- Глобальні змінні (Завдання 1, 2, 4, 5, 6, 8, 10) ---
global.callCount = 0; // Завдання 1
global.usersDb = {}; // Завдання 2, 7
global.sessions = {}; // Завдання 4
global.nodeLocalStorage = {}; // Завдання 5
global.nodeExePath = ""; // Завдання 6
global.userStore = {}; // Завдання 8 (для збереження імені користувача)
global.logs = []; // Завдання 10

// --- Завдання 1: Глобальний лічильник викликів функції ---
// Створюємо функцію GreetUser
function greetUser(name) {
  global.callCount++; // Збільшуємо лічильник
  console.log(`Привіт, ${name}!`);
  console.log(`Кількість викликів: ${global.callCount}`);
  logEvent(`Виклик greetUser для ${name}.`); // Логуємо подію (Завдання 10)
}

// --- Завдання 2, 7: Моделювання паролів у базі даних (з хешуванням) ---
// Завдання 7: Зберігаємо користувача з хешованим паролем
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function registerUser(username, password) {
  if (global.usersDb[username]) {
    console.log(`Користувач "${username}" вже існує.`);
    logEvent(`Спроба реєстрації існуючого користувача: ${username}.`);
    return false;
  }
  const hashedPassword = hashPassword(password);
  global.usersDb[username] = { password: hashedPassword };
  console.log(`Користувач "${username}" успішно зареєстрований.`);
  logEvent(`Зареєстровано нового користувача: ${username}.`);
  return true;
}

function verifyPassword(username, password) {
  const user = global.usersDb[username];
  if (!user) {
    console.log("Користувача не знайдено.");
    logEvent(`Спроба входу неіснуючого користувача: ${username}.`);
    return false;
  }
  const hashedPassword = hashPassword(password);
  if (user.password === hashedPassword) {
    console.log("Пароль вірний.");
    return true;
  } else {
    console.log("Невірний пароль.");
    logEvent(`Невірний пароль для користувача: ${username}.`);
    return false;
  }
}

// --- Завдання 3: Читання логіну та паролю з командного рядка ---
// Це буде інтегровано в логіку loginUser та registerUser через process.argv.

// --- Завдання 4: Проста система сесій ---
function generateSessionId() {
  return crypto.randomBytes(16).toString("hex");
}

function loginUser(username, password) {
  if (verifyPassword(username, password)) {
    const sessionId = generateSessionId();
    global.sessions[sessionId] = {
      username: username,
      loginTime: dayjs().format(),
    };
    console.log(
      `Користувач "${username}" успішно увійшов. ID сесії: ${sessionId}`
    );
    logEvent(`Користувач ${username} увійшов (ID сесії: ${sessionId}).`);
    return sessionId;
  }
  logEvent(`Невдала спроба входу для користувача: ${username}.`);
  return null;
}

function logoutUser(sessionId) {
  if (global.sessions[sessionId]) {
    const username = global.sessions[sessionId].username;
    delete global.sessions[sessionId];
    console.log(`Користувач "${username}" вийшов з сесії ${sessionId}.`);
    logEvent(`Користувач ${username} вийшов (ID сесії: ${sessionId}).`);
    return true;
  }
  console.log(`Сесія ${sessionId} не знайдена.`);
  logEvent(`Спроба виходу з неіснуючої сесії: ${sessionId}.`);
  return false;
}

// --- Завдання 5: Моделювання LocalsStorage у Node.js ---
global.nodeLocalStorage.setItem = function (key, value) {
  global.nodeLocalStorage[key] = value;
  console.log(`LocalStorage: встановлено ${key} = ${value}`);
  logEvent(`LocalStorage: setItem ${key}.`);
};

global.nodeLocalStorage.getItem = function (key) {
  const value = global.nodeLocalStorage[key];
  console.log(`LocalStorage: отримано ${key} = ${value}`);
  logEvent(`LocalStorage: getItem ${key}.`);
  return value;
};

global.nodeLocalStorage.removeItem = function (key) {
  if (global.nodeLocalStorage.hasOwnProperty(key)) {
    delete global.nodeLocalStorage[key];
    console.log(`LocalStorage: видалено ${key}`);
    logEvent(`LocalStorage: removeItem ${key}.`);
    return true;
  }
  console.log(`LocalStorage: ключ ${key} не знайдено.`);
  logEvent(`LocalStorage: removeItem - ключ ${key} не знайдено.`);
  return false;
};

// --- Завдання 6: Вивід змінних Process.env та шлях до Node.js ---
function displayEnvInfo() {
  console.log("\n--- Завдання 6: Інформація про середовище ---");
  console.log("Змінні середовища (process.env):");
  for (const key in process.env) {
    // Обмежимо вивід, щоб не захаращувати консоль
    if (
      key.startsWith("NODE_") ||
      key.startsWith("npm_") ||
      key.startsWith("MY_") ||
      key.startsWith("DB_") ||
      key.startsWith("API_KEY")
    ) {
      console.log(`  ${key}: ${process.env[key]}`);
    }
  }

  global.nodeExePath = process.execPath; // Зберігаємо шлях у глобальній змінній
  console.log(`\nШлях до виконуваного файлу Node.js: ${global.nodeExePath}`);
  logEvent(`Виведено інформацію про середовище та шлях до Node.js.`);
}

// --- Завдання 8: Ім'я користувача через Process.stdin та глобальне сховище ---
// Використовуємо readline для інтерактивного введення
function setUsernameInteractive() {
  console.log("\n--- Завдання 8: Встановлення імені користувача ---");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Введіть ваше ім'я користувача: ", (answer) => {
    global.userStore.username = answer;
    console.log(
      `Ім'я користувача "${answer}" збережено у глобальному сховищі.`
    );
    logEvent(`Встановлено ім'я користувача через stdin: ${answer}.`);
    rl.close();
  });
}

function getUsernameFromStore() {
  console.log("\n--- Завдання 8: Отримання імені користувача ---");
  if (global.userStore.username) {
    console.log(
      `Ім'я користувача з глобального сховища: ${global.userStore.username}`
    );
    logEvent(
      `Отримано ім'я користувача з глобального сховища: ${global.userStore.username}.`
    );
  } else {
    console.log("Ім'я користувача не знайдено у глобальному сховищі.");
    logEvent("Спроба отримати ім'я користувача, але його немає в сховищі.");
  }
}

// --- Завдання 9: Очищення глобального сховища користувачів ---
function clearUserStore() {
  global.userStore = {}; // Очищаємо об'єкт
  console.log("\n--- Завдання 9: Глобальне сховище користувачів очищено. ---");
  logEvent("Глобальне сховище користувачів очищено.");
}

// --- Завдання 10: Логування подій у Global.logs та друк історії ---
function logEvent(message) {
  const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
  global.logs.push(`[${timestamp}] ${message}`);
  // Обмежимо розмір логів, щоб не переповнювати пам'ять
  if (global.logs.length > 100) {
    global.logs.shift(); // Видаляємо найстаріший лог
  }
}

function printLogHistory() {
  console.log(chalk.yellow("\n--- Завдання 10: Історія логів ---"));
  if (global.logs.length === 0) {
    console.log("Історія логів порожня.");
  } else {
    global.logs.forEach((logEntry, index) => {
      console.log(chalk.gray(`${index + 1}. ${logEntry}`));
    });
  }
  console.log(chalk.yellow("-----------------------------------"));
}

// --- Головна логіка виконання завдань на основі аргументів CLI ---
async function runTasks() {
  const args = process.argv.slice(2); // Отримуємо аргументи командного рядка
  const command = args[0];

  // Перевірка на флаг --reset (Завдання 9)
  if (args.includes("--reset")) {
    clearUserStore();
    // Виходимо, якщо це єдина дія, або продовжуємо, якщо є інші команди
    if (args.length === 1) return;
  }

  // Виводимо інформацію про середовище при кожному запуску (Завдання 6)
  displayEnvInfo();

  switch (command) {
    case "greet": // Завдання 1
      const name = args[1] || "Гість";
      greetUser(name);
      break;

    case "register": // Завдання 2, 7
      const regUsername = args[1];
      const regPassword = args[2];
      if (regUsername && regPassword) {
        registerUser(regUsername, regPassword);
      } else {
        console.log(
          "Використання: node index.js register <username> <password>"
        );
      }
      break;

    case "login": // Завдання 3, 4, 7
      const loginUsername = args[1];
      const loginPassword = args[2];
      if (loginUsername && loginPassword) {
        loginUser(loginUsername, loginPassword);
      } else {
        console.log("Використання: node index.js login <username> <password>");
      }
      break;

    case "logout": // Завдання 4
      const sessionId = args[1];
      if (sessionId) {
        logoutUser(sessionId);
      } else {
        console.log("Використання: node index.js logout <sessionId>");
      }
      break;

    case "set-storage": // Завдання 5
      const sKey = args[1];
      const sValue = args[2];
      if (sKey && sValue) {
        global.nodeLocalStorage.setItem(sKey, sValue);
      } else {
        console.log("Використання: node index.js set-storage <key> <value>");
      }
      break;

    case "get-storage": // Завдання 5
      const gKey = args[1];
      if (gKey) {
        global.nodeLocalStorage.getItem(gKey);
      } else {
        console.log("Використання: node index.js get-storage <key>");
      }
      break;

    case "remove-storage": // Завдання 5
      const rKey = args[1];
      if (rKey) {
        global.nodeLocalStorage.removeItem(rKey);
      } else {
        console.log("Використання: node index.js remove-storage <key>");
      }
      break;

    case "env-info": // Завдання 6 (викликається автоматично, але можна і вручну)
      // displayEnvInfo() вже викликається на початку
      console.log("Інформація про середовище вже виведена вище.");
      break;

    case "set-username": // Завдання 8
      setUsernameInteractive();
      break;

    case "get-username": // Завдання 8
      getUsernameFromStore();
      break;

    case "print-logs": // Завдання 10
      printLogHistory();
      break;

    default:
      console.log(chalk.green("\n--- Доступні команди CLI ---"));
      console.log(
        chalk.green("  node index.js greet [ім'я]              - Завдання 1")
      );
      console.log(
        chalk.green("  node index.js register <логін> <пароль> - Завдання 2, 7")
      );
      console.log(
        chalk.green(
          "  node index.js login <логін> <пароль>    - Завдання 3, 4, 7"
        )
      );
      console.log(
        chalk.green("  node index.js logout <sessionId>        - Завдання 4")
      );
      console.log(
        chalk.green(
          "  node index.js set-storage <ключ> <значення> - Завдання 5"
        )
      );
      console.log(
        chalk.green("  node index.js get-storage <ключ>        - Завдання 5")
      );
      console.log(
        chalk.green("  node index.js remove-storage <ключ>     - Завдання 5")
      );
      console.log(
        chalk.green(
          "  node index.js env-info                  - Завдання 6 (інфо виводиться автоматично)"
        )
      );
      console.log(
        chalk.green(
          "  node index.js set-username              - Завдання 8 (інтерактивне введення)"
        )
      );
      console.log(
        chalk.green("  node index.js get-username              - Завдання 8")
      );
      console.log(
        chalk.green(
          "  node index.js --reset                   - Завдання 9 (очищає userStore)"
        )
      );
      console.log(
        chalk.green("  node index.js print-logs                - Завдання 10")
      );
      console.log(chalk.green("-----------------------------"));
      break;
  }
}

// Запускаємо головну функцію
runTasks();
