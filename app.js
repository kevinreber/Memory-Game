const overlay = document.getElementById('overlay');
const startBtn = document.querySelector('.start-btn');
const container = document.getElementById('container');
const cards = document.querySelectorAll('.card');
const imageData = [
    'images/bikes.jpg', 
    'images/bridge.jpg', 
    'images/exit.jpg', 
    'images/leaves.jpg', 
    'images/leaves_on_ground.jpg', 
    'images/scooters.jpg'
];
let card1;
let card2;
let count = 0;

// function randomNum(){
//     return Math.floor(Math.random() * 12);
// }

function startGame(){
    overlay.style.display = 'none';
}

function flipCard(){
//console.log(this.classList.add('flip'));
this.classList.toggle('flip');
    // e.target.classList.add('active');
    // if(card1){
    //     card2 = e.target.getAttribute('src');
    // }  else{
    //     card1 = e.target.getAttribute('src');
    // }

    if(card1 && card2){
        //checkMatch();
    }
    
    
}

//startBtn.addEventListener('click', startGame);

for (let card of cards){
    card.addEventListener('click', flipCard);
}