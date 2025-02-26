var colourSet = ["red", "green", "yellow", "blue"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).on("keydown", function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1)

})


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
            
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();

    }
    }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = colourSet[randomNumber];
    
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
    
function animatePress(colour) {
$("#" + colour).addClass("pressed");
setTimeout(function () {
$("#"+ colour).removeClass("pressed");
}, 100);
        }
function startOver() {
    level = 0;
    gamePattern = []; 
    started = false;
    

     }
            
        