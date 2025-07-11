// index.js - Все задания Node.js Event Emitter в одном файле

const EventEmitter = require('events');

// --- 1. Будильник ---
// Создайте класс AlarmClock, который имеет событие "ring".
// После вызова метода start(), через 5 секунд должно произойти событие "ring",
// и консоль должна вывести "Просыпаться!".
class AlarmClock extends EventEmitter {
  start() {
    console.log('Будильник запущен. Ждем 5 секунд...');
    setTimeout(() => {
      this.emit('ring');
    }, 5000);
  }
}

console.log('--- Задание 1: Будильник ---');
const alarm = new AlarmClock();
alarm.on('ring', () => {
  console.log('Просыпаться!');
});
alarm.start();
console.log('\n'); // Для разделения вывода

// --- 2. Покупки в интернет-магазине ---
// Создать класс ShoppingCart.
// Каждый раз, когда добавляется новый продукт, необходимо запустить событие "itemAdded",
// которое получает сообщение с именем продукта и общей стоимостью заказа.
class ShoppingCart extends EventEmitter {
  constructor() {
    super();
    this.totalOrder = 0;
  }

  addProduct(productName, price) {
    this.totalOrder += price;
    this.emit('itemAdded', productName, this.totalOrder);
  }
}

console.log('--- Задание 2: Покупки в интернет-магазине ---');
const cart = new ShoppingCart();
cart.on('itemAdded', (productName, total) => {
  console.log(`Добавлен продукт: "${productName}". Общая сумма заказа: ${total} грн.`);
});
cart.addProduct('Ноутбук', 25000);
cart.addProduct('Мышь', 800);
cart.addProduct('Клавиатура', 1500);
console.log('\n');

// --- 3. Загрузка файла ---
// Создайте класс FileDownloader, который через некоторые интервалы излучит событие "progress"
// с процентом прогресса. Когда прогресс достигает 100%, событие "completed" должно сработать.
class FileDownloader extends EventEmitter {
  startDownload(fileSize) {
    let downloaded = 0;
    const interval = setInterval(() => {
      downloaded += fileSize / 10; // Симулируем загрузку 10% файла за интервал
      let progress = Math.min(100, Math.round((downloaded / fileSize) * 100));
      this.emit('progress', progress);

      if (progress >= 100) {
        clearInterval(interval);
        this.emit('completed');
      }
    }, 500); // Обновляем прогресс каждые 0.5 секунды
  }
}

console.log('--- Задание 3: Загрузка файла ---');
const downloader = new FileDownloader();
downloader.on('progress', (percent) => {
  console.log(`Загрузка: ${percent}%`);
});
downloader.on('completed', () => {
  console.log('Загрузка файла завершена!');
});
downloader.startDownload(1000); // Размер файла для симуляции
console.log('\n');

// --- 4. Подписка на новости ---
// Создать класс Newsletter.
// Пользователи могут подписаться методом subscribe().
// Когда появляется новая статья, все подписчики должны получить заголовок.
class Newsletter extends EventEmitter {
  subscribe(subscriberName) {
    // Каждый подписчик - это отдельный слушатель на событие 'newArticle'
    this.on('newArticle', (title) => {
      console.log(`[${subscriberName}] Получено уведомление о новой статье: "${title}"`);
    });
    console.log(`${subscriberName} подписался на рассылку.`);
  }

  publishArticle(title) {
    console.log(`Опубликована новая статья: "${title}"`);
    this.emit('newArticle', title);
  }
}

console.log('--- Задание 4: Подписка на новости ---');
const news = new Newsletter();
news.subscribe('Иван');
news.subscribe('Мария');
news.publishArticle('Node.js Event Emitter: Глубокое погружение');
news.publishArticle('React Hooks: Что нового?');
console.log('\n');

// --- 5. Блокировка банковской карты ---
// Создайте класс BankCard.
// Если введены 3 неверных PIN-кода, событие "blocked" должно сработать
// с сообщением о блокировке карты.
class BankCard extends EventEmitter {
  constructor() {
    super();
    this.incorrectAttempts = 0;
    this.isBlocked = false;
    this.MAX_ATTEMPTS = 3;
  }

