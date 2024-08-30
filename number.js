let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);

const submit = document.querySelector('#submit');
const input = document.querySelector('#guess');
const arrayOfGuesses = document.querySelector('#guesses-array');
const remaining = document.querySelector('#attempts-left');
const lowOrhigh = document.querySelector('.lowORhi'); 
const startOver = document.querySelector('.game-container')

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1

let playGame = true

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(input.value);
        console.log(guess);
        validateGuess(guess);

    })
}

function validateGuess(guess) {
    if (isNaN(guess)){
        alert("Please enter a valid number.");
    } else if(guess < 1){
        alert("Please enter a valid number.");
    } else if(guess >100 ){
        alert("Please enter less than 100 and more than one.");
    } else {
        prevGuess.push(guess)
        displayGuess(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess){
    if (guess === randomNumber){
        displayMessage(`You guessed it right.`);
        endGame();
    } else if(guess< randomNumber){
        displayMessage(`Too lower.`);
    } else if(guess > randomNumber) {
        displayMessage(`Too high.`);
    }

    if (prevGuess.length === 10 && guess !== randomNumber) {
        displayMessage(`Game over! You've used all your attempts. The number was ${randomNumber}.`);
        endGame();
    }
}

function displayGuess(guess){
    input.value = '';
    arrayOfGuesses.innerHTML += `${guess} `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message){
    lowOrhigh.innerHTML = `<h2>${message}</h2>`
}

function endGame() {
    input.setAttribute('disabled', '');
    const newGameButton = document.createElement('button');
    newGameButton.classList.add('retro-button');
    newGameButton.setAttribute('id', 'newGame');
    newGameButton.innerHTML = `Start New Game`;
    startOver.appendChild(newGameButton);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        console.log(randomNumber);
        prevGuess = [];
        arrayOfGuesses.innerHTML = '';
        numGuess = 1;
        remaining.innerHTML = `${11 - numGuess}`;
        input.removeAttribute('disabled');
        
        // Check if the button exists and is a child of startOver before removing it
        if (startOver.contains(newGameButton)) {
            startOver.removeChild(newGameButton);
        }
        
        playGame = true;
        lowOrhigh.innerHTML = '';
    });
}
