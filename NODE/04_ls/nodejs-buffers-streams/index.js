// index.js - Все задания Node.js Buffers and Streams в одном файле

const fs = require("fs").promises; // Используем fs.promises для асинхронных операций
const fsSync = require("fs"); // Для синхронных операций, где это явно указано (например, readdirSync)
const path = require("path");
const dayjs = require("dayjs"); // Для Задания 5 и 6

// --- Задание 1: Запись буфера в файл и вывод его длины ---
// Создайте функцию, которая принимает буфер, записывает его в файл buffer_output.txt
// и выводит его длину в байтах.
async function writeBufferToFileAndGetLength(inputString) {
  console.log("\n--- Задание 1: Запись буфера и длина ---");
  const buffer = Buffer.from(inputString, "utf8"); // Создаем буфер из строки
  const filePath = path.join(__dirname, "buffer_output.txt");

  try {
    await fs.writeFile(filePath, buffer);
    console.log(`Буфер успешно записан в ${filePath}`);
    console.log(`Длина буфера в байтах: ${buffer.length}`);
  } catch (error) {
    console.error("Ошибка при записи буфера:", error);
  }
}

// --- Задание 2: Конкатенация двух буферов ---
// Создайте два буфера с разными словами, подключите их в третий буфер и
// выведите результат в консоли. Запишите результат в файле.
function concatenateBuffers() {
  console.log("\n--- Задание 2: Конкатенация буферов ---");
  const buffer1 = Buffer.from("Привет, ");
  const buffer2 = Buffer.from("Node.js!");
  const concatenatedBuffer = Buffer.concat([buffer1, buffer2]);
  const filePath = path.join(__dirname, "concatenated_buffer.txt");

  console.log("Результат конкатенации:", concatenatedBuffer.toString("utf8"));

  try {
    fsSync.writeFileSync(filePath, concatenatedBuffer); // Используем синхронную запись по требованию
    console.log(`Сконкатенированный буфер записан в ${filePath}`);
  } catch (error) {
    console.error("Ошибка при записи сконкатенированного буфера:", error);
  }
}

// --- Задание 3: Сравнение содержимого двух файлов ---
// Прочитайте два файла (например, A.txt и B.txt) в форме буферов и вывода,
// который из них "больше" в соответствии с байтовым сравнением.
async function compareFiles() {
  console.log("\n--- Задание 3: Сравнение файлов ---");
  const fileAPath = path.join(__dirname, "A.txt");
  const fileBPath = path.join(__dirname, "B.txt");

  try {
    const bufferA = fsSync.readFileSync(fileAPath); // Используем синхронное чтение по требованию
    const bufferB = fsSync.readFileSync(fileBPath);

    const comparisonResult = Buffer.compare(bufferA, bufferB);

    if (comparisonResult < 0) {
      console.log(
        `Файл A.txt (${bufferA.toString()}) меньше, чем файл B.txt (${bufferB.toString()}) (побайтово).`
      );
    } else if (comparisonResult > 0) {
      console.log(
        `Файл A.txt (${bufferA.toString()}) больше, чем файл B.txt (${bufferB.toString()}) (побайтово).`
      );
    } else {
      console.log(
        `Файлы A.txt (${bufferA.toString()}) и B.txt (${bufferB.toString()}) идентичны (побайтово).`
      );
    }
  } catch (error) {
    console.error(
      "Ошибка при сравнении файлов. Убедитесь, что A.txt и B.txt существуют:",
      error
    );
  }
}

// --- Задание 4: Чтение большого файла по частям (читаемый поток) ---
// Прочитайте большой текстовый файл через createReadStream,
// выводя каждый кусок в консоль в верхнем регистре.
async function readLargeFileInChunks() {
  console.log("\n--- Задание 4: Чтение большого файла по частям ---");
  const largeFilePath = path.join(__dirname, "large_file.txt");

  try {
    const readStream = fsSync.createReadStream(largeFilePath, {
      encoding: "utf8",
      highWaterMark: 16 * 1024,
    }); // Читаем по 16KB

    readStream.on("data", (chunk) => {
      console.log(chunk.toString().toUpperCase()); // Выводим каждый кусок в верхнем регистре
    });

    readStream.on("end", () => {
      console.log("\nЧтение большого файла завершено.");
    });

    readStream.on("error", (error) => {
      console.error("Ошибка при чтении большого файла:", error);
    });
  } catch (error) {
    console.error(
      "Ошибка при создании потока чтения. Убедитесь, что large_file.txt существует:",
      error
    );
  }
}

// --- Задание 5: Log-система для записи событий ---
// Создайте функцию log(message), которая добавляет сообщение с TimeStamp в файл log.txt,
// не перезаписывая контент.
async function logMessage(message) {
  console.log("\n--- Задание 5: Система логирования ---");
  const logFilePath = path.join(__dirname, "log.txt");
  const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const logEntry = `[${timestamp}] ${message}\n`;

  try {
    await fs.appendFile(logFilePath, logEntry, "utf8");
    console.log(`Сообщение "${message}" добавлено в ${logFilePath}`);
  } catch (error) {
    console.error("Ошибка при записи лога:", error);
  }
}

// --- Задание 6: Удаление файлов в папке ---
// Создайте скрипт, который считывает все файлы в temp/ и удаляет их,
// если они старше 2 минут.
async function cleanTempDirectory() {
  console.log("\n--- Задание 6: Удаление старых файлов ---");
  const tempDirPath = path.join(__dirname, "temp");
  const twoMinutesAgo = dayjs().subtract(2, "minute"); // Момент времени 2 минуты назад

  try {
    const files = await fs.readdir(tempDirPath);
    console.log(`Найдено файлов в ${tempDirPath}: ${files.length}`);

    if (files.length === 0) {
      console.log("Директория temp/ пуста. Нет файлов для удаления.");
      return;
    }

    for (const file of files) {
      const filePath = path.join(tempDirPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        // Убедимся, что это файл, а не поддиректория
        const modifiedTime = dayjs(stats.mtime); // Время последней модификации файла

        if (modifiedTime.isBefore(twoMinutesAgo)) {
          await fs.unlink(filePath);
          console.log(
            `Удален старый файл: ${file} (модифицирован: ${modifiedTime.format(
              "HH:mm:ss"
            )})`
          );
        } else {
          console.log(
            `Файл ${file} новый (модифицирован: ${modifiedTime.format(
              "HH:mm:ss"
            )}), пропущен.`
          );
        }
      }
    }
    console.log("Проверка и удаление старых файлов завершены.");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(
        `Директория temp/ не найдена. Создайте ее и добавьте файлы для тестирования.`
      );
    } else {
      console.error("Ошибка при очистке директории temp/:", error);
    }
  }
}

// --- Запуск всех заданий ---
async function runAllTasks() {
  await writeBufferToFileAndGetLength("Это тестовая строка для буфера.");
  concatenateBuffers();
  await compareFiles();
  await readLargeFileInChunks(); // Этот поток будет выводить данные по мере чтения
  await logMessage("Это первое тестовое сообщение.");
  await logMessage("Это второе тестовое сообщение.");
  await cleanTempDirectory();
}

runAllTasks();
