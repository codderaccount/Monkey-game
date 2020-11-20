//it contains values of every sprite and even gameStates
var PLAY=1;
var END=0; 
var gameState= "start";

var monkey , monkey_running, monkey_collided;
var ground, ground_moving;
var bananaGroup, bananaImage,obstacleGroup,obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var bg, bgImage;

var inv, inv1, inv2;
var survivaltime = 0;
var score=0;

var gameover, gift;
var gameoverImg,surprise;

function preload(){
//this is where images are loaded
  monkey_running =                             loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadImage("sprite_1.png");
  
  ground_running= loadImage("ground.svg");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  bgImage = loadImage("zoo.png");
  
  gameoverImg = loadImage("gameover.gif");
  surprise = loadImage("gift.png");
  
}



function setup() {
//the outline of our game
createCanvas(600, 500); 
//the ground and its functions  
 ground  = createSprite(600, 500, 10, 10);
 ground.addImage("ground", ground_running);
 ground.x = ground.width /2;
//the monkey and its function  
 monkey = createSprite(70, 390, 6, 6);
 monkey.addAnimation("mon", monkey_running) ;
 monkey.addImage("mo", monkey_collided);
 monkey.scale= 0.2;
//Another background  
 bg = createSprite(300,250, 600, 500) ;
 bg.addImage("bg", bgImage);
 bg.scale = 0.6; 
//invisible walls or blocks  
 inv = createSprite(600, 400, 10, 10);
 inv.visible= false;
 inv.velocityX= -3;
  
 inv1 = createSprite(300, 450 , 600, 10);
 inv1.visible= false; 
  
 inv2 = createSprite(640, 440, 20, 20); 
 inv2.visible= false
//gameover  
  gameover = createSprite(300,100);
  gameover.addImage("over",gameoverImg);
 
//a secret small written note  
  gift = createSprite(300,250);
  gift.addImage("restart",surprise);
  gift.scale= 0.5;
//creating new groups  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
//collider for monkey
  monkey.setCollider("rectangle",0,0,250, 550);
  monkey.debug = false;  
//score and survival time  
  
  score=0;
  survivaltime= 0;

}




function draw() {
//backgroumnd color
background("lightblue");
//texts and their styles and colors
  stroke("white");
  textSize= 20
  fill("white");
  text("Score: "+ score,500, 50);
  
  stroke("white");
  textSize= 20
  fill("white"); 
  text("Survival Time: "+ survivaltime, 100, 50) ;

//if gamestat is in a start mode  
if (gameState==="start") {
  background("bg");
  gameover.visible= false;
  gift.visible= false;
  monkey.depth = bg.depth;
  monkey.depth = monkey.depth+1;
  bg.velocityX= -3
  
  if (monkey.isTouching(inv)){
      gameState= "play";
    }
  } 
//what if it changes in a playing condition  
else 
  if (gameState ==="play") {
      fruit(); 
      spawnObstacles();
      ground.velocityX= -3;
    
  if (ground.x < 0){
      ground.x = ground.width/2;   
    }
    
  if (keyDown("space") && monkey.y >= 343){
    monkey.velocityY= -16;
    monkey.velocityX= 1;
  }
    
  monkey.velocityY = monkey.velocityY+0.5; 
   
  if (monkey.isTouching(inv2)){
    monkey.x=0;
    monkey.y= 390;
  }
  
  survivaltime= Math.ceil (frameCount/frameRate())  ;
 
  if (bananaGroup.isTouching(monkey)){
    monkey.scale = monkey.scale + 0.05;
    score=score+1;
    bananaGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale= monkey.scale - 0.1;
    obstacleGroup.destroyEach();
    }
    
    if(monkey.scale === 0.1){
     gameState = END;
     bananaGroup.destroyEach();
    }

}
//what if you lose 
else
  if(gameState === END)  {
  gameover.visible= true;
  gift.visible= true;
  
  monkey.velocityX=0;
  monkey.velocityY=0;
  
  ground.velocityX=0;
  bananaGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0); 
  
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
     
  monkey.changeAnimation("mo",monkey_collided);
    
  if (mousePressedOver(gift) ){
      reset();
    }
    
}
//the monkey will look like its on the ground  
  monkey.collide(inv1); 
//it helps to draw sprites
  drawSprites();
  
}


function fruit(){
//banana and its function 
  if (frameCount%250===0){
    banana = createSprite(600, 175, 5, 5);
    banana.velocityX= -3;
    banana.addImage("banana", bananaImage);
    banana.scale= 0.15
    banana.lifetime= 200;
    bananaGroup.add(banana);
  }
   
}

function spawnObstacles(){
//spawning obstacles
  if (frameCount%500===0){
    obstacle = createSprite(600,400, 10, 10)
    obstacle.velocityX= -3;
    obstacle.addImage("obstacles", obstacleImage);
    obstacle.scale= 0.2;
    obstacle.lifetime= 190;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
//it is twist, the game will not get reseted
  background("red");
  
  fill("yellow");
  textSize= 50;
  text("MONKEY HAS NOW NO FOOD",300, 200);
  text("MONKEY DIED OF MARASMUS",300, 250);
  text("Bye", 300, 300);
    
  monkey.visible= false;
  ground.visible= false;
  gameover.visible= false;
  gift.visible= false;
  
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  
}