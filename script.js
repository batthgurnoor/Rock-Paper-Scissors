const jsConfetti = new JSConfetti();
var audio;
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
  const randomIndex = Math.floor(Math.random() * 3);
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

var typed = new Typed(".intro_text", {
  strings: ["THIS IS A TIME OF THE GREAT WAR BETWEEN HUMANS AND MACHINES....."],

  typeSpeed: 70,
  backDelay: 100000,
  backSpeed: 0,
  onComplete: function (self) {
    showIntro();
  },
});

function startAfterIntro() {
  var typed1 = new Typed(".after_intro_text", {
    strings: [
      "MACHINES ARE THREATING TO TAKE OVER THE WORLD....",
      "UNLESS YOU BEAT THEM AT A GAME OF ROCK PAPER SCISSORS FIRST TO 5.....",
      "DO YOU HAVE WHAT IT TAKES TO SAVE THE WORLD?",
    ],

    typeSpeed: 70,
    backDelay: 1000,
    backSpeed: 0,
    onComplete: function (self) {
      showButton();
    },
  });
}
function showIntro() {
  document.getElementById("body_container").classList.add("visible");
  startAfterIntro();
}

function showButton() {
  document.querySelector(".custom-dark").classList.add("visible");
}

function showContent() {
  var x = document.getElementById("actualContent");
  x.style.display = "flex";
  x.style.opacity = 1;
}

function declareWinner() {
  bodyContainer.classList.add("fadeOut");
  document.querySelector(".result_page").classList.add("visible");
  setTimeout(function () {
    bodyContainer.innerHTML = "";
  }, 1000);
  setTimeout(function () {
    resultContainer.style.visibility = "visible";

    displayWinner();
  }, 1000);
}

function reloadPage() {
  location.reload();
}
function hideContent() {
  var content = document.querySelectorAll(".intro, .custom-dark, .field");
  content.forEach((item) => {
    item.classList.add("hide");
    setTimeout(function () {
      item.classList.add("hideDisplay");
    }, 2000);
  });
}

function startAfterplay(content) {
  var typed2 = new Typed(".outcome", {
    strings: [content[0]],

    typeSpeed: 70,
    backDelay: 100000,
    backSpeed: 0,
    onComplete: function (self) {
      resultNext(content);
    },
  });
}

function resultNext(content) {
  var typed3 = new Typed(".outcome_inner", {
    strings: [content[1]],

    typeSpeed: 70,
    backDelay: 100000,
    backSpeed: 0,
    onComplete: function (self) {
      resultNext1(content);
    },
  });
}
function resultNext1(content) {
  var typed4 = new Typed(".outcome_last", {
    strings: [content[2]],

    typeSpeed: 70,
    backDelay: 100000,
    backSpeed: 0,
    onComplete: function (self) {
      showReplayButton();
    },
  });
}
function displayWinner() {
  let content1;
  if (playWinCount > compWinCount && playWinCount >= tieCount) {
    content1 = playerWinMessage;
    audio = new Audio("audios/win.mp3");
    jsConfetti.addConfetti();
  } else if (playWinCount < compWinCount && compWinCount >= tieCount) {
    content1 = computerWinMessage;
    makeItRain();
    audio = new Audio("audios/rainAudio.wav");
  }
  audio.play();

  startAfterplay(content1);
}

function showReplayButton() {
  document.querySelector(".lastButton").classList.add("visible");
}
var makeItRain = function () {
  //clear out everything
  document.querySelectorAll(".rain").forEach(function (elem) {
    elem.innerHTML = "";
    elem.classList.add("visible");
  });
  document.querySelectorAll(".back-row").forEach(function (elem) {
    elem.classList.add("visible");
  });

  var increment = 0;
  var drops = "";
  var backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
    //random number between 5 and 2
    var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops +=
      '<div class="drop" style="left: ' +
      increment +
      "%; bottom: " +
      (randoFiver + randoFiver - 1 + 100) +
      "%; animation-delay: 0." +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"><div class="stem" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div><div class="splat" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div></div>';
    backDrops +=
      '<div class="drop" style="right: ' +
      increment +
      "%; bottom: " +
      (randoFiver + randoFiver - 1 + 100) +
      "%; animation-delay: 0." +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"><div class="stem" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div><div class="splat" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div></div>';
  }

  document.querySelector(".rain.front-row").innerHTML += drops;
  document.querySelector(".rain.back-row").innerHTML += backDrops;
};

var modal = document.getElementById("myModal");
var btn = document.querySelector(".playGame");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function displayFunction() {
  hideContent();
  setTimeout(function () {
    showContent();
  }, 2200);
}
document.querySelector(".warningBtn").addEventListener("click", function () {
  displayFunction();
  modal.style.display = "none";
});

document.querySelector(".muteBtn").addEventListener("click", function () {
  if (audio) {
    if (!audio.paused) {
      audio.pause();
      document.querySelector(".muteBtn img").setAttribute("src", "images/mute.png");
    } else {
      document.querySelector(".muteBtn img").setAttribute("src", "images/unmute.png");
    }
  } else {
    if (document.querySelector(".muteBtn img").getAttribute("src") == "images/mute.png") {
      document.querySelector(".muteBtn img").setAttribute("src", "images/unmute.png");
    } else {
      document.querySelector(".muteBtn img").setAttribute("src", "images/mute.png");
    }
  }
});
