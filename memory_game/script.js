document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const movesDisplay = document.getElementById('moves');
    const timeDisplay = document.getElementById('time');
    let firstCard, secondCard;
    let moves = 0;
    let hasFlippedCard = false;
    let timer = null;
    let time = 0;
    const cardValues = ['🍏', '🍏', '🍎', '🍎', '🍐', '🍐', '🍊', '🍊', '🍋', '🍋', '🍌', '🍌', '🍉', '🍉', '🍇', '🍇'];

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createCards() {
        shuffle(cardValues);
        cardValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">🌟</div>
                    <div class="card-back">${value}</div>
                </div>
            `;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (hasFlippedCard && (this === firstCard || this.classList.contains('flipped'))) return;
        this.classList.add('flipped');
        if (!firstCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (firstCard.innerHTML === secondCard.innerHTML) {
            disableCards();
        } else {
            unflipCards();
        }
        moves++;
        movesDisplay.textContent = moves;
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, hasFlippedCard] = [null, null, false];
    }

    function restartGame() {
        moves = 0;
        time = 0;
        clearInterval(timer);
        timer = null;
        movesDisplay.textContent = '0';
        timeDisplay.textContent = '0 seconds';
        gameBoard.innerHTML = '';
        createCards();
        startTimer();
    }

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            time++;
            timeDisplay.textContent = `${time} seconds`;
        }, 1000);
    }

    createCards();
    startTimer();
});
