
let playerName = prompt("Enter your name to be used for the game");

let board;
let boardWidth =360;
let boardHeight=640;
let context;


let birdWidth=34;
let birdHeight=24;
let birdX= boardWidth/8;
let birdY=boardHeight/2;
let birdImg;


let bird={
  x : birdX,
  y : birdY,
  width : birdWidth,
  height : birdHeight
  
}


let pipeArray=[];
let pipeWidth=64;
let pipeHeight=512;
let pipeX=boardWidth;
let pipeY=0;

let topPipeImage;
let bottomPipeImage;

//physics

let velocityX=-3;
let velocityY=0;
let gravity=0.2;

let gameStart=false
let gameOver=false;

let score=0;
let timeForPipes=1900;
let pipeIntervalID;
let peacefulMode=false;
let level=null;
let i=0;
let levelHard=false;

function levelSelection(selectedLevel){
  
  level=selectedLevel;
  if (level==="peaceful"){
    i=i+1;
    peacefulMode=true;
    console.log("peace");
    
    
  }
  
  if (level==="normal"){
    i=i+1;
    
  }
  
  if( level==="hard"){
    levelHard=true;
    i=i+1;
    velocityX=-4;
  }
  document.getElementById("levelSelection").style.display = "none";
  document.getElementById("Title").style.display = "none";
  document.getElementById("Title2").style.display = "none";
  document.getElementById("board").style.display = "block";
  document.getElementById("Homebtn").style.display = "block";
  document.getElementById("infoLevels").style.display = "none";
  document.querySelector(".infoAboutLevels").style.display="none";
  document.getElementById("leaderboard").style.display="none";
   document.querySelector(".infoAboutLeader").style.display="none";
  firstBlock();
}


function firstBlock(){
  board= document.getElementById("board");
  board.height=boardHeight;
  board.width=boardWidth;
  context= board.getContext("2d");
  
  context.imageSmoothingEnabled = false;
  //used for drawing on the board
  
  //drawing the bird
  //context.fillstyle="green";
  //context.fillRect(bird.x,bird.y,bird.width,bird.height);
  
  //loading the image
  birdImg= new Image()
  birdImg.src="./bird6.png"
  birdImg.onload=function(){
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height
      );
    context.fillStyle = "red";
    context.font = "40px Pixelify Sans, sans-serif ";
    context.fillText("Click to start", board.width/8, board.height/2);
    
    
  }
  
  //defining the images for the pipes
  topPipeImage= new Image();
  topPipeImage.src="./toppipe.png";
  
  bottomPipeImage= new Image();
  bottomPipeImage.src="./bottompipe.png";
  
  document.addEventListener("click",handleStart)

  }


  
  
  
function handleStart(){
  i=i+1;
    if(!gameStart && i==3){
      gameStart=true;
      //calling the update animation frame it updates our canvas
      //requestAnimationFrame(update);
      setInterval(update,1000/60);
     //calling the pipes every 1500ms
      pipeCalling(timeForPipes);
  
  //takes input
  document.removeEventListener("click",handleStart)
  document.addEventListener("click", moveBird);
  document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
      e.preventDefault(); // Prevent page scroll
      moveBird();
    }
  });
    }
  }




function pipeCalling(timeForPipes){
  pipeIntervalID=setInterval(placePipes,timeForPipes);
}