  enterPin(pin) {
    if (this.isBlocked) {
      console.log('Карта уже заблокирована.');
      return;
    }

    const correctPin = '1234'; // Пример правильного PIN-кода

    if (pin === correctPin) {
      this.incorrectAttempts = 0;
      console.log('PIN-код верный. Доступ разрешен.');
    } else {
      this.incorrectAttempts++;
      console.log(`Неверный PIN-код. Осталось попыток: ${this.MAX_ATTEMPTS - this.incorrectAttempts}`);
      if (this.incorrectAttempts >= this.MAX_ATTEMPTS) {
        this.isBlocked = true;
        this.emit('blocked', 'Карта заблокирована из-за 3 неверных PIN-кодов.');
      }
    }
  }
}

console.log('--- Задание 5: Блокировка банковской карты ---');
const card = new BankCard();
card.on('blocked', (message) => {
  console.log(`ВНИМАНИЕ: ${message}`);
});
card.enterPin('0000');
card.enterPin('1111');
card.enterPin('2222'); // Это должна быть 3-я неверная попытка
card.enterPin('1234'); // Попытка после блокировки
console.log('\n');

// --- 6. Регистрация нового пользователя ---
// Создайте класс RegistrationSystem.
// Когда пользователь зарегистрирован, событие "userRegistered" должно быть изложено.
// Отдельно напишите слушателя, который после регистрации отправляет приветственное письмо по электронной почте.
class RegistrationSystem extends EventEmitter {
  registerUser(username, email) {
    console.log(`Пользователь ${username} (${email}) пытается зарегистрироваться...`);
    // Имитация процесса регистрации
    if (username && email) {
      this.emit('userRegistered', { username, email });
    } else {
      console.log('Ошибка регистрации: не указаны имя пользователя или email.');
    }
  }
}

console.log('--- Задание 6: Регистрация нового пользователя ---');
const registration = new RegistrationSystem();
// Слушатель для отправки приветственного письма
registration.on('userRegistered', (user) => {
  console.log(`Отправляем приветственное письмо на ${user.email} для ${user.username}.`);
});
registration.registerUser('Петр', 'petr@example.com');
registration.registerUser('Анна', 'anna@example.com');
console.log('\n');

// --- 7. Чат ---
// Создайте класс Chat.
// Когда появляется новое сообщение ("message"), нужно отобразить имя отправителя и текст сообщения.
class Chat extends EventEmitter {
  sendMessage(sender, text) {
    this.emit('message', sender, text);
  }
}

console.log('--- Задание 7: Чат ---');
const chatRoom = new Chat();
chatRoom.on('message', (sender, text) => {
  console.log(`[${sender}]: ${text}`);
});
chatRoom.sendMessage('Алекс', 'Привет всем!');
chatRoom.sendMessage('Елена', 'Как дела?');
console.log('\n');

// --- 8. Управление движением (Network Monitor) ---
// Создать класс NetworkMonitor.
// Когда скорость Интернета падает ниже 10 Мбит/с, должно запускается событие
// "slowConnection", которое сообщает о плохом соединении.
class NetworkMonitor extends EventEmitter {
  checkSpeed(speedMbps) {
    console.log(`Текущая скорость интернета: ${speedMbps} Мбит/с`);
    if (speedMbps < 10) {
      this.emit('slowConnection', `Плохое соединение: скорость ${speedMbps} Мбит/с (ниже 10 Мбит/с).`);
    } else {
      console.log('Соединение стабильное.');
    }
  }
}

console.log('--- Задание 8: Управление движением (Network Monitor) ---');
const monitor = new NetworkMonitor();
monitor.on('slowConnection', (message) => {
  console.warn(`ПРЕДУПРЕЖДЕНИЕ: ${message}`);
});
monitor.checkSpeed(15);
monitor.checkSpeed(8);
monitor.checkSpeed(22);
monitor.checkSpeed(5);
console.log('\n');

// --- 9. Игровой турнир ---
// Создайте класс Tournament.
// Каждый раз, когда игрок выигрывает игру, выпускается событие "playerWon".
class Tournament extends EventEmitter {
  recordWin(playerName) {
    console.log(`Игрок ${playerName} только что выиграл игру.`);
    this.emit('playerWon', playerName);
  }
}

console.log('--- Задание 9: Игровой турнир ---');
const gameTournament = new Tournament();
gameTournament.on('playerWon', (winner) => {
  console.log(`Поздравляем! Игрок ${winner} выиграл игру!`);
});
gameTournament.recordWin('Герой');
gameTournament.recordWin('Чемпион');
console.log('\n');

