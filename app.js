const overlay = document.getElementById('overlay');
const startBtn = document.querySelector('.start-btn');
const counter = document.getElementById('counter');
const container = document.getElementById('container');
const cards = document.querySelectorAll('.card');
const imageData = [
    'images/cardano-ada-logo.png',
    'images/eos-eos-logo.png',
    'images/ethereum-eth-logo.png',
    'images/litecoin-ltc-logo.png',
    'images/monero-xmr-logo.png',
    'images/neo-neo-logo.png',
    'images/stellar-xlm-logo.png'
];
let card1, card2;
// let lockBoard = false;
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
    if (this === card1) return;
    else updateCount();
    this.classList.add('flip');
    this.classList.add('active');

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
    setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        resetBoard();
    }, 2000);
}

function resetBoard() {
    card1 = null;
    card2 = null;
    attemptToMatch = false;
}

//startBtn.addEventListener('click', startGame);

for (let card of cards) {
    card.addEventListener('click', flipCard);
}