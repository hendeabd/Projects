function cancelEvent(event){

    if(event.preventDefault){
        event.preventDefault();
    }
    else{
        event.returnValue= false;
    }
}

function cancelPropogation(event){

    if(event.stopPropogation){
        event.sotpPropogation();
    }
    else{
        event.cancelBubble = true;
    }
}

function listenEvent(eventTarget,eventType,eventHandler){

    if(eventTarget.addEventListener){
        eventTarget.addEventListener(eventType,eventHandler,false)
    }
    else if(eventTarget.attachEvent){
        eventType = "on" + eventType;
        eventTarget.attachEvent(eventType,eventHandler);
    }
    else{
        eventTarget["on" + eventType] = eventHandler;
    }
}

//MAP AREA

function level1(i,j){
    if(
        (i == 0 && (j >= 0 && j <= 2))
        || (j == 2 && (i >= 0 && i < 70))
        ||(i == 70 && (j >= 2 && j <= 28))
        ||(j == 28 && (j >= 70 && j <= 60))
        ||(i == 60 && (j >= 28 && j <= 5))
        ||(j == 5 && (j >= 60 && j <= 40))
        ||(i == 40 && (j >= 5 && j <= 25))
        ||(j == 25 && (j >= 40 && j <= 30))
        ||(i == 30 && (j >= 20 && j <= 25))
        ||(j == 20 && (j >= 30 && j <= 5))
        ||(i == 5 && (j >= 20 && j <= 10))
        ||(j == 10 && (j >= 5 && j <= 80))
    )
    {
        return true;
    }
    return false;
}

//TURRETS
for (var k = 0; k < 5; k++){
    var turret = document.createElement("div");
    turret.setAttrubute("id","turret"+k);
    turret.setAttribute("class","turret");
    turret.style.left = TURRET_OFFSET + (TURRET_D + TURRET_GAP)*k + "px";
    turret.style.borderColor = turretColor(turret.id);
    turret.innerHTML = "<p>" + k + "<br /><br />$" + turretValue(turret.id) + "</p>"

    //DRAG TURRETS
    listenEvent(turret,"click",turretClick(turret));
    document.body.appendChild(turret);
}

function turretColor(turretID){

    switch(turretID){

    case "turret0":
        return "#DDA0DD";
    case "turret1":
        return "#0000FF"
    case "turret2":
        return "#008080"
    case "turret3":
        return "#FF4500"
    case "turret4":
        return "#FF0000"
    }
}

function turretValue(turretID){

    switch(turretID){
        case "turret0":
            return 10;
            case "turret1":
            return 100;
            case "turret2":
            return 500;
            case "turret3":
            return 1000;
            case "turret4":
            return 5000;
    }
}

//START BUTTON
var startbutton = document.createElement("div");
startbutton.setAttrubute("id","startbutton");
startbutton.setAttribute("class","startbutton");
startbutton.innerHTML = "<p> Start! </p>";
listenEvent(startbutton,"click",startwave);
document.body.appendChild(startbutton);

//RESET BUTTON
var resetbutton = document.createElement("div");
resetbutton.setAttribute("id","resetbutton");
resetbutton.setAttribute("class","resetbutton");
resetbutton.innerHTML = "<p> Reset </p>";
listenEvent(resetbutton,"click",resetwave);
document.body.appendChild(resetbutton);

//STATUS BAR
var statusbar = document.createElement("div");
statusbar.setAttribute("id","statusbar");
statusbar.setAttribute("calss","statusbar");
statusbar.innerHTML = '<p> Cash: <span id="cash">$0</span> Score: <span id="score">0</span> Wave:<span id="wave">0</span> Lives: <span id="lives">0</span></p>'
document.body.appendChild(statusbar);

//MORE TURRET STUFF
function turretClick(turret){
    function tclick(evt){
        if(!isRunning || is Paused){
            return;
        }
        if(currentCash < turretValue(turret.id)){
            return;
        }
    }
}