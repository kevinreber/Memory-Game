const overlay = document.getElementById('overlay');
const gameBtn = document.getElementById('game-button');
let highScore = 0;
let card1, card2;
let lockBoard = true;
let attemptToMatch = false;
let matches = 0;
let count = 0;

//Random number to shuffle card order
function randomNum() {
    return Math.floor(Math.random() * 17);
}

//Checks localStorage for highScore
function checkHighScore() {
    let bestScore = document.getElementById('best-score');
    if (localStorage.highScore) {
        highScore = JSON.parse(localStorage.highScore);
        bestScore.textContent = highScore; //Update Best Score
    } else bestScore.textContent = '-';
    renderGameBoard();
}

//Renders cards
function renderCard(coin) {
    //Data on cryptos and their source
    const cryptos = {
        ada: {
            data: "ada",
            src: "cardano-ada-logo.png"
        },
        eos: {
            data: "eos",
            src: "eos-eos-logo.png"
        },
        eth: {
            data: "eth",
            src: "ethereum-eth-logo.png"
        },
        trx: {
            data: "trx",
            src: "tron-trx-logo.png"
        },
        ltc: {
            data: "ltc",
            src: "litecoin-ltc-logo.png"
        },
        neo: {
            data: "neo",
            src: "neo-neo-logo.png"
        },
        xmr: {
            data: "xmr",
            src: "monero-xmr-logo.png"
        },
        xlm: {
            data: "xlm",
            src: "stellar-xlm-logo.png"
        }
    };
    const crypto = cryptos[coin];
    let html = `
    <div class="card" data-crypto="${crypto.data}">
        <img class="card-face front" src="images/${crypto.src}" alt="image">
        <img class="card-face back" src="images/cover/bitcoin-btc-logo.png" alt="cover">
    </div>
    `;
    return html;
}

//Renders gameBoard with cards
function renderGameBoard() {
    const gameBoard = document.getElementById('gameboard');
    gameBoard.innerHTML = `
        ${renderCard("ada")}
        ${renderCard("eos")}
        ${renderCard("ada")}
        ${renderCard("eth")}
        ${renderCard("trx")}
        ${renderCard("ltc")}
        ${renderCard("neo")}
        ${renderCard("xmr")}
        ${renderCard("xlm")}
        ${renderCard("neo")}
        ${renderCard("eth")}
        ${renderCard("xmr")}
        ${renderCard("trx")}
        ${renderCard("xlm")}
        ${renderCard("eos")}
        ${renderCard("ltc")}
    `;
}

function startGame() {
    let gameScore = document.getElementById('game-score');
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

//Reset game shuffles cards
function resetGame() {
    matches = 0;
    count = 0;
    resetCards();
    shuffleCards();
}

//Shuffle order of cards when player starts game
function shuffleCards() {
    const cards = document.querySelectorAll('.card');
    for (let card of cards) {
        card.classList.remove('flip', 'match');
        card.style.opacity = '1';
        card.style.order = randomNum();
        card.addEventListener('click', flipCard);
    }
}

//Updates how many guess player has made
function updateCount() {
    let gameScore = document.getElementById('game-score');
    count++;
    gameScore.textContent = count;
}

//Flips card  when player has made a guess
function flipCard() {
    if (lockBoard || this === card1) return; //Locks card1 so player cannot flip card1 again
    else updateCount();
    this.classList.add('flip');

    if (!attemptToMatch) {
        attemptToMatch = true;
        card1 = this;
        return; //Need return to store card1 and end function
    }
    card2 = this;
    checkMatch(); //Check if cards match when player has guessed card2
}

//Checks if cards match
function checkMatch() {
    return card1.dataset.crypto === card2.dataset.crypto ? cardsMatch() : cardsDoNotMatch();
}

//If cards match, card1 and card2 remain face up
function cardsMatch() {
    matches++;
    if (matches === 8) endGame(); //If all cards match, end game
    cardMatchProp(card1);
    cardMatchProp(card2);
    resetCards();
}

//Removes player being able to select cards that are matched
function cardMatchProp(card) {
    card.removeEventListener('click', flipCard);
}

//If cards don't match, cards are flipped back to face down
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

//End game screen and checks if player has beat previous highScore
function endGame() {
    let html;
    if (count < highScore || !localStorage.highScore) { //Compare count to highScore and checks if local.Storage.highScore exists
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