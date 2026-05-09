const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

const emojis = ["🍎", "🍌", "🍇", "🍒", "🍉", "🥝"];

let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffleCards() {
  shuffledCards = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameBoard.innerHTML = "";

  shuffledCards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${emoji}</div>
      </div>
    `;

    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  checkMatch();
}

function checkMatch() {
  const isMatch =
    firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    disableCards();
    matchedPairs++;

    if (matchedPairs === emojis.length) {
      setTimeout(() => {
        alert("Congratulations! You matched all cards!");
      }, 500);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function restartGame() {
  matchedPairs = 0;
  resetBoard();
  shuffleCards();
  createBoard();
}

restartBtn.addEventListener("click", restartGame);

shuffleCards();
createBoard();