const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function init() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function cellClicked() {
  const index = this.getAttribute("data-index");

  if (board[index] !== "" || !running) return;

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  let won = false;

  for (let cond of winConditions) {
    const [a, b, c] = cond;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      won = true;
      break;
    }
  }

  if (won) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "🤝 It's a Draw!";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
}

init();
