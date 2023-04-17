var jorge, jorgeImg, JorgelowImg, Jorgemrt
var bordas;
var chao, chaoImg;
var floor;
var nuv, nuvImg
var cact, cactImg

var pnts = 0

var GAMEOVER = 2

var PLAY = 1
var gamestate = PLAY

var cacts
var nuvs

var GO, GOImg
var RST, RSTImg

function preload() {
  //pré carrega imagens, animações, sons, etc

  jorgeImg = loadAnimation("trex3.png", "trex4.png");

  Jorgemrt = loadAnimation("trex_collided.png")

  chaoImg = loadImage("ground2.png")

  nuvImg = loadImage("cloud.png")

  GOImg = loadImage("gameOver.png")
  RSTImg = loadImage("restart.png")

  cactImg1 = loadImage("obstacle1.png") 
  cactImg2 = loadImage("obstacle2.png") 
  cactImg3 = loadImage("obstacle3.png") 
  cactImg4 = loadImage("obstacle4.png") 
  cactImg5 = loadImage("obstacle5.png")
  cactImg6 = loadImage("obstacle6.png")

  JorgelowImg = loadImage("trex_low1.png", "trex_low2.png")

  }
 


function setup() {
  //função de configuração

  cacts = new Group ()
  nuvs = new Group ()

  GO = createSprite(300, 60, 20, 20)
  GO.addImage (GOImg)

  RST = createSprite(300, 130, 20, 20)
  RST.addImage (RSTImg)
  RST.scale = 0.7



  var teste = Math.round (random (1, 10))
  console.log(teste)

  createCanvas(600, 200);

  jorge = createSprite(50, 110, 20, 20);
  jorge.addAnimation("running", jorgeImg);
  jorge.scale = 0.5;
  jorge.addAnimation("F", Jorgemrt);

  bordas = createEdgeSprites();
  

  floor = createSprite(300, 200, 600, 20)
  //floor.shapeColor = "rgba(0, 0, 0, 0)" 
  floor.visible = false
  

  chao = createSprite(300, 190, 20, 20)
  chao.addImage(chaoImg)
}



function draw() {
  background("white"); 

  //&& jorge.isTouching (chao)
  
  text ("Score= "+ pnts, 10, 20) 

 

  if (gamestate===PLAY){
    if (keyDown("space") && jorge.y > 166) {
      jorge.velocityY = -12;
     
      
    }

    //gravidade
    jorge.velocityY = jorge.velocityY + 1;
     
    chao.velocityX = - 7;

    if (chao.x < 0){ 
      chao.x = chao.width/2
   
  
    }

    nuvens ();

    cactos();

    if (jorge.isTouching (cacts)){
      gamestate = GAMEOVER

      
    }   

    pnts = Math.round (pnts + frameCount / 60)

    GO.visible = false
    RST.visible = false
    
  }else if (gamestate===GAMEOVER){

    chao.velocityX = 0;
    jorge.changeAnimation ("F")
    cacts.setVelocityXEach (0)
    nuvs.setVelocityXEach (0)   

    cacts.setLifetimeEach (-1)
    nuvs.setLifetimeEach (-1)



    jorge.velocityY = 0
     
    GO.visible = true
    RST.visible = true
  }

  //console.log (jorge.y) 

  jorge.collide(bordas);
  jorge.collide (floor)  

  
  //if (keyDown ("f") && jorge.isTouching (floor)){
    //jorge.addImage (JorgelowImg)

  //}else {
    //jorge.addAnimation("running", jorgeImg);

  //}

  

  drawSprites();
}

function nuvens(){

 if (frameCount % 60 === 0){
  nuv = createSprite (615, random (50, 150), 20, 20);
  nuv.velocityX = - 3
  nuv.addImage (nuvImg)
  nuv.scale = 0.6
  nuv.depth = jorge.depth -1
  nuv.lifetime = 220

  nuvs.add (nuv)
 }

 

}

function cactos(){

 if  (frameCount % 70 === 0){
   cact = createSprite (610, 175, 20, 20);
   cact.velocityX = -7
   cact.scale = 0.5

   cact.lifetime = 100



  
   var cactran = Math.round (random (1, 6))
   switch (cactran){
    case 1: cact.addImage (cactImg1);
    break;

    case 2: cact.addImage (cactImg2);
    break;

    case 3: cact.addImage (cactImg3);
    break;

    case 4: cact.addImage (cactImg4);
    break;

    case 5: cact.addImage (cactImg5);
    break;

    case 6: cact.addImage (cactImg6);
    break;

    


   }
   
    //randomização dos cactos

    cacts.add (cact)
  

  } 

}

