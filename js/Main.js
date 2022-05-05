// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var camX = 0
var camY = 0
var p1 = new Soul();

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

// inventory tooltip properties
const inventoryTooltipTimer = 4 * framesPerSecond;
var toDrawOrNotToDraw = -1;
var firstItem = true;
var addedItem = null;


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
/*
function titleScreenExplosion() {
for(let i=0; i<50; i++) {
    let size = 0.25;
    let life = 150 + Math.random() * 25;
    let x = 400 + Math.random() * 8 - 4;
    let y = 300 + Math.random() * 8 - 4;
    let xVel = (Math.random() * 0.6) - 0.3;
    let yVel = (Math.random() * 0.6) - 0.3;
    let color = "rgba(255, 0, 0, 0.5)";
    particleArray.push(new Particle(x, y, xVel, yVel, size, color, life));
    }
}
*/
function animateTitlescreen() {
    drawTitle(); // the logo and titlescreen image
    //animateParticles();
    //if (Math.random()<0.1) titleScreenExplosion();
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
  
  // opens all doors on game start
  // DoorCheat();
}

function updateEverything() {
  deltaTime = getDelta();

  switch (gameState) {
  
    case STATE_PLAY:
      if (showingInventory == false){
        //Camera Lerping
        camX = intLerp(camX, canvas.width/2 - p1.x, 0.1);
        camY = intLerp(camY, canvas.height/2 - p1.y, 0.1);

        processDialog();

        //No movement during dialogues
        if(dialogActiveConvo != null) return;

        p1.move();

      }
     
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

  if (toDrawOrNotToDraw > 0) {
    drawInventoryTip();
    toDrawOrNotToDraw -= 1;
  }

  /*if(dialogActiveConvo) {
    debugText = dialogCurrentText;
  } else {
    debugText = ' Text';
  }*/

}

function DoorCheat() {
  rooms[roomIndex][GRID][96] = TILE_GROUND;
  rooms[roomIndex][GRID][184] = TILE_GROUND;
  rooms[roomIndex][GRID][111] = TILE_GROUND;
  rooms[ROOM_STARTING][GRID][8] = TILE_GROUND;
}

function handleDialogBasedOnRoom (){
  console.log("Dialog ended.");
  switch(roomIndex){
    case ROOM_STARTING:
      rooms[roomIndex][GRID][96] = TILE_GROUND;
      rooms[roomIndex][GRID][184] = TILE_GROUND;
      rooms[roomIndex][GRID][111] = TILE_GROUND;
      playSound(Sound.Teleport);
      break;
    case ROOM_RIGHT:
      rightDialogRoomFin = true;
      console.log("done right");
      p1.addInventoryItem(ITEM_TEARDROP);
      break;
    case ROOM_BELOW:
      belowDialogRoomFin = true;
      console.log("done below");
      p1.addInventoryItem(ITEM_PAGE);
      break;
    case ROOM_LEFT:
      leftDialogRoomFin = true;
      console.log("done left");
      p1.addInventoryItem(ITEM_BOXING);
      break;
    case ROOM_TOP:
      console.log("To do endgame");
      break; 
  }
  if(rightDialogRoomFin && leftDialogRoomFin && belowDialogRoomFin){
    rooms[ROOM_STARTING][GRID][8] = TILE_GROUND;
  }
}


function drawInventoryTip() {
  var itemName = p1.inventory[addedItem].name;
  var txt = itemName + " added to inventory";

  // how many characters are we drawing:
  var characters = Array.from(txt).length;

  // don't size smaller than inventory hint
  if (characters < 33 && firstItem) characters = 33;

  // not perfect :)
  // this is fragile, will need tuning if tooltip font or size changed
  var boxWidth = characters * 12;

  var transparency = toDrawOrNotToDraw > framesPerSecond ?
    0.75 :
    0.75 * (toDrawOrNotToDraw / framesPerSecond);

  // adjust for hint text
  if (firstItem) {
    drawRect(5, canvas.height - 70, boxWidth, 65, "black", transparency);
    drawText(txt, 10, canvas.height - 45, 24, 'lightblue');
  }
  else {
    drawRect(5, canvas.height - 40, boxWidth, 35, "black", transparency);
    drawText(txt, 10, canvas.height - 15, 24, 'lightblue');
  }

  // draw hint text
  if (firstItem && toDrawOrNotToDraw > 1) {
    txt = "press 'I' key to toggle inventory";
    drawText(txt, 10, canvas.height - 15, 24, 'lightblue');
  }
  else if (firstItem && toDrawOrNotToDraw <= 1) {
    firstItem = false;
  }
}


function drawRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, transparency = null) {
  if (transparency != null) { canvasContext.globalAlpha = transparency; }

  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);

  if (transparency != null) { canvasContext.globalAlpha = 1; }
}


function drawTitle() {
  canvasContext.drawImage(titlescreenBG,0,0);
  // removed because the logo is in the titlescreen image above:
  //twoColorText('Spiritventure', 80, 150, 84, 7, 'grey', 'white');
}
function DrawClickToPlay() {
  var wobble = Math.cos(performance.now()/1000)*25;
  drawText('Click to Play',281,311+wobble,42,'white');
  drawText('Click to Play',280,310+wobble,42,'black');
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