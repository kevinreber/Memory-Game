const overlay = document.getElementById('overlay');
const startBtn = document.querySelector('.start-btn');
const counter = document.getElementById('counter');
const container = document.getElementById('container');
const cards = document.querySelectorAll('.card');
const imageData = [
    {
        currency: 'ada',
        image: 'images/cardano-ada-logo.png',
        count: 2
    },
    {
        currency: 'eos',
        image: 'images/eos-eos-logo.png',
        count: 2
    },
    {
        currency: 'eth',
        image: 'images/ethereum-eth-logo.png',
        count: 2
    },
    {
        currency: 'ltc',
        image: 'images/litecoin-ltc-logo.png',
        count: 2
    },
    {
        currency: 'xmr',
        image: 'images/monero-xmr-logo.png',
        count: 2
    },
    {
        currency: 'neo',
        image: 'images/neo-neo-logo.png',
        count: 2
    },
    {
        currency: 'xlm',
        image: 'images/stellar-xlm-logo.png',
        count: 2
    },
    {
        currency: 'trx',
        image: 'images/tron-trx-logo.png',
        count: 2
    }
];

let card1, card2;
let lockBoard = false;
let attemptToMatch = false;
let count = 0;

// function randomNum(){
//     return Math.floor(Math.random() * 12);
// }

function startGame() {
    overlay.style.display = 'none';
}

function updateCount() {
    count++;
    counter.querySelector('h3').textContent = count;
}

function flipCard() {
    if (lockBoard || this === card1) return;
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
    cardMatchProp(card1);
    cardMatchProp(card2);
    resetBoard();
}

function cardMatchProp(card) {
    card.classList.remove('active');
    card.classList.add('match');
    card.removeEventListener('click', flipCard);
}

function cardsDoNotMatch() {
    lockBoard = true; //to prevent user from clicking cards before board resets
    setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    card1 = null;
    card2 = null;
    attemptToMatch = false;
    lockBoard = false;
}

//startBtn.addEventListener('click', startGame);

for (let card of cards) {
    card.addEventListener('click', flipCard);
}