$(document).ready(function(){
    
    $(time).click(function(){
        time();
    });

    $(sumDigits).click(function(){
        sumDigits();
    });

});

var time = function(){

    var mintuesRemaining;
    var daysRemaining;
    var years;
    var mintues;
    var days;

    var input = $("#label1").val();
    secondsRemaining = input%60;
    minutes = Math.floor(input/60);
    mintuesRemaining = mintues%60
    hours = Math.floor(input/60)
    hoursRemaining = hours%60;

}

var sumDIgits = function(){

}