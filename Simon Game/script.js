var level =0;
let gamePattern = [];
let userClickedPattern =[]
var flag =1;
let buttonColors = ["red", "blue", "green", "yellow"];



$("body").keydown(function(){
    if(flag == 1){
        $("h1").text("Level " + level);
        nextsequence();
        flag = 0;
    }
});


$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function playSound(btnPressed){
    var audio = new Audio("./sounds/" + btnPressed + ".mp3");
    audio.play();
}

function animatePress(btnPressed){
    var btn = "#" + btnPressed;
    $(btn).addClass("pressed");
    setTimeout(function(){
        $(btn).removeClass("pressed")
    }, 100);
}

function nextsequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("level " + level);
    var randomNumber= Math.floor(Math.random()* 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var color = "." + randomChosenColor;

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currLevel){
    if(userClickedPattern[currLevel] == gamePattern[currLevel]){
        console.log("sucess");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextsequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong!");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $(document).addClass("game-over");
        setTimeout(function(){
            $(document).removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    level = 0;
    flag= 1;
    gamePattern= [];
}