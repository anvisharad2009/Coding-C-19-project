var zombie , zombieIdle,zombieDead
var boy , boyIdle , boyDead 
var gameState="PLAY"
var treasure , treasureImg 
var zombiesGroup , zombieIdle
var treasuresGroup , treasureImg 
var count=3
var jwell = 0
function preload(){
 zombieIdle=loadAnimation("Idle (15).png","Idle (14).png","Idle (13).png");
 boyIdle = loadAnimation("Idle (7).png","Idle (12).png"); 
 boyDead = loadAnimation("Dead (8).png","Dead (9).png","Dead (10).png")
 zombieDead = loadAnimation("Dead (2).png","Dead (1).png","Dead (4).png")
 treasureImg = loadImage ("diamond 2.png")
 bgImg = loadImage("CLIPART.jpg")
}

function setup() {
createCanvas(windowWidth,windowHeight);


boy = createSprite(320,320,50,50);
boy.addAnimation("boy", boyDead);
boy.addAnimation("boy",boyIdle);
//boy.velocityY = 1;
boy.scale=0.3;

zombiesGroup = new Group();
treasuresGroup = new Group();





 
} 

function draw() {
background(bgImg)

drawSprites() ;
if (gameState==="PLAY"){

    
    if(keyDown("SPACE")) {
      boy.velocityY = -10;
    }

    boy.velocityY=boy.velocityY+0.5

    if(keyDown("right_arrow")){
      boy.x = boy.x + 3
    }

    if(keyDown("left_arrow")){
      boy.x = boy.y - 3
    }

  

//spawnZombies () ;

//spawnDiamonds () ;





if(boy.isTouching(treasuresGroup)) {
  jwell = jwell + 1 
}

textSize(30)

text("count "+ count ,1000, 200) ;

if(boy.isTouching(zombiesGroup) && count != 3){
  count = count +1

}

if(jwell===3){
  text("boy won "+ boy , 100 , 200)
  gameState="END"
}


if(count === 3){
  gameState="END"
}
 
  }



 
  
    

 if (gameState==="END"){

  


  

  //zombiessGroup.setVelocityXEach(0);
  //  zombiessGroup.setVelocityXEach(0);

    zombiesGroup.setLifetimeEach(-1);
    treasuresGroup.setLifetimeEach(-1);
}


function spawnZombies () {
  if(frameCount % 100 === 0){
zombie = createSprite(100,100,50,50);
zombie.addAnimation("zombie",zombieDead);
zombie.addAnimation("zombie",zombieIdle);
//zombie.velocityX = -2;
zombie.scale=0.3
zombie.lifetime = 1000;
zombiesGroup.add(zombie);

  }
}

function spawnDiamonds () {
if (frameCount % 500=== 0){
treasure = createSprite (100,300,20,20);
treasure.addImage("treasure", treasureImg)
//treasure.velocityX = -2;
treasure.scale=0.1;
treasure.lifetime = 800;
treasuresGroup.add(treasure)
}
}
}

 
