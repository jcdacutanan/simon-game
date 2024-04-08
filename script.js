let btnColors = ["green", "red", "yellow", "blue"];
let userPattern = [];
let gamePattern = [];
let level = 0;
let gameStarted = false;
let highScore = 0;

$(".btn").click(function () {
  clickAnimation(this.id);
  playSound(this.id);

  if (gameStarted) {
    userPattern.push(this.id);
    checkPattern(userPattern.length - 1);
  }
});

// $(document).click(function (e) {
//   if (!$(".container").has(e.target).length) {
//     if (!gameStarted) {
//       startGame();
//       gameStarted = true;
//     }
//   }
// });
// $("#level-title").click(function () {
//   if (!gameStarted) {
//     startGame();
//     gameStarted = true;
//   }
// });
if (!gameStarted) {
  $("#level-title").css("cursor", "pointer");

  $("#level-title").hover(
    function () {
      $(this).text("Start?");
    },
    function () {
      $(this).text("Click Here to Start"); // Replace "Original Text" with the original text
    }
  );
}
$("#level-title").click(function () {
  if (!gameStarted) {
    startGame();
    gameStarted = true;
    $("#level-title").off("mouseenter mouseleave");
    $("#level-title").css("cursor", "default");
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
        }, 100 * gamePattern.length); // delay for button to be clickable after all sounds are played
      }
    }, delay); //delay for each playsound

    delay += 500; //increment delay while more sound is being played
  }
}

function checkPattern(btn) {
  if (userPattern[btn] === gamePattern[btn]) {
    if (userPattern.length === gamePattern.length) {
      $(".btn").off("click");
      setTimeout(() => {
        startGame();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    gameOverSound();

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    var currentLevel = level;
    if (currentLevel > highScore) {
      updateHighScore(currentLevel);
    }
    userPattern = [];
    gamePattern = [];
    level *= 0;
    gameStarted = false;
    $(".btn").off("click");
    setTimeout(() => {
      $(".btn").on("click", function () {
        clickAnimation(this.id);
        playSound(this.id);
      });
    }, 700);
    $("#level-title").text("Click Here to Restart");
    $("#level-title").css("cursor", "pointer");
    $("#level-title").hover(
      function () {
        $(this).text("Start?");
      },
      function () {
        $(this).text("Click Here to Restart"); // Replace "Original Text" with the original text
      }
    );
  }
}

function clickAnimation(btn) {
  $("#" + btn).addClass("pressed");

  setTimeout(() => {
    $("#" + btn).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  let audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
  audio.volume = 0.3;
}

function gameOverSound() {
  let gameOverSound = new Audio("./sounds/wrong.mp3");
  gameOverSound.play();
  gameOverSound.volume = 0.3;
}

function updateHighScore(level) {
  if (level > highScore) {
    highScore = level - 1;
    $("#high-score span").text(highScore);
  }
}
