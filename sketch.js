var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var reset,restImage, backgroundimg;
var gameover, gameoverImage;
var score=0;

function preload(){  
  backgroundimg= loadImage("background.jpg");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");  
  trex_collided = loadImage("trex_collided.png");    
  groundImage = loadImage("ground2.png");    
  cloudImage = loadImage("cloud.png");    
  obstacle1 = loadImage("obstacle1.png"); 
  obstacle2 = loadImage("obstacle2.png");  
  obstacle3 = loadImage("obstacle3.png");  
  obstacle4 = loadImage("obstacle4.png");  
  obstacle5 = loadImage("obstacle5.png");  
  obstacle6 = loadImage("obstacle6.png");    
  
  resetImage = loadImage("restart.png");
  gameoverImage= loadImage("gameOver.png");  
                    }
function setup() {  
  canvas= createCanvas(displayWidth - 20, displayHeight-30);    
  trex = createSprite(50,180,20,50);  
  trex.addAnimation("running", trex_running);  
  trex.addAnimation("collided",trex_collided);  
  trex.scale = 0.5;    
  
  ground = createSprite(200,180,400,20);  
  ground.addImage("ground",groundImage);  
  ground.x = ground.width /2;  
  ground.velocityX = -(6 + 3*score/100);    
  invisibleGround = createSprite(200,190,400,10);  
  invisibleGround.visible = false;    
  reset = createSprite(200,340);  
  reset.addImage ("restart.png", resetImage);  
  reset.scale = 0.5;  
  reset.visible = false;    
  gameover = createSprite(200,300);  
  gameover.addImage("gameOver.png",gameoverImage);  
  gameover.scale = 0.5;  
  gameover.visible = false;    
  cloudsGroup = new Group();  
  obstaclesGroup = new Group();    
  score = 0;
}

  function draw() {    
    score = score + Math.round(getFrameRate()/60);  
    text("Score: "+ score, 500,50);  
    image(backgroundimg, 0,-displayHeight*4,displayWidth, displayHeight);
    
    if(gameState=== PLAY){    
      score = score + Math.round(getFrameRate()/60);    
      if(keyDown("space")) {    
        trex.velocityY = -10;  
      }    
      
      trex.velocityY = trex.velocityY + 0.8    
      
      if (ground.x < 0){    
        ground.x = ground.width/2; 
       }    
      
      trex.collide(invisibleGround);    
      spawnClouds();  
      spawnObstacles();    
      
      if(obstaclesGroup.isTouching(trex)){  
         gameState = END;  
      }
    }      
    
    else if(gameState === END) {    
      gameover.visible = true;    
      reset.visible = true;        
      score=0;          
      //set velcity of each game object to 0    
      ground.velocityX = 0;    
      trex.velocityY = 0;    
      obstaclesGroup.setVelocityXEach(0);    
      cloudsGroup.setVelocityXEach(0);        
      //change the trex animation    
      trex.changeAnimation("collided", trex_collided);        
      //set lifetime of the game objects so that they are never destroyed  
      obstaclesGroup.setLifetimeEach(-1);    
      cloudsGroup.setLifetimeEach(-1);          
      
      if(mousePressedOver(reset)) {    
        restart(); 
       }  
    }  
    drawSprites();
  }

  function restart(){   
    gameState = PLAY;    
    obstaclesGroup.destroyEach();  
    cloudsGroup.destroyEach();    
    gameover.visible= false;  
    reset.visible= false; 
    trex.changeAnimation("running",trex_running);    
    score = 0;
  }

    function spawnClouds() {  
      //write code here to spawn the clouds  
      if (frameCount % 60 === 0) {    
        var cloud = createSprite(600,120,40,10);    
        cloud.y = Math.round(random(80,120));    
        cloud.addImage(cloudImage);    
        cloud.scale = 0.5;    
        cloud.velocityX = -3;         
        //assign lifetime to the variable    
        cloud.lifetime = 200;        
        //adjust the depth    
        cloud.depth = trex.depth;    
        trex.depth = trex.depth + 1;        
        //add each cloud to the group    
        cloudsGroup.add(cloud);  
      }  
    }

    function spawnObstacles() {   
          for(var obstacle in spawnObstacles){
            //index of the array
          var index = 0;

          //x and y position of the cars
          var x = 175 ;
          var y;
            //add 1 to the index for every loop
            index = index + 1 ;
    
            //position the cars a little away from each other in x direction
            x = x + 200;
            //use data form the database to display the cars in y direction
            y = displayHeight - spawnObstacles[obstacle].position;
            obstacle[index-1].x = x;
            obstacle[index-1].y = y;
    
            if (index === obstacle.index){
              obstacle1[index - 1].shapeColor = "red";
              camera.position.x = displayWidth/2;
              camera.position.y = obstacle[index-1].y;
            }
            
              //generate random obstacles    
        var rand = Math.round(random(1,6));    
        switch(rand) {      
          case 1: obstacle.addImage(obstacle1);              
          break;      
          case 2: obstacle.addImage(obstacle2);
          break;   
          case 3: obstacle.addImage(obstacle3);              
          break;      
          case 4: obstacle.addImage(obstacle4);              
          break;      
          case 5: obstacle.addImage(obstacle5);              
          break;      
          case 6: obstacle.addImage(obstacle6);              
          break;      
          default: break;    
        }        
        //assign scale and lifetime to the obstacle               
        obstacle.scale = 0.5;    
        //add each obstacle to the group    
        obstaclesGroup.add(obstacle);  
          }    
      
      }
    