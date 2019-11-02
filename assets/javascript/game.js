//   variables
var wrongGuesses = [];
var words = ["nachos", "guacamole", "pretzels", "pancakes", "chocolate", "spaghetti", "cookies", "watermelon", "calzone", "cheese", "pizza", "macaroni", "brownies", "sandwiches", "wings", "doughnuts"];
var wins = 0;
var numGuesses = 9;
var currentWord = "";
var displayCharacters = [];
var gameStatus = "";

var currentWordText = document.getElementById("currentWord");
var winsText = document.getElementById("wins");
var numGuessesText = document.getElementById("numGuesses");
var wrongGuessesText = document.getElementById("wrongGuesses");
var gameStatusText = document.getElementById("gameStatus");

var updateScreen = function () {
    wrongGuessesText.textContent = wrongGuesses.join(" ").toUpperCase();
    numGuessesText.textContent = numGuesses;
    winsText.textContent = wins;
    currentWordText.textContent = displayCharacters.join(" ").toUpperCase();
    gameStatusText.textContent = gameStatus;
}

var startUp = function () {
    displayCharacters = [];
    // randomize answer options 
    currentWord = words[Math.floor(Math.random() * words.length)];
    numGuesses = 9;
    wrongGuesses = [];
    gameStatus = "Press any key to start!";
    console.log(currentWord)

    // Build an array with the same length as the chosen word, and fill it with underscores
    for (var i = 0; i < currentWord.length; i++) {
        displayCharacters.push("_");
    }

    updateScreen()
}

// receives feedback from user selected keys when key is released
document.onkeyup = function (event) {
    // alert("the random word is " + currentWord)
    // currentWordText.textContent = event.key
    gameStatus = "";
    // If the guess is not a letter
    if (!isLetter(event.key)) {
        return; // Stop the function early
    }
    // If it's a correct guess
    if (currentWord.includes(event.key)) {
        if (displayCharacters.includes(event.key.toUpperCase())) {
            alert("That letter has already been guessed! Try again.");
        }
        // Find all of the indexes of all of the occurrences of the correctly guessed character
        for (var i = 0; i < currentWord.length; i++) {
            // currentWord[i] is the current character that we're on
            if (event.key.toLowerCase() === currentWord[i].toLowerCase()) {
                displayCharacters[i] = event.key.toUpperCase()
            }
        }
        // If it's a wrong guess, and they have not guessed it before...
    } else if (!wrongGuesses.includes(event.key)) {
        wrongGuesses.push(event.key); // Add the wrong guess to the array
        numGuesses--; // Decrement the number of guesses
        // Otherwise, they've already guessed it, so tell them to try again.
    } else {
        alert("That letter has already been guessed! Try again.");
    }

    updateScreen();

    // When player is out of guesses, game is over and restarts
    if (numGuesses === 0) {
        endGame("lose")
    }

    // Check for a win
    if (!displayCharacters.includes("_")) {
        wins++;
        endGame("win")
    }
}

var endGame = function (outcome) {
    var i = 3;
    var interval;
    var updateOutcomeText = function () {
        gameStatus = "You " + outcome + "! New game starting in... " + i;
        updateScreen();
        if (i === 0) {
            clearInterval(interval);
            startUp();
        }
        i--;
    }
    // Execute it once so it happens right away
    updateOutcomeText();
    // Then let setInterval do the rest every 1000ms
    interval = setInterval(updateOutcomeText, 1000)
}

// Regular expressions
// 'a'.match(/[a-z]/i) // true
// '1'.match(/[a-z]/i) // false
var isLetter = function (str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

startUp()