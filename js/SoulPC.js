// tuning constants
const PLAYER_MOVE_SPEED = 6.0;
const PLAYER_SPRINT_MULTIPLIER = 1.8;

function warriorClass() {
  // variables to keep track of position
  this.x = 75;
  this.y = 75;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;
  this.keyHeld_Sprint = false;


  // key controls used for this
  this.setupControls = function(northKey,eastKey,southKey,westKey,sprintKey) {
    this.controlKeyForNorth = northKey;
    this.controlKeyForEast = eastKey;
    this.controlKeyForSouth = southKey;
    this.controlKeyForWest = westKey;
    this.controlKeyForSprint = sprintKey;
  }

  this.setupAltControls = function(northKey,eastKey,southKey,westKey) {
    this.controlAltKeyForNorth = northKey;
    this.controlAltKeyForEast = eastKey;
    this.controlAltKeyForSouth = southKey;
    this.controlAltKeyForWest = westKey;
  }

  this.init = function(whichGraphic,whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    // to track inventory
    this.inventory = [
      {
          "name": "Teardrop",
          "frames": 3,
          "visible": true,
          "quantity": 1,
          "animation": teardropAnim,
          "selected": false,
          "flavor": "Some flavor text can go here later"
      },
      {
          "name": "Boxing Glove",
          "frames": 1,
          "visible": true,
          "quantity": 1,
          "animation": boxingGlove,
          "selected": false,
          "flavor": "Some flavor text can go here later"
      }
    ];
    this.reset();
  }
  
  this.reset = function() {
    // this.inventory = [];
    this.keysHeld = 0;
    rooms[roomIndex][COLS] = startingRoom[0];
    rooms[roomIndex][ROWS] = startingRoom[1];
    rooms[roomIndex][GRID] = startingRoom[2];
    this.homeX = TILE_W * 7.5;
    this.homeY = TILE_H * 8.5;
    this.x = this.homeX;
    this.y = this.homeY;
  }
  
  this.move = function() {
    var nextX = this.x;
    var nextY = this.y;

    if(this.keyHeld_North) {
      nextY -= PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);
    }
    if(this.keyHeld_East) {
      nextX += PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);;
    }
    if(this.keyHeld_South) {
      nextY += PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);;
    }
    if(this.keyHeld_West) {
      nextX -= PLAYER_MOVE_SPEED * (this.keyHeld_Sprint ? PLAYER_SPRINT_MULTIPLIER : 1.0);;
    }
        
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var walkIntoTileType = TILE_WALL;

    //No clip (can move through walls) when tilemap editor is ON!
    if(tilemapEditor) {
      this.x = nextX;
      this.y = nextY;
      return;
    }

    if( walkIntoTileIndex != undefined) {
      walkIntoTileType = rooms[roomIndex][GRID][walkIntoTileIndex];
    } else {
      var side = getTileOutOfBoundsSide(nextX,nextY);
      console.log(side);
      if(side > -1) {
        console.log("changing rooms!");
        if (doorSFX) doorSFX.play();
        roomIndex = rooms[roomIndex][GRID+side];
        switch(side) {
          case 1:
            this.y = (rooms[roomIndex][ROWS] * TILE_H) - 64;
            camY = -canvas.height*1.5;
            break;
          case 2:
            this.y = 64;
            camY = canvas.height*1.5;
            break;
          case 3:
            this.x = (rooms[roomIndex][COLS] * TILE_W) - 64;
            camX = -canvas.width*1.5;
            break;
          case 4:
            this.x = 64;
            camX = canvas.width*1.5;
            break;
        }
        return;
      }
    }
    
    switch( walkIntoTileType ) {
      case TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_GOAL:
        document.getElementById("debugText").innerHTML = this.myName + " won";
        this.reset();
        break;
      case TILE_DOOR:
        if(this.keysHeld > 0) {
          this.keysHeld--; // one less key
          document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;

          rooms[roomIndex][GRID][walkIntoTileIndex] = TILE_GROUND; // remove door
          //TODO: decrement keys in inventory
        }
        break;
      case TILE_KEY:
        let keyObj ={
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

        if (keyIndex >= 0){
          this.inventory[keyIndex].quantity += 1
        } else {
          this.inventory.push(keyObj)
        }

        this.keysHeld++; // gain key
        console.log("picked up a key!");
        if (keySFX) keySFX.play();

        document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;

        rooms[roomIndex][GRID][walkIntoTileIndex] = TILE_GROUND; // remove key
        break;
      case TILE_MIND:
        var pos = getPixelCoordAtTileIndex(walkIntoTileIndex);
        wrapText = [testConvo[0].text];
        lineWrap();
        setupDialog(testConvo, pos[0] - (dialogW/2) + (TILE_W/2), pos[1] - (dialogHOffset + (dialogHPerLine * wrapText.length)) - (TILE_H*2.4));
        break;
      case TILE_DESPOND:
        // TODO: Initiate different dialog
        var pos = getPixelCoordAtTileIndex(walkIntoTileIndex);
        wrapText = [testConvo2[0].text];
        lineWrap();
        setupDialog(testConvo2, pos[0] - (dialogW/2) + (TILE_W/2), pos[1] - (dialogHOffset + (dialogHPerLine * wrapText.length)) - (TILE_H*2.4));
        break;
      case TILE_WALL:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
  }
  
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x + camX, this.y + camY, 0.0 );
  }

} // end of class