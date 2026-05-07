const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

const emojis = ["🍎", "🍌", "🍇", "🍒", "🍉", "🥝"];

let cardsArray = [...emojis, ...emojis];

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;

// Shuffle cards randomly
function shuffleCards() {
  cardsArray.sort(() => Math.random() - 0.5);
}

// Create game board
function createBoard() {

  gameBoard.innerHTML = "";

  matchedPairs = 0;

  shuffleCards();

  cardsArray.forEach((emoji) => {

    const card = document.createElement("div");

    card.classList.add("card", "hidden");

    card.dataset.emoji = emoji;

    card.innerHTML = emoji;

    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);
  });
}

// Handle card flip
function flipCard() {

  if (
    lockBoard ||
    this === firstCard ||
    this.classList.contains("matched")
  ) {
    return;
  }

  this.classList.remove("hidden");

  if (!firstCard) {

    firstCard = this;

    return;
  }

  secondCard = this;

  checkMatch();
}

// Check if cards match
function checkMatch() {

  const isMatch =
    firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {

    firstCard.classList.add("matched");

    secondCard.classList.add("matched");

    matchedPairs++;

    resetTurn();

    checkWin();

  } else {

    lockBoard = true;

    setTimeout(() => {

      firstCard.classList.add("hidden");

      secondCard.classList.add("hidden");

      resetTurn();

    }, 1000);
  }
}

// Reset selected cards
function resetTurn() {

  firstCard = null;

  secondCard = null;

  lockBoard = false;
}

// Check win condition
function checkWin() {

  if (matchedPairs === emojis.length) {

    setTimeout(() => {

      alert("🎉 Congratulations! You won the game!");

    }, 300);
  }
}

// Restart game
restartBtn.addEventListener("click", () => {

  resetTurn();

  createBoard();
});

// Start game
createBoard();