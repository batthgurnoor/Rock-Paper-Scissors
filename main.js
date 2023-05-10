const choice = ["rock", "paper", "scissors"];
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * 1000000) % choice.length;
  const randomOption = choice[randomIndex];

  return randomOption;
}
var gameCounter = 0;
var playWinCount = 0;
var compWinCount = 0;
var tieCount = 0;

function playround(playerSelection) {
  playerSelection = playerSelection.toString().toLowerCase();
  const computerSelection = getComputerChoice();
  if (playerSelection == computerSelection) {
    document.getElementById("results").innerHTML = "It's a Tie";
    return "tie";
  } else if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "scissors" && computerSelection == "paper") ||
    (playerSelection == "paper" && computerSelection == "rock")
  ) {
    console.log(playerSelection);
    console.log(computerSelection);
    document.getElementById(
      "results"
    ).innerHTML = `WOW! You are good at this. ${playerSelection} beats ${computerSelection}`;
    return "win";
  } else {
    console.log(playerSelection);
    console.log(computerSelection);
    document.getElementById(
      "results"
    ).innerHTML = `DAMN IT! Machines win this round. ${computerSelection} beats ${playerSelection}`;
    return "loss";
  }
}

function declareWinner() {
  var bodyContainer = document.getElementById("body_container");
  var resultContainer = document.getElementById("result_page");

  bodyContainer.style.visibility = "hidden";
  bodyContainer.style.transition = "3s";
  resultContainer.style.visibility = "visible";
  resultContainer.style.transition = "2s";
}

function playGame(event) {
  var userSelection = event.target.id;
  var result = playround(userSelection);
  if (result == "loss") {
    compWinCount++;
    document.getElementById("machine").innerHTML = compWinCount;
  } else if (result == "win") {
    playWinCount++;
    document.getElementById("man").innerHTML = playWinCount;
  } else {
    tieCount++;
    document.getElementById("ties").innerHTML = tieCount;
  }
  gameCounter++;
  if (gameCounter == 5) {
    declareWinner();
  }
}

const content = [
  "MACHINES ARE THREATING TO TAKE OVER THE WORLD....",
  "UNLESS YOU BEAT THEM AT A GAME OF ROCK PAPER SCISSORS FIRST TO 5.....",
  "DO YOU HAVE WHAT IT TAKES TO SAVE THE WORLD?",
];
var message = document.getElementById("intro_text");
let currentIndex = 0;
let charIndex = 0;
let output = document.getElementById("intro_text");

function displayCharacters() {
  var mytimeout;
  if (charIndex === content[currentIndex].length) {
    currentIndex++;
    if (currentIndex != content.length) {
      charIndex = 0;
      output.textContent = "";
    } else {
      showContent();
    }
  }
  if (currentIndex != content.length) {
    output.textContent += content[currentIndex].charAt(charIndex);
    charIndex++;
    mytimeout = setTimeout(displayCharacters, 100);
  } else {
    clearTimeout(mytimeout);
  }
}

function showContent() {
  var x = document.getElementById("actualContent");
  x.style.opacity = 1;
  x.style.transition = "2s";
}
displayCharacters();
