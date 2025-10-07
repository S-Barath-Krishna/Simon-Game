var userClickedPattern=[];
var  gamePattern=[];
var button_colors=["red","blue","green","yellow"];
var  Level=0;
function nextSequence(){
    rnum=Math.random();
    rnum=Math.floor(rnum*4);
    var randomChosenColour=button_colors[rnum];
    gamePattern.push(randomChosenColour);
    Level+=1;
    $("h1").text("Level "+Level);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
};
var started = false;

$(document).on("keydown", function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});
$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
     setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
          if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern=[];
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game over,Press any key to Restart");
        startOver();
    }
}
function startOver(){
    Level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}