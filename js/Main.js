// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var camX = 0
var camY = 0
var p1 = new warriorClass();

var deltaTime = 0;
var debugText;
var gameFont = 'Georgia, Arial, sans-serif';

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