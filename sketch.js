
var backImage,backgr;

var frog,frogImg;

var ground,ground_img;

var insectimg,insectGroup;

var obstacle_img,obstacleGroup;

var score=0;



function preload(){
  backImage=loadImage("j.jpg");
  frogImg=loadImage("jump frog.png");
  
  insectimg=loadImage("insect.png");
  obstacle_img=loadImage("stone.png");
  
  
}

function setup() {
  createCanvas(800, 400);
  
  
  backgr=createSprite(0,0,400,800);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
 
  
  frog=createSprite(100,240,20,50);
  frog.addAnimation("jump",frogImg);
 frog.scale=0.2;
  
  ground=createSprite(400,350,90000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
   ground.visible=false;
  
  insectGroup=new Group();
  obstacleGroup=new Group();
  
  
  
  score=0;
}

function draw() {
  background(255);
  
  
  
  if(backgr.x<0){
    backgr.x=backgr.width/2;
  }
    
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(insectGroup.isTouching(frog)){
     score=score+2;
     insectGroup.destroyEach();
     }
    
  switch(score){
      case 10:frog.scale=0.12;
      break;
      case 20:frog.scale=0.14;
      break;
      case 30:frog.scale=0.16;
      break;
      case 40:frog.scale=0.18;
      break;
      
      default:break;
      
  }
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
  
  if(keyDown("space") ){
    frog.velocityY = -12 ;
    }
  
   
    frog.velocityY = frog.velocityY + 0.8;
    frog.collide(ground);
  
  
  if(obstacleGroup.isTouching(frog)){ 
    frog.scale=0.05;     
  }
 
 camera.position.x=frog.x;
 camera.position.y=frog.y;

    spawninsect();
     spawnobstacle();

                                         
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
  
}

function spawninsect(){
  if(frameCount%80===0){
    var insect=createSprite(400,252,40,10);
    insect.y = random(175,120);
    insect.addImage( insectimg);
    insect.scale=0.09;
    insect.velocityX=-4;
    insect.lifetime=134;
   frog.depth=insect.depth+1;
    
   insectGroup.add(insect);
  }
}

function spawnobstacle(){
if(frameCount%300===0){
  var obstacle=createSprite(200,336,10,40);
  obstacle.velocityX = - 6;
  obstacle.addImage( obstacle_img);
  obstacle.lifetime=100;
  obstacle.scale = 0.12;
  frog.depth=obstacle.depth+1;
  
  obstacleGroup.add(obstacle);
}
}

function reset(){  
  frog.x=100;
  frog.y=340;
  frog.velocityX = 0;
  frog.velocityY = 0; 
}