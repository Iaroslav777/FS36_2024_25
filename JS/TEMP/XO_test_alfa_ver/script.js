// -------------------------
// Звуки (опційно)
// -------------------------
const moveSound = new Audio('sounds/move.mp3');
const victorySound = new Audio('sounds/victory.mp3');

// -------------------------
// Змінні гри
// -------------------------
let currentPlayer = 'X';
let movesLeft = { X: 20, O: 20 };

let boardState = Array(9).fill(null); 
// Масиви з позиціями фігур кожного гравця
let placedSymbols = { X: [], O: [] };

// HTML-елементи
const cells = document.querySelectorAll('.cell');
const currentPlayerLabel = document.getElementById('currentPlayerLabel');
const xMovesLeftEl = document.getElementById('xMovesLeft');
const oMovesLeftEl = document.getElementById('oMovesLeft');

// -------------------------
// Початкове відображення
// -------------------------
updateUI();

// -------------------------
// Обробка саме на "mouseup"
// -------------------------
cells.forEach(cell => {
  cell.addEventListener('mouseup', (event) => {
    // Перевіряємо, що це ЛІВА кнопка миші (button===0)
    if (event.button !== 0) return;

    const idx = parseInt(cell.getAttribute('data-index'));

    // Якщо клітинка зайнята або у поточного гравця 0 ходів — ігноруємо
    if (boardState[idx] !== null) return;
    if (movesLeft[currentPlayer] <= 0) return;

    // Якщо вже є 3 фігури у поточного гравця - видаляємо одну
    if (placedSymbols[currentPlayer].length === 3) {
      removeSymbol(currentPlayer);
    }

    // Ставимо фігуру
    boardState[idx] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = (currentPlayer === 'X') ? 'blue' : 'red';
    placedSymbols[currentPlayer].push(idx);

    // Звук (опціонально)
    moveSound.currentTime = 0;
    moveSound.play().catch(() => {});

    // Віднімаємо 1 хід у поточного гравця
    movesLeft[currentPlayer]--;

    // Перевірка перемоги
    if (checkWin(currentPlayer)) {
      victorySound.currentTime = 0;
      victorySound.play().catch(()=>{});
      alert(`Переміг гравець ${currentPlayer}!`);
      resetGame();
      return;
    }

    // Перевірка нічиєї (якщо у обох по 0 ходів)
    if (movesLeft.X === 0 && movesLeft.O === 0) {
      alert('Нічия! Ходи вичерпано.');
      resetGame();
      return;
    }

    // Передаємо хід іншому
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    updateUI();
  });
});

// -------------------------
// Видалення фігури у гравця
// -------------------------
function removeSymbol(player) {
  // Для прикладу - "останній": найстаріша
  // (замість 'last' / 'random' можна додати логіку)
  const oldestIndex = placedSymbols[player].shift();
  boardState[oldestIndex] = null;
  cells[oldestIndex].textContent = '';
}

// -------------------------
// Перевірка перемоги
// -------------------------
function checkWin(symbol) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return lines.some(pattern =>
    pattern.every(idx => boardState[idx] === symbol)
  );
}

// -------------------------
// Оновлення UI
// -------------------------
function updateUI() {
  currentPlayerLabel.textContent = currentPlayer;
  xMovesLeftEl.textContent = movesLeft.X;
  oMovesLeftEl.textContent = movesLeft.O;
}

// -------------------------
// Скидання гри
// -------------------------
function resetGame() {
  boardState.fill(null);
  placedSymbols.X = [];
  placedSymbols.O = [];
  movesLeft.X = 20;
  movesLeft.O = 20;
  currentPlayer = 'X';

  cells.forEach(cell => {
    cell.textContent = '';
  });

  updateUI();
}
