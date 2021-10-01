const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard, pairs=0;
let lockBoard = false;

function flipCard(){
    if ((lockBoard) || (this === firstCard))
        return;

    // add adiciona a classe uma vez
    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch(){
    if (firstCard.dataset.card == secondCard.dataset.card){
        pairs++;
        disableCards();
        
        console.log('pares: ', pairs);
        if (pairs === 6) {
            console.log('new game');
            newGame();
        }    
        
        return;
    }   
    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetCards() {
    cards.forEach(() => {
        cards.classList.remove('flip');
    });
}
function newGame() {
    setTimeout(() => {
        location.reload()
    }, 2000) ;
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random()*12);
        card.style.order = randomPosition;
    })
})();   

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})






