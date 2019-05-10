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