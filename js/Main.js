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

var showCredits = false;

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
  gameStarted = true;
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
  if(showCredits) { // reached here for end of game sequence, not the same path as menu since drawEverything is going yet for menu
    drawCredits();
    return;
  }
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
      showCredits = true;
      break; 
  }
  if(rightDialogRoomFin && leftDialogRoomFin && belowDialogRoomFin){
    openEndRoom();
  }
}

function openEndRoom() {
  rooms[ROOM_STARTING][GRID][8] = TILE_GROUND;
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
  if(showCredits) {
    drawCredits();
    return;
  }

  var wobble = Math.cos(performance.now()/1000)*25;
  drawText('Click to Play',281,311+wobble,42,'white');
  drawText('Click to Play',280,310+wobble,42,'black');
  canvasContext.drawImage(playerPic,310-wobble,300+wobble);

  drawText('Click here to view credits',280-wobble/5,435,22,'black');
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

var creditsList = [
"Abhishek @akhmin_ak: Project lead, core gameplay, main writing, level design, NPC dialog trigger, base wall art, text wrapping, advancing dialog, animation support, item/character drifting, inventory toggle, player depth effect, character art (Tripa, Despond, Satah updates), music switching based on room, mouse inventory selection, vine walls, door open sound, variable room size support, heart item, UI cleanup, particle tuning, assorted bug fixes, dialog editor copy/paste support",
"Farah R: Dialog box style based on character, marble tile floor design, boxing glove item, inventory UI main functionality, Gemini character, dialog freeze bug fix, additional character dialog hookup, mute toggle, editor cursor fix",
"Bilal A. Cheema: Dialog choice system, music (sad room), dialog typing effect, dynamic chat box height, WASD support, camera panning, internal map editor",
"Patrick McKeown: Teardrop sprite, floor and wall tile art, inventory item descriptions, room backtracking, songs (happy room, angry room, heavy drums track), Satah character, interaction particle spawning, pause button, audio compression, initial sound code, test dialog",
"Evan Sklarski: Inventory tooltip system, sound manager code, title screen core functionality, room transition fix, dialog editing, font size fix, file reference refactor, additional sound integration, testing cheat, Linux compatibility fix",
"Christer \"McFunkypants\" Kaitila: Title screen effects, assorted sound effects, book page sprite, dialog choice fix, sound integration, canvas stretch",
"H Trayford: Dialog editor and related custom format (originally developed for Warped Radar), dialog editor additional bug fix, dialog mouse interaction",
"Ryan Malm: Smoother camera movement fix tile seams",
"Johan Östling: Sad vase of dead flowers",
"Chris DeLeon: Dialog background animation code, choices word wrap, small bug fix",
" ",
"                    Game developed by members in HomeTeamGameDev.com - come make games with us!",
" ",
"                                                               - Click anywhere to begin game -"
];

function drawCredits() {
  var lineX = 13;
  var lineY = 1;
  var creditsSize = 15;
  var lineSkip = creditsSize+1;
  colorRect(0, 0, canvas.width, canvas.height, "#003300FF");
  for(var i=0;i<creditsList.length;i++) {
      drawText(creditsList[i], lineX, lineY+=lineSkip, creditsSize, "white");
  }
}

function lineWrapCredits() { // note: gets calling immediately after definition!
  const newCut = [];
  var maxLineChar = 114;
  var findEnd;

  for(let i = 0; i < creditsList.length; i++) {
    const currentLine = creditsList[i];
    for(let j = 0; j < currentLine.length; j++) {
      /*const aChar = currentLine[j];
      if(aChar === ":") {
        if(i !== 0) {
          newCut.push("\n");
        }

        newCut.push(currentLine.substring(0, j + 1));
        newCut.push(currentLine.substring(j + 2, currentLine.length));
        break;
      } else*/ if(j === currentLine.length - 1) {
        if((i === 0) || (i >= creditsList.length - 2)) {
          newCut.push(currentLine);
        } else {
          newCut.push(currentLine.substring(0, currentLine.length));
        }
      }
    }
  }

  const newerCut = [];
  for(var i=0;i<newCut.length;i++) {
    while(newCut[i].length > 0) {
      findEnd = maxLineChar;
      if(newCut[i].length > maxLineChar) {
        for(var ii=findEnd;ii>0;ii--) {
          if(newCut[i].charAt(ii) == " ") {
            findEnd=ii;
            break;
          }
        }
      }
      newerCut.push(newCut[i].substring(0, findEnd));
      newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
    }
  }

  creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function