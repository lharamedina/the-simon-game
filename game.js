// Get ready to watch, remember, repeat! The Simon game is the exciting electronic game of lights and sounds in which players must repeat random sequences of lights by pressing the colored pads in the correct order.It's fast-paced play, with lights and sounds that can challenge you.

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;
let level = 0;

// add keypress event listener
$(document).keypress(function () {
    if (!gameStarted) {
        nextSequence();

        // level
        $("#level-title").text("Level " + level);

        gameStarted = true;
    }
});

// add click event listener
$(".btn").click(function () {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    // pressed button animation
    animatePress(userChosenColor);

    // button sound
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    // level up
    level++
    $("#level-title").text("Level " + level);

    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = (buttonColors[randomNumber]);
    gamePattern.push(randomChosenColor);

    // button animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // button sound
    playSound(randomChosenColor);
}

function playSound(soundName) {
    new Audio("assets/sounds/" + soundName + ".mp3").play();
}

function animatePress(pressedBtn) {
    let currentColor = $("#" + pressedBtn).addClass("pressed");
    setTimeout(function () {
        currentColor.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");
    }
}
