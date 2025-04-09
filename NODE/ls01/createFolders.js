const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

console.log("Базова директорія:", baseDir);


const folders = ["utils", "data", "logs"];

folders.forEach((folder) => {
  const folderPath = path.join(baseDir, folder);
  console.log(`Відносний шлях до ${folder}:`, folderPath);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Створено папку: ${folder}`);
  } else {
    console.log(`Папка ${folder} вже існує`);
  }
});
