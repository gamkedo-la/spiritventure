// --> TILEMAP EDITOR
// Press TAB to toggle the Tilemap Editor (indicated by debug text and hovered purple tile)
// Hover over any tile and press any tile NUMBER to edit/change the tile type
// OR you can also use mouse WHEEL for changing tile type
// Press BACKSPACE to save/download the edited tilemap and paste it here overriding the current rooms[roomIndex][GRID] array
// Player is NOT added so, you have to add the player tile yourself (add 2 in any array index)

const tilemapEditor = false;
var editorTileIndex = -1;
var playerDrawOffsetY = -10;
var roomIndex = 0;
var bobPhase = 0;

const TILE_W = 50;
const TILE_H = 50;

const TILE_GROUND = 0;
const TILE_GROUND2 = 1;
const TILE_MARBLE_BLUE = 2;
const TILE_MARBLE_PINK = 3;
const TILE_GROUND3 = 4;

const TILE_WALL = 5;
const TILE_WALL2 = 6;
const TILE_GOAL = 7;
const TILE_VINES_1 = 8;
const TILE_VINES_2 = 9;
const TILE_CLOCKS_1 = 10;
const TILE_ANGER_1 = 11;
const TILE_ANGER_2 = 12;
const TILE_HAPPY_1 = 13;

const TILE_KEY = 14;
const TILE_DOOR = 15;

const TILE_VASE = 16;
const TILE_ROSE = 17;

const TILE_MIND = 18;
const TILE_DESPOND = 19;
const TILE_SATAH = 20;
const TILE_TRIPA = 21;
const TILE_GEMINI_END = 22
const TILE_ANGER_3 = 23;
const TILE_ANGER_4 = 24;
const TILE_FEAR = 25; 
const TILE_SAD = 26;

const TOTAL_TILES = 27;

function roomTileToIndex(tileCol, tileRow) {
  return (tileCol + rooms[roomIndex][COLS]*tileRow);
}

function tilemapEditorWheel(e) {
  console.log(editorTileIndex);
  if(tilemapEditor && editorTileIndex >= 0) {
    rooms[roomIndex][GRID][editorTileIndex] += e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
    if(rooms[roomIndex][GRID][editorTileIndex] < 0) rooms[roomIndex][GRID][editorTileIndex] = TOTAL_TILES - 1
    else if(rooms[roomIndex][GRID][editorTileIndex] >= TOTAL_TILES) rooms[roomIndex][GRID][editorTileIndex] = 0
  }
}

function tilemapEditorKeyInput(key) {
  if(tilemapEditor) {
    if(editorTileIndex >= 0) {
      var no = keyToNumber(key);
      if(no > -1 && no < TOTAL_TILES) rooms[roomIndex][GRID][editorTileIndex] = no;
    }
    if(key == KEY_BACKSPACE) {
      save(rooms[roomIndex]);
    }
  }
}

function getTileIndexAtPixelCoord(pixelX, pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the tile coords fall within valid bounds
  if(tileCol < 0 || tileCol >= rooms[roomIndex][COLS] ||
     tileRow < 0 || tileRow >= rooms[roomIndex][ROWS]) {
     
     return undefined;
  }
  
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}
const ROOMSIDE_UP =1; 
const ROOMSIDE_DOWN =2;
const ROOMSIDE_LEFT =3;
const ROOMSIDE_RIGHT =4;

function getTileOutOfBoundsSide(pixelX, pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );
  if(tileRow < 0) return ROOMSIDE_UP;
  if(tileRow >= rooms[roomIndex][COLS] - 4) return ROOMSIDE_DOWN;
  if(tileCol < 0) return ROOMSIDE_LEFT;
  if(tileCol >= rooms[roomIndex][ROWS] - 4) return ROOMSIDE_RIGHT;
  return -1;
}

function getPixelCoordAtTileIndex(index) {
  var x = index % rooms[roomIndex][COLS];
  var y = index / rooms[roomIndex][ROWS];
  return [ x = x * TILE_W, y = y * TILE_H ];
}

function tileTypeHasTransparency(checkTileType) {
  return (checkTileType == TILE_GOAL ||
          checkTileType == TILE_KEY ||
          checkTileType == TILE_DOOR ||
          checkTileType == TILE_MIND ||
          checkTileType == TILE_DESPOND ||
          checkTileType == TILE_SATAH ||
          checkTileType == TILE_TRIPA ||
          checkTileType == TILE_VASE
          );
}

function tileTypeVerticalBob(checkTileType) {
  return (
          checkTileType == TILE_KEY ||
          checkTileType == TILE_TRIPA ||
          checkTileType == TILE_SATAH ||
          checkTileType == TILE_MIND ||
          checkTileType == TILE_DESPOND
          );
}

