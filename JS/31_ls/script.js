// Функція генерації таблиці
function generateTable(rows, cols, tableDOM) {
  for (let r = 1; r <= rows; r++) {
    const newRow = document.createElement("tr");
    for (let c = 1; c <= cols; c++) {
      const newCell = document.createElement("td");
      newCell.textContent = `${r}.${c}`;
      newCell.onclick = handleCellClick;
      newRow.appendChild(newCell);
    }
    tableDOM.appendChild(newRow);
  }
}

// Масив для зберігання координат кліків
let selectedCells = [];

// Обробник кліків по комірках
function handleCellClick(event) {
  const cell = event.target;
  const [row, col] = cell.textContent.split(".").map(Number);

  // Зберігаємо координати кліків
  if (selectedCells.length < 2) {
    selectedCells.push({ row, col });
    cell.classList.add("highlight");
  }

  if (selectedCells.length === 2) {
    highlightCellsBetween(selectedCells);
    selectedCells = []; // Очищаємо масив після виконання
  }
}

// Функція для виділення комірок між вибраними
function highlightCellsBetween(cells) {
  const [start, end] = cells;

  const table = document.getElementById("tb").getElementsByTagName("td");
  const startRow = Math.min(start.row, end.row);
  const endRow = Math.max(start.row, end.row);
  const startCol = Math.min(start.col, end.col);
  const endCol = Math.max(start.col, end.col);

  Array.from(table).forEach((cell) => {
    const [row, col] = cell.textContent.split(".").map(Number);

    if (row >= startRow && row <= endRow && col >= startCol && col <= endCol) {
      cell.classList.add("highlight");
    }
  });
}

// Створення таблиці
const tableDOM = document.getElementById("tb");
generateTable(5, 6, tableDOM);
