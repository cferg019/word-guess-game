//   variables
var wrongGuesses = [];
var words = ["cat", "dog", "mouse"];
var wins = 0;
var numGuesses = 9;
var currentWord = "";
var displayCharacters = [];

var currentWordText = document.getElementById("currentWord");
var winsText = document.getElementById("wins");
var numGuessesText = document.getElementById("numGuesses");
var wrongGuessesText = document.getElementById("wrongGuesses");

var startUp = function () {
    // randomize answer options 
    currentWord = words[Math.floor(Math.random() * words.length)];
    numGuesses = 9;
    wrongGuesses = [];
    console.log(currentWord)
    // Build an array with the same length as the chosen word, and fill it with underscores
    for (var i = 0; i < currentWord.length; i++) {
        displayCharacters.push("_");
    }
    // Display the initial underscores separated by spaces
    currentWordText.textContent = displayCharacters.join(' ');
    // Refresh the rest of the display items
    winsText.textContent = wins;
    numGuessesText.textContent = numGuesses;
    wrongGuessesText.textContent = wrongGuesses;
}

startUp()

// receives feedback from user selected keys when key is released
document.onkeyup = function (event) {
    // alert("the random word is " + currentWord)
    // currentWordText.textContent = event.key
    if (currentWord.includes(event.key)) {
        alert('yes!');
    } else {
        alert('nope!');
    }
}

