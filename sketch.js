var character, characterImg;
var spike, spikeImg, spikesGroup;
var floor, floorImg, floor2, floorimg2;
var gameState = "play";
var frameRateResetSpike;
var score;
var x = Math.floor(Math.random() * 41) + 50;
console.log(x)
var y = 0

function preload(){
    characterImg = loadImage("character.png");
    spikeImg = loadImage("spike.png");
    floorImg = loadImage("floor.png");
    floorImg2 = loadImage("floor.png")
}

function spawnObstacles() {
    if(frameCount == x) {
        console.log(x)
        spike = createSprite(300,300);
        spike.addImage("spike", spikeImg);
        spike.velocityX = -4
        spike.x = 800
        spike.y = 370
        spike.scale = 0.2
        spike.lifetime = 900
        spikesGroup.add(spike)
        spike.setCollider("rectangle",0,0,spike.width,spike.height)
        spike.debug = true
        if(y != 0) {
            var z = frameCount - y
        }
        if(x < 200) {
            y = x
            var z = Math.floor(Math.random() * (80)) + (50);
            x = frameCount + z
        }
        else if(200<=x<300) {
            y = x
            var z = Math.floor(Math.random() * (70)) + (50);
            x = frameCount + z
        }
        else if(300<=x<500) {
            y = x
            var z = Math.floor(Math.random() * (70)) + (30);
            x = frameCount + z
        }
        else if(500<=x<600) {
            y = x
            var z = Math.floor(Math.random() * (50)) + (10);
            x = frameCount + z
        }
        else if(600<=x<700) {
            y = x
            var z = Math.floor(Math.random() * (30)) + (10);
            x = frameCount + z
        }
        else if(700<=x<800) {
            y = x
            var z = Math.floor(Math.random() * (50));
            x = frameCount + z
        }
        else if(800<=x<900) {
            y = x
            var z = Math.floor(Math.random() * (30));
            x = frameCount + z
        }
        else if(900<=x<1000) {
            y = x
            var z = Math.floor(Math.random() * (10));
            x = frameCount + z
        }
        else if(1000<=x<1200) {
            y = x
            var z = Math.floor(Math.random() * (5));
            x = frameCount + z
        }
        else {
            y = x
            var z = Math.floor(Math.random()*(2));
            x = frameCount + z
        }
       character.depth += 2
    }
}

function setup() {
    createCanvas(800,400)

    floor = createSprite(200,50)
    floor.addImage("floor", floorImg)
    floor.velocityX = -4
    floor.y = 400
    floor.x = 800
    floor.scale = 2

    floor2 = createSprite(200,50)
    floor2.addImage("floor", floorImg2)
    floor2.y = 200
    floor2.x = 800
    floor2.scale = 2
    floor2.visible = false

    spikesGroup = createGroup()

    character = createSprite(300,300);
    character.addImage("character", characterImg)
    character.x = 50;
    character.y = 370;
    character.scale = 0.12
    character.setCollider("rectangle",0,0,character.width+50,character.height+50)
    // character.debug = true;
    score = 0
}

function draw() {
    background(0,0,0)
    textSize(20)
    text("Score: " + score,680,20)
    if(gameState == "play") {
    spawnObstacles();
        if(keyDown("space") || keyDown("up")) {
            if(character.y >= 275) {
                for(var i=0; i<=2; i++) {

                    character.y -= 2
                }
            // console.log(character.y)
            }
        }
        if(character.y < 275) {
            character.y += 10
        }
        character.velocityY += 0.25
    
    if(gameState == "play") {
        if(floor.x < 600){
            floor.x = 1600
          }
          if(character.isTouching(floor)) {
            score += 1
          }

        if(floor2.x < 600) {
            floor2.x = 1600
        }
        
        }
    if(spikesGroup.isTouching(character)){
        gameState = "end"
          
    }
    if(score == 500) {
        gameState = "win"
    }
    
    character.collide(floor2)
    
}
if(gameState == "end") {
    floor.velocityX = 0;
    character.velocityY = 0;
    spikesGroup.setVelocityXEach(0)
    spikesGroup.setLifetimeEach(-1)
    text("Game Over!",400,200)
    
}
if(gameState == "win") {
    floor.velocityX = 0;
    character.velocityY = 0;
    spikesGroup.setVelocityXEach(0)
    spikesGroup.setLifetimeEach(-1)
    text("You won!",400,200)
}
    
    character.collide(floor)
    drawSprites();
}
