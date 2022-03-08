// --> TILEMAP EDITOR
// Press TAB to toggle the Tilemap Editor (indicated by debug text and hovered purple tile)
// Hover over any tile and press any tile NUMBER to edit/change the tile type
// OR you can also use mouse WHEEL for changing tile type
// Press BACKSPACE to save/download the edited tilemap and paste it here overriding the current rooms[roomIndex][GRID] array
// Player is NOT added so, you have to add the player tile yourself (add 2 in any array index)

var tilemapEditor = false;
var editorTileIndex = -1;

var roomIndex = 0;

const TILE_W = 50;
const TILE_H = 50;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_WALL2 = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;
const TILE_MIND = 6;
const TILE_VASE = 7;
const TILE_GROUND2 = 8;
const TILE_GROUND3 = 9;
const TILE_ROSE = 10;
const TILE_DESPOND = 11;
const TILE_MARBLE_BLUE = 12;
const TILE_MARBLE_PINK = 13;

const TOTAL_TILES = 14;

function roomTileToIndex(tileCol, tileRow) {
  return (tileCol + rooms[roomIndex][COLS]*tileRow);
}

function tilemapEditorWheel(e) {
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
     document.getElementById("debugText").innerHTML = "out of bounds:"+pixelX+","+pixelY;
     return undefined;
  }
  
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}

//Up = 0, Down = 1, Left = 2, Right = 3
function getTileOutOfBoundsSide(pixelX, pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );
  if(tileRow < 0) return 1;
  if(tileRow >= rooms[roomIndex][COLS] - 4) return 2;
  if(tileCol < 0) return 3;
  if(tileCol >= rooms[roomIndex][ROWS] - 4) return 4;
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
          checkTileType == TILE_VASE
          );
}

function drawRoom() {
  var tileIndex = 0;
  var tileLeftEdgeX = camX;
  var tileTopEdgeY = camY;

  editorTileIndex = -1;

  for(var eachRow=0; eachRow<rooms[roomIndex][ROWS]; eachRow++) { // deal with one row at a time
    
    tileLeftEdgeX = camX; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<rooms[roomIndex][COLS]; eachCol++) { // left to right in each row

      var tileTypeHere = rooms[roomIndex][GRID][ tileIndex ]; // getting the tile code for this index
      if( tileTypeHasTransparency(tileTypeHere) ) {
        canvasContext.drawImage(tilePics[TILE_GROUND], tileLeftEdgeX, tileTopEdgeY);
      }
      canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);

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
    
  } // end of for eachRow    
} // end of drawRoom()