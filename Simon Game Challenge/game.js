var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;

$(document).keypress(function() { //in game, if we press a key then game starts, that's why 'keypress' event here
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {           //'addEventListener' method is used to register such a 'handler'.Ex-'click','keypress'

  var userChosenColour = $(this).attr("id");         // 'this' is reference of DOM element, source of event 'click'
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);  //checks the most recent answers of the user,immdiately check if right or wrong
});

function checkAnswer(currentLevel) {

  // 'gamePattern' takes random chosen colour.'userClickedPattern' takes user chosen colour.

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //check if the most recent user answer is the same as the game pattern
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {          //without it,it won't check the sequence
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");


    $("#level-title").text("Game Over, Press Any Key to Restart"); // h1 changes to "Game Over, ..." if the user got wrong.

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);


    startOver();            //Call startOver() if the user gets the sequence wrong
  }
}


function nextSequence() {


  userClickedPattern = []; // Once nextSequence() is triggered, reset userClickedPattern to an empty array ready for next level.

  level++;                                // increase the level by 1 every time nextSequence() is called

  $("#level-title").text("Level " + level);               // update the h1 with this change in the value of level.

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);                            //inserting values into array 'gamePattern'

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // amimate function in JavaScript
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {      // Inside function, you'll need to reset the values of level, gamePattern and started variables.


  level = 0;
  gamePattern = [];
  started = false;
}
