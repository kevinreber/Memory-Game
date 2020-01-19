const overlay = document.getElementById('overlay');
const gameBtn = document.getElementById('game-button');
const counter = document.getElementById('counter');
const cards = document.querySelectorAll('.card');
let gameScore = document.getElementById('game-score');
let bestScore = document.getElementById('best-score');
let highScore = 0;
let card1, card2;
let lockBoard = true;
let attemptToMatch = false;
let matches = 0;
let count = 0;

//FUNCTIONS
//Random number to shuffle card order
function randomNum() {
    return Math.floor(Math.random() * 17);
}

function checkHighScore() {
    if (localStorage.highScore) {
        highScore = JSON.parse(localStorage.highScore);
        bestScore.textContent = highScore; //Update Best Score
    } else bestScore.textContent = '-';
}

function startGame() {
    checkHighScore();
    overlay.style.display = 'none';
    count = 0;
    if (gameBtn.textContent = 'RESTART') {
        resetGame();
    }
    gameScore.textContent = count; //Reset score
    lockBoard = false; //Allow user to click cards
    gameBtn.textContent = 'RESTART'; //Restart button
    gameBtn.style.opacity = '.6';
    shuffleCards();
}

function resetGame() {
    matches = 0;
    count = 0;
    resetCards();
    shuffleCards();
}

function shuffleCards() {
    for (let card of cards) {
        card.classList.remove('flip', 'match');
        card.style.opacity = '1';
        card.style.order = randomNum();
        card.addEventListener('click', flipCard);
    }
}

function updateCount() {
    count++;
    gameScore.textContent = count;
}

function flipCard() {
    if (lockBoard || this === card1) return; //Cannot flip card
    else updateCount();
    this.classList.add('flip');

    if (!attemptToMatch) {
        attemptToMatch = true;
        card1 = this;
        return; //Need return to store card1 and end function
    }
    card2 = this;
    checkMatch();
}

function checkMatch() {
    return card1.dataset.crypto === card2.dataset.crypto ? cardsMatch() : cardsDoNotMatch();
}

function cardsMatch() {
    matches++;
    if (matches === 8) endGame(); //If all cards match, end game
    cardMatchProp(card1);
    cardMatchProp(card2);
    resetCards();
}

function cardMatchProp(card) {
    card.removeEventListener('click', flipCard);
}

function cardsDoNotMatch() {
    lockBoard = true; //to prevent user from clicking cards before board resets
    setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        resetCards();
    }, 1000);
}

function resetCards() {
    card1 = null;
    card2 = null;
    attemptToMatch = false;
    lockBoard = false;
}

function endGame() {
    let html;
    if (count < highScore) {
        highScore = count;
        localStorage.setItem('highScore', JSON.stringify(highScore)); //Update local storage
        html = `
            <div class="overlay-content">
                <h1>New Best Score!</h1>
                <h3>${count}</h3>
                <a href="#" id="new-game-button" class="btn">PLAY AGAIN</a>
            </div>
        `
    } else {
        html = `
            <div class="overlay-content">
                <h1>You Win!</h1>
                <h3>${count}</h3>
                <a href="#" id="new-game-button" class="btn">PLAY AGAIN</a>
            </div>
            `
    }
    overlay.innerHTML = html;
    overlay.style.display = 'block';

    document.getElementById('new-game-button').addEventListener('click', startGame);
}

//EVENT LISTENERS
window.onload = checkHighScore();
gameBtn.addEventListener('click', startGame);