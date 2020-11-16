
var monkey , monkey_running , Ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score , Gamestate ;

function preload(){
  
  
  monkey_running= loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas (400,400);
  //monkey Sprite
  monkey = createSprite (50,320,10,10);
  monkey.addAnimation("moneky_running",monkey_running);
  monkey.scale = 0.1;
  
  Ground = createSprite (200,365,600,10);
  Ground.velocityX = -4;
  
  Gamestate = "Play";
  FoodGroup = createGroup ();
  obstacleGroup = createGroup ();
  score = 0;
}


function draw() {
  background ("lightblue");
  textSize (20);
  text ("Survival Time: " + score,120,50);
  if (Ground.x < 150){
    Ground.x = 200;
  }
  
  if (keyDown ("space") && Gamestate === "Play"){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(Ground);
  
  SpawnBanana();
  Rock ();
  
  if (frameCount % 40 ===0 && Gamestate === "Play"){
  score = score + 1;}
  else {
    score = score;
  }
  
  if (obstacleGroup.isTouching(monkey)){
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);  
    Ground.velocityX = 0;
    Gamestate = "End";
  }
  drawSprites (); 
}

function SpawnBanana (){
  if (frameCount % 80 === 0){
  banana = createSprite (440,random(150,350),10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime = 200;
  FoodGroup.add(banana);}
}

function Rock (){
  if (frameCount % 200 === 0){
  obstacle = createSprite (440,340,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.12;
  obstacle.velocityX = -4;
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);}
}





