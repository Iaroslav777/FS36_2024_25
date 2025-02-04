// звуки в папці sounds

const moveSound = new Audio("sounds/move.mp3");
const victorySound = new Audio("sounds/victory.mp3");

// робимо змінні для гри

let gameMode = null; // last або random
let currentPlayer = "X"; // хто ходить: X чи O
let movesLeft = { X: 20, O: 20 };
let boardState = Array(9).fill(null);

// в яких клітинках лежать фігури кожного гравця
let placedSymbols = {
  X: [],
  O: [],
};

let player1Name = "";
let player2Name = "";
// X-> гравець1, O-> гравець2
let playerNameMap = { X: "", O: "" };

// елменти інтерфейсу

const startModal = document.getElementById("startModal");
const startBtn = document.getElementById("startBtn");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");

const gameTitle = document.getElementById("gameTitle");
const gameDescription = document.getElementById("gameDescription");

const currentPlayerLabel = document.getElementById("currentPlayerLabel");
const player1MovesLeftEl = document.getElementById("player1MovesLeft");
const player2MovesLeftEl = document.getElementById("player2MovesLeft");
const player1NameLabel = document.getElementById("player1NameLabel");
const player2NameLabel = document.getElementById("player2NameLabel");

const leaderboardLast = document.getElementById("leaderboardLast");
const leaderboardRandom = document.getElementById("leaderboardRandom");

// старт гри

startBtn.addEventListener("click", () => {
  // Зчитуємо режим
  gameMode = document.getElementById("gameMode").value; // 'last' / 'random'

  // Логіни гравців
  player1Name = document.getElementById("player1").value || "Player1";
  player2Name = document.getElementById("player2").value || "Player2";
  playerNameMap.X = player1Name;
  playerNameMap.O = player2Name;

  // Приховуємо модальне вікно
  startModal.style.display = "none";

  // Заголовок і опис залежно від режиму
  if (gameMode === "last") {
    gameTitle.textContent = "Видалення Останнього";
    gameDescription.textContent =
      "При спробі поставити 4-у фігуру гравця спочатку видаляється найстаріша.";
  } else {
    gameTitle.textContent = "Видалення Випадкового";
    gameDescription.textContent =
      "При спробі поставити 4-у фігуру гравця спочатку видаляється одна з трьох випадково.";
  }

  // Відображаємо поле, інфо та таблиці лідерів
  board.style.display = "grid";
  document.querySelector(".info-panel").style.display = "block";
  document.querySelector(".leaderboards").style.display = "flex";

  // Встановлюємо імена у відображення
  player1NameLabel.textContent = player1Name;
  player2NameLabel.textContent = player2Name;

  // Оновлення рейтингів з localStorage
  updateLeaderboards();

  // Оновлюємо UI (поточний гравець, лічильники ходів)
  updateUI();
});

// ---------------------
// ОБРОБКА КЛІКІВ ПО КЛІТИНКАХ
// ---------------------
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const idx = parseInt(cell.getAttribute("data-index"));

    // Якщо клітинка зайнята або ходів 0 — ігноруємо
    if (boardState[idx]) return;
    if (movesLeft[currentPlayer] <= 0) return;

    // 1) Якщо гравець уже має 3 фігури, перед постановкою 4-ї - видаляємо одну
    if (placedSymbols[currentPlayer].length === 3) {
      removeSymbol(currentPlayer);
    }

    // 2) Ставимо нову фігуру
    boardState[idx] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === "X" ? "blue" : "red";
    placedSymbols[currentPlayer].push(idx);

    // Відтворюємо звук ходу
    moveSound.currentTime = 0;
    moveSound.play().catch(() => {});

    // 3) Зменшуємо лічильник ходів
    movesLeft[currentPlayer]--;

    // 4) Перевіряємо перемогу
    if (checkWin(currentPlayer)) {
      endGame(currentPlayer);
      return;
    }

    // 5) Якщо ходи закінчились у обох — нічия
    if (movesLeft.X === 0 && movesLeft.O === 0) {
      alert("Нічия! Ходи вичерпано.");
      resetGame();
      return;
    }

    // 6) Передаємо хід наступному гравцю
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateUI();
  });
});

// ---------------------
// ВИДАЛЕННЯ ОДНІЄЇ ФІГУРИ: найстарішої / випадкової
// ---------------------
function removeSymbol(player) {
  if (gameMode === "last") {
    // Найстаріша (перша в масиві)
    const oldestIndex = placedSymbols[player].shift();
    boardState[oldestIndex] = null;
    cells[oldestIndex].textContent = "";
  } else {
    // Випадкова
    const randPos = Math.floor(Math.random() * placedSymbols[player].length);
    const removedIndex = placedSymbols[player][randPos];
    placedSymbols[player].splice(randPos, 1);
    boardState[removedIndex] = null;
    cells[removedIndex].textContent = "";
  }
}

// ---------------------
// ОНОВЛЕННЯ ІНТЕРФЕЙСУ (ім'я поточного, ходи)
// ---------------------
function updateUI() {
  currentPlayerLabel.textContent = playerNameMap[currentPlayer];
  player1MovesLeftEl.textContent = movesLeft.X;
  player2MovesLeftEl.textContent = movesLeft.O;
}

// ---------------------
// ПЕРЕВІРКА ПЕРЕМОГИ
// ---------------------
function checkWin(symbol) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winPatterns.some((pattern) =>
    pattern.every((idx) => boardState[idx] === symbol)
  );
}

// ---------------------
// ЗАВЕРШЕННЯ ГРИ
// ---------------------
function endGame(winner) {
  victorySound.currentTime = 0;
  victorySound.play().catch(() => {});

  alert(`Переміг гравець ${playerNameMap[winner]}!`);

  // Скільки ходів витратив переможець
  const usedMoves = 20 - movesLeft[winner];
  saveScore(gameMode, playerNameMap[winner], usedMoves);

  resetGame();
}

// ---------------------
// ЗБЕРЕЖЕННЯ РЕЗУЛЬТАТУ В localStorage
// ---------------------
function saveScore(mode, winnerName, moves) {
  const storageKey = mode === "last" ? "leaderboardLast" : "leaderboardRandom";
  let data = JSON.parse(localStorage.getItem(storageKey) || "[]");

  data.push({ name: winnerName, moves });
  data.sort((a, b) => a.moves - b.moves); // за зростанням ходів

  localStorage.setItem(storageKey, JSON.stringify(data));
  updateLeaderboards();
}

// ---------------------
// ОНОВЛЕННЯ ТАБЛИЦЬ ЛІДЕРІВ
// ---------------------
function updateLeaderboards() {
  const lastData = JSON.parse(localStorage.getItem("leaderboardLast") || "[]");
  const randomData = JSON.parse(
    localStorage.getItem("leaderboardRandom") || "[]"
  );

  leaderboardLast.innerHTML = "";
  leaderboardRandom.innerHTML = "";

  function renderList(data, container) {
    data.slice(0, 5).forEach((record) => {
      const li = document.createElement("li");
      li.textContent = `${record.name} — ${record.moves} ходів`;
      container.appendChild(li);
    });
  }

  renderList(lastData, leaderboardLast);
  renderList(randomData, leaderboardRandom);
}

// ---------------------
// СКИДАННЯ ГРИ
// ---------------------
function resetGame() {
  boardState.fill(null);
  placedSymbols.X = [];
  placedSymbols.O = [];
  movesLeft.X = 20;
  movesLeft.O = 20;
  currentPlayer = "X";

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  updateUI();
}
