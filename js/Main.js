// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();
var music = new Audio ("play.wav");
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
  backgroundMusic.loopSong("../sound/play");
}

function moveEverything() {
  p1.move();
}

function drawEverything() {
  drawRoom();
  
  p1.draw();
}