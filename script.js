let btnColors = ["green", "red", "yellow", "blue"];
let userPattern = [];
let gamePattern = [];
let level = 0;
let gameStarted = false;

$(document).keypress(function () {
  if (!gameStarted) {
    startGame();
    gameStarted = true;
  }
});

function startGame() {
  level++;
  $("#level-title").text("Level " + level);
  let randNum = Math.floor(Math.random() * 4);
  gamePattern.push(btnColors[randNum]);
  userPattern = [];
  $(".btn").off("click");
  let delay = 0; // Initialize delay counter

  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(() => {
      playSound(gamePattern[i]);

      $("#" + gamePattern[i])
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);

      if (i === gamePattern.length - 1) {
        setTimeout(() => {
          $(".btn").on("click", function () {
            clickAnimation(this.id);
            playSound(this.id);
            userPattern.push(this.id);
            checkPattern(userPattern.length - 1);
          });
        }, 100 * gamePattern.length); // Adjust the delay as needed
      }
    }, delay);

    delay += 500; // Increment delay by 500 milliseconds for each iteration
  }
}
$(".btn").click(function () {
  clickAnimation(this.id);
  playSound(this.id);
  userPattern.push(this.id);
  checkPattern(userPattern.length - 1);
});

function clickAnimation(btn) {
  $("#" + btn).addClass("pressed");

  setTimeout(() => {
    $("#" + btn).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  let audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function checkPattern(btn) {
  if (userPattern[btn] === gamePattern[btn]) {
    console.log(userPattern[btn]);
    console.log(gamePattern[btn]);
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        startGame();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    let gameOverSound = new Audio("./sounds/wrong.mp3");
    gameOverSound.play();
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    userPattern = [];
    gamePattern = [];
    level = 0;
    gameStarted = false;
    $("#level-title").text("Press any key to restart");
  }
}
