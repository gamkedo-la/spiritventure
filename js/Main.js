// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var camX = 0
var camY = 0
var p1 = new warriorClass();

var music, doorSFX, keySFX;

var deltaTime = 0;
var debugText;
var gameFont = 'Georgia, Arial, sans-serif';

function maybeStartMusic(e) { 
    if (!music) {
        console.log("first click! now we are allowed to start the music.");
        music = new Audio ("sound/Lurking Sadness.mp3");
        music.loop = true;
        music.play();

        doorSFX = new Audio ("sound/door_open_dra.wav");
        keySFX = new Audio ("sound/pickup_key.mp3");

    }
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.font = dialogFontSize.toString() + "px " + gameFont;
  
  // browsers force us to wait for a click or keypress until playing sounds
  document.addEventListener("click", maybeStartMusic);
  document.addEventListener("keydown", maybeStartMusic);

  loadImages();
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      updateEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  
  p1.init(playerPic, "Blue");
  initInput();

}

function updateEverything() {
  deltaTime = getDelta();

  //Camera Lerping
  camX = lerp(camX, canvas.width/2 - p1.x, 0.1);
  camY = lerp(camY, canvas.height/2 - p1.y, 0.1);

  processDialog();

  //No movement during dialogues
  if(dialogActiveConvo != null) return;

  p1.move();
}



function drawEverything() {
  //Drawing black background to avoid visual glitches
  colorRect(0, 0, canvas.width, canvas.height, "#000000FF");

  drawRoom();
  p1.draw();
  drawDialog();
  drawAnimatedInventory();

  /*if(dialogActiveConvo) {
    debugText = dialogCurrentText;
  } else {
    debugText = 'Debug Text';
  }*/
  document.querySelector('#debugText').innerHTML = debugText;
}