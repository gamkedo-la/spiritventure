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

var mouseX = 0;
var mouseY = 0;

function initInput() {
  document.addEventListener("mousemove", mouseMove);
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

  if(tilemapEditor && editorTileIndex >= 0) {
    var no = keyToNumber(thisKey);
    if(no > -1 && no != TILE_PLAYER && no < TOTAL_TILES) roomGrid[editorTileIndex] = no;
  }

  if(thisKey == KEY_BACKSPACE) {
    save(roomGrid);
  }
}

function mouseMove(evt) {
  var targetRect = evt.target.getBoundingClientRect();
  mouseX = remap(evt.clientX, 0, window.innerWidth, targetRect.x, canvas.width);
  mouseY = remap(evt.clientY, 0, window.innerHeight, targetRect.y, canvas.height);
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, p1, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  switch(evt.keyCode){
    case KEY_SPACE:
      advanceDialog();
      break;
    case KEY_TAB:
      tilemapEditor = !tilemapEditor;
      document.getElementById("debugText").innerHTML = "Tilemap Editor: " + tilemapEditor;
      break;
  }
  setKeyHoldState(evt.keyCode, p1, false);
}


function mouseupHandler() {
  backgroundMusic.startOrStopMusic();
}