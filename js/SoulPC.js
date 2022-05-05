// tuning constants
const PLAYER_MOVE_SPEED = 6.0;
const PLAYER_SPRINT_MULTIPLIER = 1.8;

const ITEM_TEARDROP = 0; //should match order of inventory in player initialisation
const ITEM_BOXING = 1; 
const ITEM_PAGE = 2;

var dialogDoneFlag = false; 

function Soul() {
  // variables to keep track of position
  this.x = 75;
  this.y = 75;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;
  this.keyHeld_Sprint = false;

  this.moveToPos = { x: null, y: null };

  // key controls used for this
  this.setupControls = function (northKey, eastKey, southKey, westKey, sprintKey) {
    this.controlKeyForNorth = northKey;
    this.controlKeyForEast = eastKey;
    this.controlKeyForSouth = southKey;
    this.controlKeyForWest = westKey;
    this.controlKeyForSprint = sprintKey;
  }

  this.setupAltControls = function (northKey, eastKey, southKey, westKey) {
    this.controlAltKeyForNorth = northKey;
    this.controlAltKeyForEast = eastKey;
    this.controlAltKeyForSouth = southKey;
    this.controlAltKeyForWest = westKey;
  }

  this.init = function (whichGraphic, whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    // to track inventory
    this.inventory = [ //order should match item const above such as ITEM_TEARDROP
      {
        "name": "Teardrop",
        "frames": 3,
        "visible": true,
        "quantity": 0,
        "animation": teardropAnim,
        "selected": false,
        "flavor": "A single tear falling to earth."
      },
      {
        "name": "Boxing Glove",
        "frames": 1,
        "visible": true,
        "quantity": 0,
        "animation": boxingGlove,
        "selected": false,
        "flavor": "Protect the fragile hand."
      },
      {
        "name": "Page",
        "frames": 1,
        "visible": true,
        "quantity": 0,
        "animation": pageFromABook,
        "selected": false,
        "flavor": "Scribble Scribble."
      }
    ];
    this.reset();
  }
  this.addInventoryItem = function (inventoryItem) {
    // check if item has been aquired
    if (this.inventory[inventoryItem].quantity == 0) {
      this.inventory[inventoryItem].quantity = 1;

      // toggle text on (see Main.js)
      addedItem = inventoryItem;
      toDrawOrNotToDraw = inventoryTooltipTimer; // roughly 5 seconds
    }
  }

  this.reset = function () {
    // this.inventory = [];
    this.keysHeld = 0;
    rooms[roomIndex][COLS] = startingRoom[0];
    rooms[roomIndex][ROWS] = startingRoom[1];
    rooms[roomIndex][GRID] = startingRoom[2];
    this.homeX = TILE_W * 8.5;
    this.homeY = TILE_H * 8.5;
    this.x = this.homeX;
    this.y = this.homeY;
  }

  this.move = function () {
    var nextX = this.x;
    var nextY = this.y;

    if (this.keyHeld_North) {
      nextY -= PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);
      this.moveToPos.x = null;
      this.moveToPos.y = null;
    }
    if (this.keyHeld_East) {
      nextX += PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);
      this.moveToPos.x = null;
      this.moveToPos.y = null;
    }
    if (this.keyHeld_South) {
      nextY += PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);
      this.moveToPos.x = null;
      this.moveToPos.y = null;
    }
    if (this.keyHeld_West) {
      nextX -= PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);
      this.moveToPos.x = null;
      this.moveToPos.y = null;
    }

    if (this.moveToPos.x) {
      if (this.moveToPos.x - this.x > 5) {
        nextX += PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);
      } else if (this.x - this.moveToPos.x > 5) {
        nextX -= PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);
      } else {
        this.moveToPos.x = null;
      }
    }

    if (this.moveToPos.y) {
      if (this.moveToPos.y - this.y > 5) {
        nextY += PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);
      } else if (this.y - this.moveToPos.y > 5) {
        nextY -= PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);
      } else {
        this.moveToPos.y = null;
      }
    }

    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    var walkIntoTileType = TILE_WALL;

    //No clip (can move through walls) when tilemap editor is ON!
    if (tilemapEditor) {
      this.x = nextX;
      this.y = nextY;
      return;
    }

    if (walkIntoTileIndex != undefined) {
      walkIntoTileType = rooms[roomIndex][GRID][walkIntoTileIndex];
    } else {
      var side = getTileOutOfBoundsSide(nextX, nextY);
      console.log(side);
      if (side > -1) {
        console.log("changing rooms!");
        playSound(Sound.DoorOpenDra);
        console.log(roomIndex, GRID, side, rooms[roomIndex][GRID + side] );
        roomIndex = rooms[roomIndex][GRID + side];
        dialogDoneFlag = false; 
        startBGM(roomsSongs[roomIndex]);
        switch (side) {
          case ROOMSIDE_UP:
            this.y = (rooms[roomIndex][ROWS] * TILE_H) - 64;
            camY = -canvas.height * 1.5;
            break;
          case ROOMSIDE_DOWN:
            this.y = 64;
            camY = canvas.height * 1.5;
            break;
          case ROOMSIDE_LEFT:
            this.x = (rooms[roomIndex][COLS] * TILE_W) - 64;
            camX = -canvas.width * 1.5;
            break;
          case ROOMSIDE_RIGHT:
            this.x = 64;
            camX = canvas.width * 1.5;
            break;
        }
        return;
      }
    }

    switch (walkIntoTileType) {
      case TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_GROUND2:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_GROUND3:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_MARBLE_BLUE:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_MARBLE_PINK:
        this.x = nextX;
        this.y = nextY;
        break;

      case TILE_GOAL:
        break;
      case TILE_DOOR:
        if (this.keysHeld > 0) {
          this.keysHeld--; // one less key
          

          rooms[roomIndex][GRID][walkIntoTileIndex] = TILE_GROUND; // remove door
          //TODO: decrement keys in inventory
          let keyIndex = this.inventory.map(object => object.name).indexOf('Door Key');
          this.inventory[keyIndex].quantity -= 1;
        }
        break;
      case TILE_KEY:
        let keyObj = {
          "name": "Door Key",
          "frames": 1,
          "visible": true,
          "quantity": 1,
          "animation": keyAnim,
          "selected": false,
          "x": 40,
          "y": 65,
          "flavor": "Maybe this can be used with a door around here?"
        }

        let keyIndex = this.inventory.map(object => object.name).indexOf('Door Key');

        if (keyIndex >= 0) {
          this.inventory[keyIndex].quantity += 1
        } else {
          this.inventory.push(keyObj)
        }

        this.keysHeld++; // gain key
        console.log("picked up a key!");
        playSound(Sound.PickupKey);

       

        rooms[roomIndex][GRID][walkIntoTileIndex] = TILE_GROUND; // remove key
        break;
      case TILE_MIND:
        console.log("MIND encountered");
        if (dialogDoneFlag == false){
          NPCparticles();
          var pos = getPixelCoordAtTileIndex(walkIntoTileIndex);
          wrapText = [testConvo2[0].text];
          lineWrap();
          setupDialog(Gemini1, pos[0] - (dialogW / 2) + (TILE_W / 2), pos[1] - (dialogHOffset + (dialogHPerLine * wrapText.length)) - (TILE_H * 2.4));
          sfx('dialog_start.wav');
        }
        break;
      case TILE_DESPOND:
        if (dialogDoneFlag == false){
          var pos = getPixelCoordAtTileIndex(walkIntoTileIndex);
          wrapText = [testConvo2[0].text];
          lineWrap();
          setupDialog(Despond, pos[0] - (dialogW / 2) + (TILE_W / 2), pos[1] - (dialogHOffset + (dialogHPerLine * wrapText.length)) - (TILE_H * 2.4));
          sfx('dialog_start.wav');
        }
        break;
      case TILE_SATAH:
        if (dialogDoneFlag  == false){
          var pos = getPixelCoordAtTileIndex(walkIntoTileIndex);
          wrapText = [testConvo2[0].text];
          lineWrap();
          setupDialog(Satah, pos[0] - (dialogW / 2) + (TILE_W / 2), pos[1] - (dialogHOffset + (dialogHPerLine * wrapText.length)) - (TILE_H * 2.4));
          sfx('dialog_start.wav');
        }
          break;
      case TILE_TRIPA:
          if (dialogDoneFlag == false){
            var pos = getPixelCoordAtTileIndex(walkIntoTileIndex);
            wrapText = [testConvo2[0].text];
            lineWrap();
            setupDialog(Tripa, pos[0] - (dialogW / 2) + (TILE_W / 2), pos[1] - (dialogHOffset + (dialogHPerLine * wrapText.length)) - (TILE_H * 2.4));
            sfx('dialog_start.wav');
          }
          break;
      case TILE_GEMINI_END:
          console.log("end encountered");
          if (dialogDoneFlag == false){
            NPCparticles();
            var pos = getPixelCoordAtTileIndex(walkIntoTileIndex);
            wrapText = [testConvo2[0].text];
            lineWrap();
            setupDialog(Gemini_end, pos[0] - (dialogW / 2) + (TILE_W / 2), pos[1] - (dialogHOffset + (dialogHPerLine * wrapText.length)) - (TILE_H * 2.4));
            sfx('dialog_start.wav');
          }
          break;
      case TILE_WALL:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
  }

  this.draw = function () {
    var horizonBob = Math.sin(bobPhase*0.10)*10;
    var verticalBob = Math.sin(bobPhase)*10;
    drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x + horizonBob + camX, this.y + verticalBob + camY, 0.0);
    
  }

} // end of class