var buttonColors = ["red", "green", "blue", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

var abtme = false;

$(document).on("keydown", function() {
    if (!started) {
        nextSequence();
        $("h1").removeClass("float");
        $("#start-dv").fadeOut();
        started = true;
    }
});

$("#start").on("click", function() {
    if(!started){
        nextSequence();
        $("h1").removeClass("float");
        $("#start-dv").fadeOut();
        started = true;
    }
});

$(".button").on("click", function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var indexOfLastAnswer = userClickedPattern.length - 1;
    checkAnswer(indexOfLastAnswer);
});

$("#piaz").on("click", function() {
    if(!abtme) {
        $("#main-text").fadeOut();
        $(".container").fadeOut();
        $("#start-dv").fadeOut();
        $("h2").fadeOut();
        setTimeout(function() {
            $("h2").addClass("piaz-after");
            $("h2").fadeIn().addClass("float");
            $(".abtme").attr("style", "display : ;").fadeIn();
        }, 400);
        abtme = true;
        started = true;
    }
});
    
$("#back").on("click", function() {
    $(".abtme").fadeOut();
    $("h2").fadeOut()
    setTimeout(function() {
        $("h2").removeClass("piaz-after").removeClass("float");;
        $("#main-text").fadeIn();
        $(".container").fadeIn();
        $("h2").fadeIn();
        $(".abtme").attr("style", "display : none ;");
        $("#start-dv").fadeIn();
        $("#start").text("Start");
    }, 400);
    abtme = false;
    level = 0;
    $("h1").text("Press A Key To Start");
    $("h1").addClass("float");
    userClickedPattern = [];
    gamePattern = [];
    started = false;
});

$(".logo").on("mouseover", function(){
    $(this).addClass("box-shadow");
})

$(".logo").on("mouseout", function(){
    $(this).removeClass("box-shadow");
})

$("#back").on("mouseover", function(){
    $(this).addClass("box-shadow");
})

$("#back").on("mouseout", function(){
    $(this).removeClass("box-shadow");
})

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level += 1;
    $("h1").text("Level " + level);
    $("." + randomChosenColor).animate({opacity: 0.2}, 100).animate({opacity: 1}, 100);
    playSound(randomChosenColor);
}

function animatePress(color) {
    $("." + color).addClass(color + "Pressed");
    setTimeout(function() {
        $("." + color).removeClass(color + "Pressed");
    }, 200);
}

function playSound(color) {
    var sound = new Audio("./assets/sounds/" + color + ".mp3")
    sound.play();
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() { nextSequence();}, 1000);
        }

    } else {
        console.log("failure")
        $("body").addClass("wrongAnswer");
        var wrong = new Audio("./assets/sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Game Over, Press Any Key To Restart")
        setTimeout(function() {
            $("body").removeClass("wrongAnswer")
        }, 100);
        $("h1").addClass("float");
        $("#start-dv").fadeIn();
        $("#start").text("Restart");
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        started = false;
    }

}