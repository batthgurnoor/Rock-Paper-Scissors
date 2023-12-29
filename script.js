const jsConfetti = new JSConfetti();

const choice = ["rock", "paper", "scissors"];
const content = [
  "MACHINES ARE THREATING TO TAKE OVER THE WORLD....",
  "UNLESS YOU BEAT THEM AT A GAME OF ROCK PAPER SCISSORS FIRST TO 5.....",
  "DO YOU HAVE WHAT IT TAKES TO SAVE THE WORLD?",
];
const playerWinMessage = [
  "CONGRATULATIONS",
  "DEFENDER OF HUMANITY!",
  "YOU'VE SAVED US ALL FROM THE DIGITAL DOOM!",
];
const computerWinMessage = [
  "THE MACHINES CLAIM VICTORY!",
  "GATHER YOUR COURAGE FOR ANOTHER ROUND",
  "BRAVE HUMAN!",
];

var message = document.getElementById("intro_text");
let currentIndex = 0;
let charIndex = 0;

let output = document.getElementById("intro_text");
var bodyContainer = document.getElementById("body_container");
var resultContainer = document.getElementById("result_page");
let resultText = document.getElementById("outcome");
var playWinCount = 0;
var compWinCount = 0;
var tieCount = 0;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * 1000000) % choice.length;
  const randomOption = choice[randomIndex];

  return randomOption;
}

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

  if (playWinCount >= 5 || compWinCount >= 5) {
    declareWinner();
  }
}

function showContent() {
  setTimeout(function () {
    var x = document.getElementById("actualContent");
    x.style.visibility = "visible";
    x.style.transition = "2s";
  }, 2000);
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

function declareWinner() {
  bodyContainer.classList.add("fadeOut");
  setTimeout(function () {
    bodyContainer.innerHTML = "";
  }, 1000);
  setTimeout(function () {
    resultContainer.style.visibility = "visible";
    displayWinner();
  }, 2000);
}

function displayWinner() {
  let content1;
  var audio;
  if (playWinCount > compWinCount && playWinCount >= tieCount) {
    content1 = playerWinMessage;
    audio = new Audio("win.mp3");
    jsConfetti.addConfetti();
  } else if (playWinCount < compWinCount && compWinCount >= tieCount) {
    content1 = computerWinMessage;
    audio = new Audio("loss.mp3");
  }
  audio.play();

  document.getElementById("outcome").innerHTML = content1[0];
  document.getElementById("outcome_inner").innerHTML = content1[1];
  document.getElementById("outcome_last").innerHTML = content1[2];
  var x = document.getElementsByClassName("button");
  for (let element of x) {
    element.style.visibility = "visible";
  }
}

function reloadPage() {
  location.reload();
}
