const choice = ["rock", "paper", "scissors"];
var bodyContainer = document.getElementById("body_container");
var resultContainer = document.getElementById("result_page");
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
    document.getElementById(
      "results"
    ).innerHTML = `WOW! You are good at this. ${playerSelection} beats ${computerSelection}`;
    return "win";
  } else {
    document.getElementById(
      "results"
    ).innerHTML = `DAMN IT! Machines win this round. ${computerSelection} beats ${playerSelection}`;
    return "loss";
  }
}

function declareWinner() {
  bodyContainer.classList.add("fadeOut"); // Apply the animation
  setTimeout(function () {
    bodyContainer.innerHTML = ""; // Clear content after animation completes
  }, 1000);
  resultContainer.style.visibility = "visible";
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
  console.log(`Game Count: ${gameCounter}`);

  if (gameCounter >= 5) {
    console.log(`now here`);

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

function showContent() {
  var x = document.getElementById("actualContent");
  x.style.opacity = 1;
  x.style.transition = "2s";
}
let lastTime = 0;
const delay = 100;

function displayCharacters(time) {
  if (charIndex === content[currentIndex].length) {
    currentIndex++;
    if (currentIndex !== content.length) {
      charIndex = 0;
      output.textContent = "";
    } else {
      showContent();
      return;
    }
  }

  if (time - lastTime > delay) {
    output.textContent += content[currentIndex].charAt(charIndex);
    charIndex++;
    lastTime = time;
  }
  if (currentIndex !== content.length) {
    requestAnimationFrame(displayCharacters);
  }
}
requestAnimationFrame(displayCharacters);
