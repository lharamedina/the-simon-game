let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;
let level = 0;

$("#main-container").click(function () {
    if (!gameStarted) {
        $("#level-title").css("color", "#FEF2BF");
        nextSequence();

        gameStarted = true;
    }
});

// add click event listener
$(".btn").click(function () {
    if (gameStarted) {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        // pressed button animation
        animatePress(userChosenColor);

        // button sound
        playSound(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
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

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        $("#level-title").text("Game Over, Click Anywhere to Restart").css("color", "red");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        playSound("wrong");

        setTimeout(function () {
            startOver();
        }, 1);

    }
}

function startOver() {
    gameStarted = false;
    level = 0;

    gamePattern = [];
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

// Modal Logic

// Get the modal
let modal = $("#my-modal");

// Get the <span> element that closes the modal
let span = $(".close").eq(0);

// When game is not started, display modal
if (!gameStarted) {
    modal.css("display", "block");
}

// When the user clicks on <span> (x), close the modal
span.click(function () {
    modal.css("display", "none");
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function (event) {
    if (event.target == modal[0]) {
        modal.css("display", "none");
    }
});