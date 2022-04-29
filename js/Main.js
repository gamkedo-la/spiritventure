// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var camX = 0
var camY = 0
var p1 = new warriorClass();

var deltaTime = 0;
var debugText;
var gameFont = 'Georgia, Arial, sans-serif';

const STATE_TITLE = 0;
const STATE_PLAY = 1;
const STATE_PAUSE = 2;
var gameState = STATE_PLAY;
var particleNPCrun = false;

var leftDialogRoomFin = false;
var rightDialogRoomFin = false;
var belowDialogRoomFin = false;

// game loop properties
var loadComplete = false;
var gameloop;
const framesPerSecond = 30;

function toggleMuteMusic(){
  music.muted = !(music.muted);
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.font = dialogFontSize.toString() + "px " + gameFont;
  loadImages();
}

function loadingDoneSoStartGame() {  
  p1.init(playerPic, "Blue");
  initInput();
  animateTitlescreen();
  loadComplete = true;
}

function animateTitlescreen() {
    drawTitle(); // the logo and titlescreen image
    DrawClickToPlay(); // FIXME: replace with main menu, credits, etc
    if (!gameloop) { // repeat until the game starts:
        window.requestAnimationFrame(animateTitlescreen);
    }
}

function StartGame() {
  gameloop =
  setInterval(function() {
    updateEverything();
    drawEverything();
  }, 1000/framesPerSecond);
}

function updateEverything() {
  deltaTime = getDelta();

  switch (gameState) {
  
    case STATE_PLAY:
      //Camera Lerping
      camX = intLerp(camX, canvas.width/2 - p1.x, 0.1);
      camY = intLerp(camY, canvas.height/2 - p1.y, 0.1);

      processDialog();

      //No movement during dialogues
      if(dialogActiveConvo != null) return;

      p1.move();

      break;

    case STATE_PAUSE:
      drawPause();
      break;
  }

}


function drawEverything() {
  //Drawing black background to avoid visual glitches
  colorRect(0, 0, canvas.width, canvas.height, "#000000FF");

  drawRoom();
  //p1.draw();//  happens as part of draw room so the player can walk behind stuff
  if (particleNPCrun) {
    animateParticles();
  }

  drawDialog();
  drawAnimatedInventory();

  if (gameState == STATE_PAUSE) {
    drawPause();
  }

  /*if(dialogActiveConvo) {
    debugText = dialogCurrentText;
  } else {
    debugText = 'Debug Text';
  }*/
  document.querySelector('#debugText').innerHTML = debugText;
}

function handleDialogBasedOnRoom (){
  switch(roomIndex){
    case ROOM_STARTING:
      rooms[roomIndex][GRID][96] = TILE_GROUND;
      rooms[roomIndex][GRID][184] = TILE_GROUND;
      rooms[roomIndex][GRID][111] = TILE_GROUND;
      //rooms[roomIndex][GRID][8] = TILE_GROUND;
      p1.inventory[ITEM_TEARDROP].quantity = 1;
      break;
    case ROOM_RIGHT:
      rightDialogRoomFin = true;
      console.log("done right");
      break;
    case ROOM_BELOW:
      belowDialogRoomFin = true;
      console.log("done below");
      break;
    case ROOM_LEFT:
      leftDialogRoomFin = true;
      console.log("done left");
      break;
    case ROOM_TOP:
      console.log("To do endgame");
      break; 
  }
  if(rightDialogRoomFin && leftDialogRoomFin && belowDialogRoomFin){
    rooms[ROOM_STARTING][GRID][8] = TILE_GROUND;
  }
}

function drawTitle() {
  canvasContext.drawImage(titlescreenBG,0,0);
  // removed because the logo is in the titlescreen image above:
  //twoColorText('Spiritventure', 80, 150, 84, 7, 'grey', 'white');
}
function DrawClickToPlay() {
  var wobble = Math.cos(performance.now()/1000)*25;
  drawText('Click to Play', 275, 400+wobble, 42, 'grey');
}
function drawPause() {
  twoColorText('Paused', 280, 250, 84, 7, 'black', 'white');
}
function drawText(str, x, y, size, colour) {
  canvasContext.fillStyle = colour;
  canvasContext.font = size + 'px Arial';
  canvasContext.fillText(str, x, y);
}
function twoColorText(text, atX, atY, size, offset, foregroundColor, backgroundColor){
  canvasContext.font = size + 'px Arial';
  canvasContext.fillStyle = backgroundColor;
  canvasContext.fillText(text, atX + offset, atY + offset)
  canvasContext.fillStyle = foregroundColor;
  canvasContext.fillText(text, atX, atY)
}