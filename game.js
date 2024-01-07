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
        $("#level-title").text("Game Over, Press Any Key to Restart").css("color", "red");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        playSound("wrong");

        startOver();
    }
}

function startOver() {
    $("#level-title").css("color", "#FEF2BF");

    gameStarted = false;
    level = 0;

    gamePattern = [];
}

// Get the modal
let modal = $("#my-modal");

// Get the <span> element that closes the modal
let span = $(".close").eq(0);

// When the user refreshes, display the modal
$(document).ready(function () {
    if (performance.navigation.type === 1) {
        $("#my-modal").css("display", "block");
    }
});

// When the user clicks on <span> (x), close the modal
span.on("click", function () {
    modal.css("display", "none");
});

// When the user clicks anywhere outside of the modal, close it
$(window).on("click", function (event) {
    if (event.target == modal[0]) {
        modal.css("display", "none");
    }
});

