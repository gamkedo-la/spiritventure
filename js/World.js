// world, room, and tile constants, variables
const ROOM_COLS = 16;
const ROOM_ROWS = 12;

// --> TILEMAP EDITOR
// Press TAB to toggle the Tilemap Editor (indicated by debug text and hovered purple tile)
// Hover over any tile and press any tile NUMBER to edit/change the tile type
// OR you can also use mouse WHEEL for changing tile type
// Press BACKSPACE to save/download the edited tilemap and paste it here overriding the current roomGrid array
// Player is NOT added so, you have to add the player tile yourself (add 2 in any array index)

var tilemapEditor = false;
var editorTileIndex = -1;

var roomGrid =
/*[ 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 4, 0, 4, 0, 4, 0, 6, 0, 0, 0, 0, 0, 0, 1,
  5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1];*/

  /* new level created via built-in tilemap editor*/
  [1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,4,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,4,0,4,0,0,6,0,0,5,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,5,1,1,1,1,1,1,0,0,2,0,1,1,0,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,0,3,0,0,1,1,1,1,1,1,0,0,0,4,1,1,0,0,0,0,5,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1];

const TILE_W = 50;
const TILE_H = 50;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;
const TILE_MIND = 6;

const TOTAL_TILES = 7;

function roomTileToIndex(tileCol, tileRow) {
  return (tileCol + ROOM_COLS*tileRow);
}

function tilemapEditorWheel(e) {
  if(tilemapEditor && editorTileIndex >= 0) {
    roomGrid[editorTileIndex] += e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
    if(roomGrid[editorTileIndex] < 0) roomGrid[editorTileIndex] = TOTAL_TILES - 1
    else if(roomGrid[editorTileIndex] >= TOTAL_TILES) roomGrid[editorTileIndex] = 0
    else if(roomGrid[editorTileIndex] == TILE_PLAYER) roomGrid[editorTileIndex] += e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
  }
}

function tilemapEditorKeyInput(key) {
  if(tilemapEditor) {
    if(editorTileIndex >= 0) {
      var no = keyToNumber(key);
      if(no > -1 && no != TILE_PLAYER && no < TOTAL_TILES) roomGrid[editorTileIndex] = no;
    }
    if(key == KEY_BACKSPACE) {
      save(roomGrid);
    }
  }
}

function getTileIndexAtPixelCoord(pixelX,pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the tile coords fall within valid bounds
  if(tileCol < 0 || tileCol >= ROOM_COLS ||
     tileRow < 0 || tileRow >= ROOM_ROWS) {
     document.getElementById("debugText").innerHTML = "out of bounds:"+pixelX+","+pixelY;
     return undefined;
  }
  
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}

function getPixelCoordAtTileIndex(index) {
  var x = index % ROOM_COLS;
  var y = index / ROOM_ROWS;
  return [ x = x * TILE_W, y = y * TILE_H ];
}

function tileTypeHasTransparency(checkTileType) {
  return (checkTileType == TILE_GOAL ||
          checkTileType == TILE_KEY ||
          checkTileType == TILE_DOOR ||
          checkTileType == TILE_MIND
          );
}

function drawRoom() {
  var tileIndex = 0;
  var tileLeftEdgeX = camX;
  var tileTopEdgeY = camY;

  editorTileIndex = -1;

  for(var eachRow=0; eachRow<ROOM_ROWS; eachRow++) { // deal with one row at a time
    
    tileLeftEdgeX = camX; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) { // left to right in each row

      var tileTypeHere = roomGrid[ tileIndex ]; // getting the tile code for this index
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