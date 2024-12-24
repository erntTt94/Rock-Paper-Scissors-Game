const rulesButton = document.querySelector('.rules-btn');
const closeIcon = document.querySelector('.icon');
const resetButton = document.querySelector('.reset-game');
const gameContainer = document.querySelector('.game');
const gameButtons = document.querySelectorAll('.circle');
const result = document.querySelector('span');
let playerChoice;
let computerChoice;
let cloneChoice;
let clnOrNot = false;
let score = 0;
// document.querySelector('.winner-container').classList.add('hidden');

// show rules 
rulesButton.addEventListener('click', function () {
    document.querySelector('.rules-container').style.opacity = '1';
    document.querySelector('.rules-container').style.zIndex = '5';
    document.querySelector('.game-container').style.opacity = '0.1';
})

// hide rules
closeIcon.addEventListener('click', function () {
    document.querySelector('.rules-container').style.opacity = '0';
    document.querySelector('.rules-container').style.zIndex = '-1';
    document.querySelector('.game-container').style.opacity = '1';
})

// prepare the game every time
function prepareGame() {
    gameButtons.forEach(btn => {
        btn.classList.add('hidden')
    });
    document.querySelector('.bottom-circle').classList.remove('bottom-circle');
    gameContainer.classList.add('game-started');
    document.querySelector('.empty-shadow').style.visibility = 'visible';
    document.querySelector('.select-text').classList.remove('hidden');
}

// computer and player choices 
gameButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        btn.classList.add('not-clickable');
        prepareGame();
        const choices = ['paper', 'scissors', 'rock'];
        computerChoice = document.querySelector(`#${choices[Math.floor(Math.random() * choices.length)]}`);
        playerChoice = this;
        displayChoices(playerChoice, computerChoice);
        checkWinner(playerChoice, computerChoice);
    })
})

// if its a cloned item than added shadow to the cloned and display it instead of computer
function isCloned(choice) {
    setTimeout(() => {
        document.querySelector('.empty-shadow').style.visibility = 'hidden';
        choice.classList.remove('hidden');
        choice.classList.add('computer-choice');
    }, 2000);
}

// display playerChoice and computerChoice and check if they are equal, if they are create a cloned item and display cloned or computer choice...
function displayChoices(playerChoice, computerChoice) {
    playerChoice.classList.add('player-choice')
    playerChoice.classList.remove('hidden');

    if (playerChoice === computerChoice) {
        cloneChoice = computerChoice.cloneNode(true);
        gameContainer.append(cloneChoice);
        cloneChoice.classList.add('hidden');
        isCloned(cloneChoice)
        clnOrNot = true;
    } else {
        isCloned(computerChoice)
        clnOrNot = false;
    }
}

function checkWinner(playerChoice, computerChoice) {
    if ((playerChoice.id === 'rock' && computerChoice.id === 'scissors') || (playerChoice.id === 'paper' && computerChoice.id === 'rock')
        || (playerChoice.id === 'scissors' && computerChoice.id === 'paper')) {
        score++;
        setTimeout(() => {
            result.textContent = score;
            document.querySelector('.winner-container p').textContent = 'You win';
            playerChoice.classList.add('winner-shadow');
            document.querySelector('.winner-container').classList.remove('hidden');
        }, 2000)
    } else if ((computerChoice.id === 'rock' && playerChoice.id === 'scissors') || (computerChoice.id === 'paper' && playerChoice.id === 'rock')
        || (computerChoice.id === 'scissors' && playerChoice.id === 'paper')) {
        if (score > 0) {
            score--;
        };
        setTimeout(() => {
            result.textContent = score;
            document.querySelector('.winner-container p').textContent = 'You lose';
            document.querySelector('.winner-container').classList.remove('hidden');
        }, 2000, setTimeout(() => {
            computerChoice.classList.add('winner-shadow');
        }, 2300))
    } else {
        setTimeout(() => {
            document.querySelector('.winner-container p').textContent = 'Tie';
            document.querySelector('.winner-container').classList.remove('hidden');
        }, 2000)
    }
}

// reset[play again]
resetButton.addEventListener('click', function () {
    gameButtons.forEach(btn => {
        btn.classList.remove('hidden')
        btn.classList.remove('not-clickable');
        btn.classList.remove('winner-shadow');
    });
    document.querySelector('#rock').classList.add('bottom-circle');
    gameContainer.classList.remove('game-started');
    document.querySelector('.empty-shadow').style.visibility = 'hidden';
    document.querySelector('.select-text').classList.add('hidden');
    playerChoice.classList.remove('player-choice');
    computerChoice.classList.remove('computer-choice');
    if (clnOrNot) {
        gameContainer.removeChild(cloneChoice)
    }
    document.querySelector('.winner-container').classList.add('hidden');
})



