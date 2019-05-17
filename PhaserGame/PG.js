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
var Turret = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,
    
    intialize:

    function Turret(scene){
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
        this.nextTic = 0;
    },
    //Place Tureet to the grid
    place
    :function(i,j){
        this.y = i * 64 + 64/2;
        this.x = j * 64 + 64/2;
        map[i][j] = 1;
    },
    update: function (time, delta){
        //SHOTS 
        if(time > this.nextTic){
            this.nextTic = time + 1000;
        }
    }
});
turets = this.add.group({classType: Turret, runChildUpdate: true});
//TURRET PLACEMENT FUNCTION
this.input.on('pointerdown', placeTurret);
function placeTurret(pointer){
    var i = Math.floor(pointer.y/64);
    var j = Math.floor(pointer.x/64);
    if(canPlaceTurret(i, j)){
        var turret = turrets.get();
        if(turret){
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
        }
    }
}

function canPlaceTurret(i, j){
    return map[i][j] === 0;
}

var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    intialize:

    function Bullet (scene){

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        this.dx = 0;
        this.dy = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(600,1);
    },
    fire: function(x,y, angle){
        this.setActive(true);
        this.setVisible(true);
    }
})

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
statusbar.setAttribute("class","statusbar");
statusbar.innerHTML = '<p> Cash: <span id="cash">$0</span> Score: <span id="score">0</span> Wave:<span id="wave">0</span> Lives: <span id="lives">0</span></p>'
document.body.appendChild(statusbar);

