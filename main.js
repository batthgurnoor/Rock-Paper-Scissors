const choice = ["rock", "paper", "scissors"];
function getComputerChoice() {
  return choice[Math.floor(Math.random() * 3)];
}
var playWinCount = 0;
var compWinCount = 0;
var tieCount = 0;

function playround() {
  const playerSelection = window.prompt("Enter Your Choice Human").toLowerCase();
  const computerSelection = getComputerChoice();
  if (playerSelection == computerSelection) {
    console.log("It's a Tie!!!!");
    return "tie";
  } else if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "scissors" && computerSelection == "paper") ||
    (playerSelection == "paper" && computerSelection == "rock")
  ) {
    console.log("You Win");
    return "win";
  } else {
    console.log("Computer Wins");
    return "loss";
  }
}

function playGame() {
  var numberOfRounds = parseInt(
    window.prompt("Please Enter How Many Rounds would you like to play\n Please note you can only enter Odd Numbers!!")
  );

  if (numberOfRounds % 2 != 0) {
    for (var i = 0; i < numberOfRounds; i++) {
      var result = playround();
      if (result == "loss") {
        compWinCount++;
      } else if (result == "win") {
        playWinCount++;
      } else {
        tieCount++;
      }
      console.log(`Wins ${playWinCount}\n Losses ${compWinCount} Ties ${tieCount}`);
    }
  } else {
    window.alert("Error\nYou Entered a Even Number :(");
    playGame();
  }
}

playGame();