function drawRoom() {
  var tileIndex = 0;
  var tileLeftEdgeX = camX;
  var tileTopEdgeY = camY;
  var playerDrawnYet = false;
  editorTileIndex = -1;
  bobPhase+=0.1;

  //ground only, skipping tall objects
  for(var eachRow=0; eachRow<rooms[roomIndex][ROWS]; eachRow++) { // deal with one row at a time
    
    tileLeftEdgeX = camX; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<rooms[roomIndex][COLS]; eachCol++) { // left to right in each row
      var verticalBob = 0; 
      var tileTypeHere = rooms[roomIndex][GRID][ tileIndex ]; // getting the tile code for this index
      verticalBob = 0; 
      if( tileTypeHasTransparency(tileTypeHere) ) {
        canvasContext.drawImage(tilePics[TILE_GROUND2], tileLeftEdgeX, tileTopEdgeY);
        if( tileTypeVerticalBob(tileTypeHere) ){
          verticalBob = Math.sin(bobPhase+eachCol*0.3+eachRow*0.7)*2;
        }
      }
      var extraHeight = tilePics[tileTypeHere].height-TILE_H;
      if(extraHeight<=0){ //doing tall stuff on seperate pass
        canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY - extraHeight-verticalBob);

      }
      tileIndex++; // increment which index we're going to next check for in the room
      tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    tileTopEdgeY += TILE_H; // jump horizontal draw position down by one full tile height

  } // end of for eachRow  
  tileIndex = 0;
  tileLeftEdgeX = camX;
  tileTopEdgeY = camY;
  playerDrawnYet = false;  
  // tall objects only
  for(var eachRow=0; eachRow<rooms[roomIndex][ROWS]; eachRow++) { // deal with one row at a time
    
    tileLeftEdgeX = camX; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<rooms[roomIndex][COLS]; eachCol++) { // left to right in each row

      var tileTypeHere = rooms[roomIndex][GRID][ tileIndex ]; // getting the tile code for this index
      var extraHeight = tilePics[tileTypeHere].height-TILE_H;
      if(extraHeight>0){
        canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY - extraHeight);
      }
      if(tilemapEditor && mouseX >= tileLeftEdgeX && mouseX < tileLeftEdgeX + TILE_W
        && mouseY >= tileTopEdgeY && mouseY < tileTopEdgeY + TILE_H) {
        canvasContext.fillStyle = "#FF00FF88";
        canvasContext.fillRect(tileLeftEdgeX, tileTopEdgeY, TILE_W, TILE_H);
        editorTileIndex = tileIndex;
      }
      
      tileIndex++; // increment which index we're going to next check for in the room
      tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    tileTopEdgeY += TILE_H; // jump horizontal draw position down by one full tile height
    if (playerDrawnYet==false && p1.y+camY<tileTopEdgeY-playerDrawOffsetY){
      p1.draw();
      playerDrawnYet = true;
    }
  } // end of for eachRow    
} // end of drawRoom()

function Particle(x, y, xVel, yVel, size, color, life) {
  this.x = x;
  this.y = y;
  this.xVel = xVel;
  this.yVel = yVel;
  this.size = size;
  this.color = color;
  this.life = life;
  this.ang = Math.PI*2.0*Math.random();
  this.angVel = (Math.random() - 0.5)* 0.01;
}
Particle.prototype.draw = function() {
  /*canvasContext.beginPath();
  canvasContext.arc(this.x +camX, this.y+camY, this.size, 0, Math.PI * 2, false);
  canvasContext.fillStyle = this.color;
  canvasContext.fill();*/
  var fade=1.0;
  if(this.life <20){
    fade = this.life/20;
  }
  canvasContext.globalAlpha = fade;
  drawBitmapCenteredAtLocationWithRotation(groundPartAnim, this.x + camX, this.y + camY, this.ang);
  canvasContext.globalAlpha = 1.0;
}
Particle.prototype.update = function() {
  this.life = this.life - 1;
  if(this.life > 0) {
    this.x += this.xVel;
    this.y += this.yVel;
    this.ang += this.angVel;
    this.size += 0.02;
    this.draw();
  } else {

  }
}
//var particleArray = [];
function makeParticles() {
  particleArray = [];
  for(let i=0; i<50; i++) {
    let size = 0.1;
    let life = 10 + Math.random() * 0.1;
    let x = p1.x + (Math.random() * 8) - 4;
    let y = p1.y + (Math.random() * 8) - 4;
    let xVel = (Math.random() * 0.6) - 0.3;
    let yVel = (Math.random() * 0.6) - 0.3;
    let color = "rgba(255, 0, 0, 1)";
    particleArray.push(new Particle(x, y, xVel, yVel, size, color, life));
  }
}
function animateParticles() {
  for (let i=0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}
function NPCparticles() {
  makeParticles();
  particleNPCrun = true;
}