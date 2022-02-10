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

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  
  p1.setupControls(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW,KEY_LEFT_ARROW);
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
  }
  setKeyHoldState(evt.keyCode, p1, false);
}


function mouseupHandler() {
  backgroundMusic.startOrStopMusic();
}