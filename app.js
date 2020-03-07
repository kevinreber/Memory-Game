let game;

//Start new game when window loads
window.addEventListener('load', () => {
    game = new MemoryGame();
});

class MemoryGame {
    constructor() {
        // DOM
        this.overlay = document.getElementById('overlay');
        this.gameBtn = document.getElementById('game-button');

        // Game Data
        this.highScore = 0;
        this.card1;
        this.card2;
        this.lockBoard = true;
        this.attemptToMatch = false;
        this.matches = 0;
        this.count = 0;

        // Render board game and add Event listeners
        this.renderGameBoard();
        this.addEvents();
    }

    //Renders gameBoard with cards
    renderGameBoard() {
        const gameBoard = document.getElementById('gameboard');
        gameBoard.innerHTML = `
        ${new Card("ada").buildCard()}
        ${new Card("eos").buildCard()}
        ${new Card("ada").buildCard()}
        ${new Card("eth").buildCard()}
        ${new Card("trx").buildCard()}
        ${new Card("ltc").buildCard()}
        ${new Card("neo").buildCard()}
        ${new Card("xmr").buildCard()}
        ${new Card("xlm").buildCard()}
        ${new Card("neo").buildCard()}
        ${new Card("eth").buildCard()}
        ${new Card("xmr").buildCard()}
        ${new Card("trx").buildCard()}
        ${new Card("xlm").buildCard()}
        ${new Card("eos").buildCard()}
        ${new Card("ltc").buildCard()}
    `;
    }

    addEvents() {
        this.gameBtn.addEventListener('click', () => this.startGame());
    }

    startGame() {
        let gameScore = document.getElementById('game-score');
        this.checkHighScore();
        this.overlay.style.display = 'none';
        this.count = 0;
        if (this.gameBtn.textContent = 'RESTART') {
            this.resetGame();
        }
        gameScore.textContent = this.count; //Reset score
        this.lockBoard = false; //Allow user to click cards
        this.gameBtn.textContent = 'RESTART'; //Restart button
        this.gameBtn.style.opacity = '.6';
        this.shuffleCards();
    }

    //Checks localStorage for highScore
    checkHighScore() {
        let bestScore = document.getElementById('best-score');
        if (localStorage.highScore) {
            this.highScore = JSON.parse(localStorage.highScore);
            bestScore.textContent = this.highScore; //Update Best Score
        } else bestScore.textContent = '-';
    }

    //Random number to shuffle card order
    randomNum() {
        return Math.floor(Math.random() * 17);
    }

    //Shuffle order of cards when player starts game
    shuffleCards() {
        const cards = document.querySelectorAll('.card');
        for (let card of cards) {
            card.classList.remove('flip', 'match');
            card.style.opacity = '1';
            card.style.order = this.randomNum();
            card.addEventListener('click', (e) => this.flipCard(e));
        }
    }

    //Reset game shuffles cards
    resetGame() {
        this.matches = 0;
        this.count = 0;
        this.resetCards();
        this.shuffleCards();
    }

    resetCards() {
        this.card1 = null;
        this.card2 = null;
        this.attemptToMatch = false;
        this.lockBoard = false;
    }

    //Updates how many guess player has made
    updateCount() {
        let gameScore = document.getElementById('game-score');
        this.count++;
        gameScore.textContent = this.count;
    }

    //Flips card  when player has made a guess
    flipCard(e) {
        const card = e.target;
        if (this.lockBoard || card === this.card1) return; //Locks card1 so player cannot flip card1 again
        else this.updateCount();

        card.classList.add('flip');

        if (!this.attemptToMatch) {
            this.attemptToMatch = true;
            this.card1 = card;
            console.log(this.card1);

            return; //Need return to store card1 and end function
        }
        this.card2 = card;
        console.log(this.card2);

        this.checkMatch(); //Check if cards match when player has guessed card2
    }

    //Checks if cards match
    checkMatch() {
        return this.card1.dataset.crypto === this.card2.dataset.crypto ? this.cardsMatch() : this.cardsDoNotMatch();
    }

    //If cards match, card1 and card2 remain face up
    cardsMatch() {
        this.matches++;
        if (this.matches === 8) this.endGame(); //If all cards match, end game
        this.cardMatchProp(this.card1);
        this.cardMatchProp(this.card2);
        this.resetCards();
    }

    //Removes player being able to select cards that are matched
    cardMatchProp(card) {
        card.removeEventListener('click', this.flipCard);
    }

    //If cards don't match, cards are flipped back to face down
    cardsDoNotMatch() {
        this.lockBoard = true; //to prevent user from clicking cards before board resets
        setTimeout(() => {
            this.card1.classList.remove('flip');
            this.card2.classList.remove('flip');
            this.resetCards();
        }, 1000);
    }



    //End game screen and checks if player has beat previous highScore
    endGame() {
        let html;
        if (this.count < this.highScore || !localStorage.highScore) { //Compare count to highScore and checks if local.Storage.highScore exists
            this.highScore = this.count;
            localStorage.setItem('highScore', JSON.stringify(this.highScore)); //Update local storage
            html = `
            <div class="overlay-content">
                <h1>New Best Score!</h1>
                <h3>${this.count}</h3>
                <a href="#" id="new-game-button" class="btn">PLAY AGAIN</a>
            </div>
        `
        } else {
            html = `
            <div class="overlay-content">
                <h1>You Win!</h1>
                <h3>${this.count}</h3>
                <a href="#" id="new-game-button" class="btn">PLAY AGAIN</a>
            </div>
            `
        }
        this.overlay.innerHTML = html;
        this.overlay.style.display = 'block';

        document.getElementById('new-game-button').addEventListener('click', this.startGame);
    }

}

class Card {
    constructor(coin) {
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

        this.crypto = cryptos[coin];
    }

    //Renders cards
    buildCard() {
        let html = `
        <div class="card" data-crypto="${this.crypto.data}">
            <img class="card-face front" src="images/${this.crypto.src}" alt="image">
            <img class="card-face back" src="images/cover/bitcoin-btc-logo.png" alt="cover">
        </div>
        `;
        return html;
    }
}