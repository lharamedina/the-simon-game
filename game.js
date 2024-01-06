let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

// Add click event listeners
$(".btn").click(function () {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    // pressed button animation
    animatePress(userChosenColor);

    // button sound
    playSound(userChosenColor);
});

function nextSequence() {
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
