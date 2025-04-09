const fs = require("fs");
const path = require("path");

const fileName = process.argv[2];

if (!fileName) {
  console.log("Вкажи ім'я файлу як аргумент!");
  process.exit();
}

const filePath = path.join(__dirname, `${fileName}.js`);

if (fs.existsSync(filePath)) {
  console.log("Файл вже існує!");
} else {
  fs.writeFileSync(filePath, 'console.log("Програма створена автоматично");');
  console.log(`Файл ${fileName}.js створено`);
}
