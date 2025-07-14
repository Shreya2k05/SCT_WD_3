/* ====================
   Space Tic‑Tac‑Toe JS
   ==================== */

const boardEl  = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");

let cells = Array(9).fill("");
let isGameOver = false;

/* ===== Build Board ===== */
function buildBoard() {
  boardEl.innerHTML = "";
  cells.forEach((val, idx) => {
    const div = document.createElement("div");
    div.className = "cell";
    if (val) {
      div.textContent = val;
      div.classList.add(val.toLowerCase());
    }
    div.dataset.index = idx;
    div.addEventListener("click", playerTurn);
    boardEl.appendChild(div);
  });
}
buildBoard();

/* ===== Player Turn (X) ===== */
function playerTurn(e) {
  const i = e.target.dataset.index;
  if (isGameOver || cells[i]) return;

  makeMove(i, "X");
  if (checkGameEnd("X")) return;

  statusEl.textContent = "Computer (O) is thinking…";
  setTimeout(computerTurn, 600);
}

/* ===== Simple AI (random empty cell) ===== */
function computerTurn() {
  if (isGameOver) return;
  const empty = cells
    .map((v, idx) => (v === "" ? idx : null))
    .filter(i => i !== null);

  if (empty.length === 0) return;
  const idx = empty[Math.floor(Math.random() * empty.length)];
  makeMove(idx, "O");
  checkGameEnd("O");
}

/* ===== Make a Move ===== */
function makeMove(index, player) {
  cells[index] = player;
  const cellEl = boardEl.children[index];
  cellEl.textContent = player;
  cellEl.classList.add(player.toLowerCase());
}

/* ===== Win / Draw Check ===== */
const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkGameEnd(player) {
  const won = wins.some(line =>
    line.every(i => cells[i] === player)
  );
  if (won) {
    statusEl.textContent = (player === "X" ? "🎉 You Win!" : "💻 Computer Wins!");
    isGameOver = true;
    highlightWin(player);
    return true;
  }
  if (cells.every(c => c)) {
    statusEl.textContent = "😐 It’s a Draw!";
    isGameOver = true;
    return true;
  }
  statusEl.textContent = (player === "X") ? "Computer (O) Turn…" : "Your Turn (X)";
  return false;
}

function highlightWin(player) {
  // highlight the winning cells
  wins.forEach(line => {
    if (line.every(i => cells[i] === player)) {
      line.forEach(i => boardEl.children[i].classList.add("winner"));
    }
  });
}

/* ===== Reset Game ===== */
resetBtn.addEventListener("click", () => {
  cells = Array(9).fill("");
  isGameOver = false;
  statusEl.textContent = "Your Turn (X)";
  buildBoard();
});
