var config = {
    typer: Phaser.AUTO,
    parent: 'content',
    width: 640,
    height: 512,
    physics: {
        default: 'arcade'
    },
    scene:{
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
}

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
turrets = this.add.group({classType: Turret, runChildUpdate: true});
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

this.hp = 100

receiveDamage: function(damage) {
    this.hp -= damage;           
    
    // if hp drops below 0 we deactivate this enemy
    if(this.hp <= 0) {
        this.setActive(false);
        this.setVisible(false);      
    }
}

this.physics.add.overlap(enemies, bullets, damageEnemy);

function damageEnemy(enemy, bullet){
    //only if both enemy and bullet are allvie
    if(enemy.active === true && bullet.active === true){
        //remove bullet
        bullet.setActive(false);
        bullet.setVisible(false);

        //decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
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
    fire: function(){
        var enemy = getEnemy(this.x, this.y, 100);
        if(enemy){
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2)* Phaser.Math.RAD_TO_DEG;
        }
    },

    update:function(time,delta){
        if(time > this.nextTic){
            this.fire();
            this.nextTic = time + 1000;
        }
    }
});

bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});

function addBullet(x, y, angle){
    var bullet = bullets.get();
    if(bullet){
        bullet.fire(x, y, angle);
    }
}

function getEnemy(x, y, distance){
    var enemyUnits = enemies.getChildren();
    for(var i = 0; i < enemyUnits.length; i++){
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i]))
        return enemyUnits[i]
    }
    return false
}

//ENEMIES
var turrets = document.querySelectorAll(".turretdrag");
for(var i = 0; i < turrets.length; i++){

    document.body.removeChild(turrets(i));
}

for(var i = 0; i < minion_count; i++){

    var minion = document.createElement("div");
    minion.setAttribute("id","minion"+i);
    minion.setAttribute("class","minion")
    document.body.appendChild(minion);
    
}

var movex = new Array();
var movey = new Array();

var currentDir = new Array();
var minion_c = 1;
var minion_release = new Array();
var minion_hp = new Array();
var first_kill = new Array();
var minions_killed = 0;
var lives_lost = 0;
var wave_over = false;

var minions = document.getElementsByClassName('minion');
for(var i = 0; i < minions.length; i++){
    movex[i] = 0;
    movey[i] = 0;
    curretnDir[i] = MOVE_S;
    minion_release[i] = 0;
    minions[i].getElementsByClassName.display = "none";
    minion_hp[i] = minionhp();
    first_kill[i] = true;
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
statusbar.setAttribute("class","statusbar");
statusbar.innerHTML = '<p> Cash: <span id="cash">$0</span> Score: <span id="score">0</span> Wave:<span id="wave">0</span> Lives: <span id="lives">0</span></p>'
document.body.appendChild(statusbar);

