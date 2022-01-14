var zombie , zombieIdle,zombieDead
var boy , boyIdle , boyDead 
var gameState="PLAY";
var treasure , treasureImg 
var zombiesGroup , zombieIdle
var treasuresGroup , treasureImg 
var count=3;
var jwell = 0;
var value="playing";



function preload(){
 zombieIdle=loadAnimation("Idle (15).png","Idle (14).png","Idle (13).png");
 boyIdle = loadAnimation("Idle (7).png","Idle (12).png"); 
 boyDead = loadAnimation("Dead (8).png")
 zombieDead = loadAnimation("Dead (2).png","Dead (1).png","Dead (4).png")
 treasureImg = loadImage ("diamond 2.png");
 bgImg = loadImage("CLIPART.jpg")
}

function setup() {
createCanvas(windowWidth,windowHeight);


boy = createSprite(320,320,50,50); 


boy.debug=true;
boy.setCollider("circle",-200,0,100)

boy.addAnimation("boy",boyIdle);
boy.addAnimation("boyDead", boyDead);
//boy.velocityY = 1;
boy.scale=0.3;

zombiesGroup = new Group();
treasuresGroup = new Group();

 
} 

function draw() {
  background(bgImg)

  stroke("blue")
  strokeWeight(3)
  fill(random(0,200),random(100,255),random(150,255))
  textSize(30)
  text("Count : "+ count ,1000, 50) ;
  textSize(30)

  stroke("pink")
  strokeWeight(3)
  fill(random(0,200),random(100,255),random(150,255))
  textSize(30)
  text("Jewel : "+ jwell ,1200, 50) ;
  textSize(30)


if (gameState==="PLAY"){

    
    if(keyDown("SPACE")) {
      boy.velocityY = -10;
    }

    boy.velocityY=boy.velocityY+0.5

    if(keyDown("right_arrow")){
      boy.x = boy.x + 3
    }

    if(keyDown("left_arrow")){
      boy.x = boy.x - 3
    }

    if(keyDown("down_arrow")){
      boy.y = boy.y + 3
    }

    if(keyDown("up_arrow")){
      boy.y = boy.y - 3
    }

  

    spawnZombies () ;

    spawnDiamonds () ;

    if(boy.isTouching(treasuresGroup)) {
      jwell = jwell + 1 
      treasuresGroup.destroyEach();
    }
  
   

    if(boy.isTouching(zombiesGroup) && count!=0){
      count = count -1;
      zombiesGroup.destroyEach();
  
    }

    if(jwell===3){
      text("boy won "+ boy , 100 , 200)
      gameState="END"
    }

    if(count === 0){
      gameState="END"
      value="lost"
    }

  }
  //game state play ends here

  if(gameState==="END"){

   
    zombiesGroup.destroyEach();
    treasuresGroup.destroyEach();


    //Display Text for GAME LOST
    if(value==="lost")
    {
      background("purple")
    boy.changeAnimation("boyDead",boyDead)
    boy.setVelocity(0,0);
    boy.x=450;
    boy.y=270
    boy.scale=0.8;
    fill("BLACK")
    textSize(40);
    text("Oh No!!You Lost the Game!!" ,680, 300) ;
    text("Better Luck Next Time!!" ,720, 380) ;
  
    }

    //Display Text for GAME WON
    else
    {
      background("#FF5733")
      boy.setVelocity(0,0);
      boy.x=450;
      boy.y=270
      boy.scale=0.8;
      fill("BLACK")
      strokeWeight(1)
      textSize(40)
      text("HURRAY!!!!" ,730, 300) ;
      text("YOU WON THE GAME!!" ,630, 380) ;
  
    }


  }
  //GAME STATE "END" ends here
drawSprites() ;

}



  function spawnZombies () {
    if(frameCount % 100 === 0){
      zombie = createSprite(random(boy.x+100,700),random(100,700),50,50);
      zombie.debug=true;
      zombie.mirrorX(-1)
      zombie.setCollider("circle",-200,0,100)
      zombie.addAnimation("zombie",zombieDead);
      zombie.addAnimation("zombie",zombieIdle);
      //zombie.velocityX = -2;
      zombie.scale=0.3
      zombie.lifetime = 1000;
      zombiesGroup.add(zombie);

    }
  }

  function spawnDiamonds () {
    if (frameCount % 100=== 0){
      treasure = createSprite (random(boy.x+100,700),random(200,500),20,20);
      treasure.addImage("treasure", treasureImg)
      treasure.setCollider("circle",-200,0,100)
      //treasure.velocityX = -2;
      treasure.scale=0.06;
      treasure.lifetime = 800;
      treasuresGroup.add(treasure)
  }
  }


 
