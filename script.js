const tiles = Array.from(document.querySelectorAll(".tile"));
const displayPlayer = document.querySelector(".display-player");
const announcer = document.querySelector(".announcer");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Possible winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to handle player change
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  displayPlayer.textContent = currentPlayer;
  displayPlayer.classList.toggle("playerX");
  displayPlayer.classList.toggle("playerO");
}

// Function to update board
function updateBoard(index) {
  board[index] = currentPlayer;
}

// Function to check for a winner
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announcer.classList.remove("hide");
    announcer.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    announcer.classList.remove("hide");
    announcer.textContent = "It's a Draw!";
    isGameActive = false;
  }
}

// Function for handling tile click
function handleTileClick(event) {
  const tile = event.target;
  const index = tiles.indexOf(tile);

  if (board[index] !== "" || !isGameActive) return;

  tile.textContent = currentPlayer;
  tile.classList.add(`player${currentPlayer}`);
  updateBoard(index);
  checkWinner();

  if (isGameActive) changePlayer();
}

// Function to reset the game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  announcer.classList.add("hide");
  currentPlayer = "X";
  displayPlayer.textContent = currentPlayer;
  displayPlayer.classList.add("playerX");
  displayPlayer.classList.remove("playerO");

  tiles.forEach((tile) => {
    tile.textContent = "";
    tile.classList.remove("playerX", "playerO");
  });
}

// Event listeners
tiles.forEach((tile) => tile.addEventListener("click", handleTileClick));
resetButton.addEventListener("click", resetGame);
