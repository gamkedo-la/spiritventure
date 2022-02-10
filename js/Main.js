// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var camX = 0
var camY = 0
var p1 = new warriorClass();
var music = new Audio ("Lurking Sadness.mp3"); //"play.mp3");
music.loop = true;
var backgroundMusic = new BackgroundMusicClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  loadImages();
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  
  p1.init(playerPic, "Blue");
  initInput();  

  music.play();
  backgroundMusic.loopSong("../sound/Lurking Sadness") //"../sound/play");
}

function moveEverything() {
  p1.move();

  //Camera Lerping
  camX = lerp(camX, canvas.width/2 - p1.x, 0.1);
  camY = lerp(camY, canvas.height/2 - p1.y, 0.1);
}

function drawEverything() {
  canvasContext.fillStyle = "#000000FF";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  drawRoom();
  
  p1.draw();
}