function update(){
  //requestAnimationFrame(update);
  //this is calling the function repeatedly
  
  if (gameOver){
    return;
  }
  context.clearRect(0,0,board.width,board.height);
  
  //this will clear the previous frame everytime. the bird will also be cleared so we draw it again everytime.
  
  velocityY+=gravity;
  bird.y = Math.max(bird.y+velocityY,0)
  //max is height 0 ie top of board
  context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
  
  
  //check if bird is out of box
  if (bird.y>board.height){
    gameOver=true;
  }
  
    for (let i = 0; i < pipeArray.length; i++) {
    let pipe=pipeArray[i];
    pipe.x+=velocityX;
    context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
    
    
    
    //setting conditions for when yo count score
    if (!pipe.passed && bird.x>pipe.x+pipe.width){
      score+=0.5;//coz there are 2 pipes
      pipe.passed=true;
      console.log(score)
      
      
    }
    if(!peacefulMode && !levelHard){
      if (score==10){
      context.fillStyle="red";
      context.font="45px Pixelify Sans, sans-serif";
      context.fillText("Round 2",boardWidth/4,boardHeight/2);
      velocityX=-4;
      timeForPipes=1500;
      clearInterval(pipeIntervalID);
      pipeCalling(timeForPipes);
    }
    
    if (score==20){
      console.log("hello")
      context.fillStyle="red";
      context.font="45px Pixelify Sans, sans-serif";
      context.fillText("Round 3",boardWidth/4,boardHeight/2);
      velocityX=-5;
      timeForPipes=1100;
      clearInterval(pipeIntervalID);
      pipeCalling(timeForPipes);
    }
    
    if (score==30){
      context.fillStyle="red";
      context.font="45px Pixelify Sans, sans-serif";
      context.fillText("Round Max",boardWidth/6,boardHeight/2);
      velocityX=-5.5;
      timeForPipes=1100;
      clearInterval(pipeIntervalID);
      pipeCalling(timeForPipes);
    }
    
}

if (levelHard){
    if (score==5){
      context.fillStyle="red";
      context.font="45px Pixelify Sans, sans-serif";
      context.fillText("Round 2",boardWidth/4,boardHeight/2);
      velocityX=-5;
      timeForPipes=1200;
      clearInterval(pipeIntervalID);
      pipeCalling(timeForPipes);
    }
    
    if (score==15){
      console.log("hello")
      context.fillStyle="red";
      context.font="45px Pixelify Sans, sans-serif";
      context.fillText("Round 3",boardWidth/4,boardHeight/2);
      velocityX=-6;
      timeForPipes=1200;
      clearInterval(pipeIntervalID);
      pipeCalling(timeForPipes);
    }
    
    if (score==25){
      context.fillStyle="red";
      context.font="45px Pixelify Sans, sans-serif";
      context.fillText("Round Max",boardWidth/6,boardHeight/2);
      velocityX=-6.5;
      timeForPipes=1200;
      clearInterval(pipeIntervalID);
      pipeCalling(timeForPipes);
    }
}

    
    //checking if game over
    if(detectCollision(bird,pipe)){
      gameOver=true;
    }
    
  }
  
  //clear the pipes as the games goes on array becomes too big and might cause lag
  while (pipeArray.length>0 && pipeArray[0].x<-pipeWidth){
    pipeArray.shift(); //removes first element
  }
  
  //score counter
  context.fillStyle="white";
  context.font="45px Pixelify Sans, sans-serif";
  context.fillText(score,5,45);
  
  if(gameOver){
    context.fillText("GAME OVER!",60,120);
    context.fillText("Click to restart",5,boardHeight/2);
  }
  if (gameOver) {
  submitScore(playerName, score , level);
  scoreSubmitted = true; // Make sure you don’t submit multiple times
}

}


function placePipes(){
  
  
    
  if (gameOver){
    return;
  }
  //the initial subtraction is so that the max pipe height will be about the quarter of the screen. not to low
  // maths random generates a numbe from 0 to 1.
  
  let randomPipeY=pipeY-pipeHeight/4-Math.random()*pipeHeight/2;
  let openingSpace=board.height/4;
  
  let topPipe={
    img : topPipeImage,
    x : pipeX,
    y : randomPipeY,
    width : pipeWidth,
    height : pipeHeight,
    passed: false
  }
  
  pipeArray.push(topPipe);
  
  
  let bottomPipe={
    img : bottomPipeImage,
    x : pipeX,
    y : randomPipeY+pipeHeight+openingSpace,
    width : pipeWidth,
    height : pipeHeight,
    passed: false
  }
  
  pipeArray.push(bottomPipe);
  
  
  
  
}

function moveBird() {

    gameStart=true
    velocityY=-4;
    
    //reset the game
    
    if (gameOver){
      bird.y=birdY;
      pipeArray=[]
      score=0;
      gameOver=false;
      velocityX=-3
      timeForPipes=1900;
      clearInterval(pipeIntervalID);
      pipeCalling(timeForPipes )
    }

}

function detectCollision(a,b){
  return a.x< b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function startGame(){
  gameStart=true;
}

let infoShown=false;
function ShowInfo(){
 if (!infoShown){
  document.getElementById("infoLevels").style.display="block"
  infoShown=true;
 }
 else if (infoShown){
   document.getElementById("infoLevels").style.display="none"
  infoShown=false;
 }

}
const API_URL = "https://taptapbird.onrender.com";

function submitScore(name, score, level) {
  console.log(level)
  fetch(`${API_URL}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, score, level })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      
    }
  });
}

let leaderboardshown=false;
function loadLeaderboard() {
  if (!leaderboardshown){
    document.getElementById("leaderboard").style.display="block";
    leaderboardshown=true;
  }
  else if (leaderboardshown){
    document.getElementById("leaderboard").style.display="none";
     leaderboardshown=false;
  }
   fetch(`${API_URL}/leaderboard`)
    .then(res => res.json())
    .then(data => {
      let html = "<h3>Leaderboard</h3><ol>";
      data.forEach(player => {
        html += `<li>${player.name}: ${player.score}: ${player.level}</li>`;
      });
      html += "</ol>";
      document.getElementById("leaderboard").innerHTML = html;
    });
 

  
}
