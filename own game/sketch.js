var bg,bgImg;
var player, shooterImg, shooter_shooting;
var groupZ;
var zombieImg;
var knife;
var ghost;
var life,life1Img,life2Img,life3Img;
var lifesprite, life1sprite, life2sprite;
var bullets,bulletgroup,bulletImg;
var bulletSound;
var score = 0;
var life = 3;
var gamestate="start";

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpg")

  knife = loadImage("assets/knife.png")

  ghost = loadImage("assets/ghost.jpg")   

  life3Img=loadImage("assets/heart_3.png")

  life2Img=loadImage("assets/heart_2.png")

  life1Img=loadImage("assets/heart_1.png")
  
  bulletImg=loadImage("assets/bullets.png")
  
  bulletSound=loadSound("assets/explosion.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  groupZ=new Group();
  bulletgroup=new Group();
  
  
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.2
   
  life3sprite=createSprite(displayWidth-70,30);
  life3sprite.addImage(life3Img)
  life3sprite.scale=0.2

  life1sprite=createSprite(displayWidth-70,30);
  life1sprite.addImage(life1Img)
  life1sprite.scale=0.2

  life2sprite=createSprite(displayWidth-70,30);
  life2sprite.addImage(life2Img)
  life2sprite.scale=0.2

//creating the player sprite
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   

}

function draw() {
  background(0); 

if(gamestate==="start")
{
  
bg.visible=false;
player.visible=false;
life1sprite.visible=false;
life2sprite.visible=false;
life3sprite.visible=false;

textSize(50);
text("PRESS SPACE TO START ",windowWidth/2-300,windowHeight/2);
 
if(keyDown("space"))
{
  gamestate="play";
}
}

if(gamestate==="play")
{

  bg.visible=true;
  player.visible=true;

   if(player.y<100)
   {
     player.y=100;
   }

  if(player.y> displayHeight-250)
  {
  player.y=displayHeight-250;
  }

  if(life===3)
 {
   life3sprite.visible=true;
   life2sprite.visible=false;
   life1sprite.visible=false;
 }

 if(life===2)
 {
   life3sprite.visible=false;
   life2sprite.visible=true;
   life1sprite.visible=false;
 }

 if(life===1)
 {
   life3sprite.visible=false;
   life2sprite.visible=false;
   life1sprite.visible=true;
 }

 if(life===0)
 {
   life3sprite.visible=false;
   life2sprite.visible=false;
   life1sprite.visible=false;
 }

if(score%10===0 && life<3)
{
  life+=1;
}




if(life===0 && score>=50)
{
  gamestate="won";
}

if(life===0 && score<5)
{
  gamestate="lost";
}
 
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
 bullets=createSprite(displayWidth-1100,player.y-25,10,10);
bulletgroup.add(bullets);

 bullets.debug = true
 bullets.setCollider("rectangle",0,0,300,300)
 bullets.addImage(bulletImg);
 bullets.velocityX=30
 bullets.scale = 0.05
 player.addImage(shooter_shooting);
 bulletSound.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(groupZ.isTouching(bulletgroup))
{
  for(var i=0;i<groupZ.length;i++)
  {
    if(groupZ[i].isTouching(bulletgroup))
    {
      groupZ[i].destroy();
      bulletgroup.destroyEach();
      bulletSound.play();
      score=score+1;
    }
  }
 
}
 
if(groupZ.isTouching(player))
{
  for(var i=0;i<groupZ.length;i++) 
 {
if (groupZ[i].isTouching(player))
  { 
  groupZ[i].destroy();
  life=life-1;
  }
 }
  }
 
spawnzombies();
}

 
drawSprites();

if(gamestate==="won")
{
  bg.visible=false;
 textSize(80);
 fill ("white");
 text("you won!!",windowWidth/2-100,windowHeight/2);

 groupZ.destroyEach();
 player.destroy();
}

if(gamestate==="lost")
{
  bg.visible=false;
 textSize(80);
 fill ("white");
 text("you lose",windowWidth/2-100,windowHeight/2);
 groupZ.destroyEach();
 player.destroy();
}

//score//
textSize(20);
fill("yellow");
text("score: "+score,displayWidth-150,70);

//life//
text("lives left : "+life,displayWidth-150,110);
}
 //spawn zombies//

function spawnzombies()
{
if (frameCount % 60===0)
{

zombie=createSprite(windowWidth,Math.round(random(30,windowHeight-30)))
zombie.addImage(ghost);
zombie.debug = true
zombie.setCollider("rectangle",0,0,500,800)
zombie.scale=0.5;
 zombie.velocityX=-10;
 zombie.lifetime=150
 groupZ.add(zombie);
}
}