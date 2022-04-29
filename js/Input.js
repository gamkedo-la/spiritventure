// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_SPACE = 32;
const KEY_BACKSPACE = 8;
const KEY_TAB = 9;
const KEY_ENTER = 13;
const KEY_SHIFT = 16;
const KEY_LETTER_U = 85;
const KEY_LETTER_H = 72;
const KEY_LETTER_J = 74;
const KEY_LETTER_K = 75;

// game nav controls
const KEY_ESC = 27; // menu?
const KEY_M = 77; // Mute music
const KEY_I = 73; // Inventory
const KEY_P = 80; // Pause game

var mouseX = 0;
var mouseY = 0;

var firstClick = false;

function initInput() {
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("click", mouseClick);
  document.addEventListener("wheel", tilemapEditorWheel);
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  
  p1.setupControls(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW,KEY_LEFT_ARROW,KEY_SHIFT);
  p1.setupAltControls(KEY_LETTER_W,KEY_LETTER_D,KEY_LETTER_S,KEY_LETTER_A);
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if(thisKey == thisPlayer.controlKeyForNorth
    || thisKey == thisPlayer.controlAltKeyForNorth) {
    thisPlayer.keyHeld_North = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForEast
    || thisKey == thisPlayer.controlAltKeyForEast) {
    thisPlayer.keyHeld_East = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForSouth
    || thisKey == thisPlayer.controlAltKeyForSouth) {
    thisPlayer.keyHeld_South = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForWest
    || thisKey == thisPlayer.controlAltKeyForWest) {
    thisPlayer.keyHeld_West = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForSprint) {
    thisPlayer.keyHeld_Sprint = setTo;
  }
}

function mouseMove(evt) {
  var targetRect = evt.target.getBoundingClientRect();
  mouseX = remap(evt.clientX, 0, window.innerWidth, targetRect.x, canvas.width);
  var canvasRatio = canvas.height / canvas.width
  var windowRatio = window.innerHeight / window.innerWidth

  if (canvasRatio > windowRatio){
    // This mouseY remap doesn't track well when there's black space below the canvas!
    mouseY = remap(evt.clientY, 0, window.innerHeight, targetRect.y, canvas.height);
  } else {
    // keeping mouseY based on proportional scale
    var horizontalProportion = window.innerWidth / canvas.width
    mouseY = evt.clientY / horizontalProportion;
  }
}

function mouseClick(evt) {
  if (loadComplete)
  {
    if (gameloop != null) {      
      const dialogWasAdvanced = advanceDialog();
      const dialogChoicesAvailable = checkDialogChoices();

      if (!dialogWasAdvanced && !dialogChoicesAvailable) {
        p1.moveToPos.x = mouseX - camX; // this.x + camX, this.y + camY
        p1.moveToPos.y = mouseY - camY;
      } else {
        p1.moveToPos.x = null;
        p1.moveToPos.y = null;
      }
    }
    else {
      startBGM();
      StartGame();
    }
  }
}

function checkDialogChoices () {
  if (dialogChoiceButtons.length > 0) {
    for (const btn of dialogChoiceButtons) {
      if (mouseX > btn.x && mouseX < btn.x + btn.width && mouseY > btn.y && mouseY < btn.y + btn.height) {
        selectDialogChoice(btn.key);
        break;
      }
    }

    return true; // meaning we actually did choose a dialog choice
  }

  return false; // no dialog choice to choose
}

function keyPressed(evt) {
  if (loadComplete) {
    setKeyHoldState(evt.keyCode, p1, true);
    tilemapEditorKeyInput(evt.keyCode);
    selectDialogChoice(evt.keyCode);
    evt.preventDefault(); // without this, arrow keys scroll the browser!
  }
}

function keyReleased(evt) {
  if (loadComplete) {
    switch(evt.keyCode){
      case KEY_SPACE:
        advanceDialog();
        break;
      case KEY_TAB:
        tilemapEditor = !tilemapEditor;
        document.getElementById("debugText").innerHTML = "Tilemap Editor: " + tilemapEditor;
        break;
      case KEY_I:
        showingInventory = !showingInventory; //toggle
        break;
      case KEY_M:
        volumeControl.toggleMute();
        break;
      case KEY_P:
        if (gameState == STATE_PLAY) {
          gameState = STATE_PAUSE;
        } else {
          gameState = STATE_PLAY;
        }
        console.log('P key')
        break;
      case KEY_LETTER_U:
        console.log("Decrease Row");
        rooms[roomIndex][ROWS]--;
        rooms[roomIndex][GRID].splice(-rooms[roomIndex][COLS],rooms[roomIndex][COLS]);
        break;
      case KEY_LETTER_H:
        console.log("Decrease Column");
        rooms[roomIndex][COLS]--;
        for(var i = 0; i<rooms[roomIndex][ROWS];i++){
          rooms[roomIndex][GRID].splice((i+1)*rooms[roomIndex][COLS],1);
        }
        break;
      case KEY_LETTER_J:
        console.log("Increase Row");
        rooms[roomIndex][ROWS]++;
        for(var i = 0; i<rooms[roomIndex][COLS];i++){
          rooms[roomIndex][GRID].push(TILE_GROUND);
        }
        break;
      case KEY_LETTER_K:
        console.log("Increase Column");
        rooms[roomIndex][COLS]++;
        for(var i = 0; i<rooms[roomIndex][ROWS];i++){
          rooms[roomIndex][GRID].splice((i+1)*rooms[roomIndex][COLS]-1,0,TILE_GROUND);
        }
        break;
    }
    setKeyHoldState(evt.keyCode, p1, false);
  } // if loadComplete
}


function mouseupHandler() {
  backgroundMusic.startOrStopMusic();
}