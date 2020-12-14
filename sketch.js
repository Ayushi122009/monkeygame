
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground, invisible;
var score=0;
var survivalTime = 0;
var GameState="play";
//var PLAY, END;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,500);

  //PLAY = 1;
  //GameState=PLAY;
  //END = 0;
  
 bananaGroup = new Group();
 obstacleGroup = new Group();
  
  monkey = createSprite(80,400,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(250,445,1000,10);
 ground.x=ground.width/2;
   //ground.visible=false;  

    invisible= createSprite(250,450,1000,10);
    invisible.x=ground.width/2;
   invisible.visible= false;  
  
 
}


function draw() {
 background("skyblue");
  
  if(GameState === "play"){
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    if(ground.x<0){
      invisible.x=ground.width/2;
    }
    ground.velocityX=-5;
    
    if (keyDown("space")&& monkey.isTouching(ground)){
      monkey.velocityY=-20;
    }
  
   score=Math.round(frameCount/3);
    
    ground.velocityX=-(5+2*score/100);
    
   if(monkey.isTouching(bananaGroup)) {
     bananaGroup.destroyEach();
   }
    
    if(obstacleGroup.isTouching(monkey)) {
    GameState= "end";
  }
  banana();
  obstacle();
    
  
  }
  else if(GameState=== "end"){
    monkey.velocityY=0;
    ground.velocityX=0;
    //invisible.velocityX=0;
    obstacleGroup.setVelocityEach(0);
     bananaGroup.setVelocityEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
    monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisible);
  
  stroke("black");
  textSize(20);
  fill("red");
  text("Score"+score,100,50);
  
   stroke("black");
  textSize(20);
  fill("red");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time"+survivalTime,300,50);
  
  
  
  
  drawSprites();
}

function banana(){
if (frameCount%80===0){

 var banana=createSprite(500,10,10,20);
  banana.velocityX=-5;
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.y=Math.round(random(120,200));
  banana.lifetime=100;
  bananaGroup.add(banana);
  //banana.setCollider("rectangle",0,0,400,400);
  }
}

function obstacle(){
 if (frameCount%300===0){
   var obstacle=createSprite(500,410,20,20);
   obstacle.velocityX=-5;
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.2;
   obstacleGroup.add(obstacle);
   obstacle.lifetime=100;
   obstacle.setCollider("circle",0,0,200);
 }
}



