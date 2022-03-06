const INVENTORY_ANIM_FRAME_WAIT = 15;
const INVENTORY_ITEM_W = 50;
const INVENTORY_ITEM_H = 50;

var showingInventory = false;
var inventoryAnimFrame = 0; //use for all inventory animations
var inventoryAnimFrameDelay = INVENTORY_ANIM_FRAME_WAIT;

var inventoryMargin = 50;

const allPossibleItems = [
    {
        "name": "Door Key",
        "frames": 1,
        "visible": true,
        "quantity": 1,
        "animation": keyAnim,
        "selected": false,
        "x": 40,
        "y": 65,
        "flavor": "Maybe this can be used with a door around here?"
    },
    {
        "name": "Teardrop",
        "frames": 3,
        "visible": true,
        "quantity": 1,
        "animation": teardropAnim,
        "selected": false,
        "x": 40,
        "y": 65,
        "flavor": "Some flavor text can go here later"
    },
    {
        "name": "Boxing Glove",
        "frames": 1,
        "visible": true,
        "quantity": 1,
        "animation": boxingGlove,
        "selected": false,
        "x": 180,
        "y": 65,
        "flavor": "Some flavor text can go here later"
    }
]

function drawAnimatedInventory(){
    if(showingInventory == false){
        return;
    }
    inventoryAnimFrameDelay--;
    if(inventoryAnimFrameDelay<0){
        inventoryAnimFrameDelay = INVENTORY_ANIM_FRAME_WAIT;
        inventoryAnimFrame++;
    }

    //background
    canvasContext.globalAlpha = 0.8; //how solid is the background
    fillRoundedRectangle(
        canvasContext,
        inventoryMargin,
        inventoryMargin,
        canvas.width-inventoryMargin*2, 
        canvas.height-inventoryMargin*2, 
        "#dbc8af",
        10
    )
    canvasContext.globalAlpha = 1.0;

    //menu heading
    let headerHeight = 50;
    let headerWidth = 200;
    fillRoundedRectangle(
        canvasContext,
        (canvas.width - inventoryMargin*2)/2 - headerWidth/2, //x, TODO: Center properly over the menu
        inventoryMargin - headerHeight/2, //y
        headerWidth,
        headerHeight,
        "#424554",
        5
    )
    canvasContext.fillStyle = '#ffffff';
    canvasContext.fillText(
        "INVENTORY", 
        (canvas.width - inventoryMargin*2)/2 - headerWidth/2 + 20, //x 
        inventoryMargin + 10 // y
    )

    //grid
    let rows = 3;
    let columns = 4;
    let inventoryStartX = 120;
    let inventoryStartY = 135;

    drawGrid(inventoryStartX, inventoryStartY, 
        40,//radius 
        6, //strokeWidth 
        20,//padding 
        rows, columns, p1.inventory);

    drawInfoPanel(500, 60, p1.inventory[0])
}

function drawInventoryItemIcon(animation, frames, destX, destY){
    canvasContext.drawImage(animation,
        (inventoryAnimFrame % frames) * INVENTORY_ITEM_W, 0, // source corner x, y
        INVENTORY_ITEM_W, INVENTORY_ITEM_H, //source width and height
        destX + inventoryMargin, destY + inventoryMargin, //dest corner x, y
        INVENTORY_ITEM_W, INVENTORY_ITEM_H); //dest width and height
}

function drawInventoryItemLabel(text, x, y, fillStyle, oldFillStyle){
    canvasContext.fillStyle = fillStyle;
    canvasContext.fillText(text, x+inventoryMargin, y+25+inventoryMargin+INVENTORY_ITEM_H);
    canvasContext.fillStyle = oldFillStyle;
}
    
function drawGrid(startX, startY, radius, strokeWidth, padding, rows, cols, inventoryItems){
    let index = 0;
    if (inventoryItems.length > 0) {
        inventoryItems[0].selected = true;
    };

    for (let i=0; i < rows; i++){
        for (let j=0; j < cols; j++){
            index =  j + (i*cols);
            x = startX + j*(padding + 2*radius);
            y = startY + i*(padding + 2*radius);

            if(inventoryItems.length > index){
                if(inventoryItems[index].selected){
                    outlineCircle(canvasContext, x, y, radius, '#ffffff', strokeWidth);
                }
                colorCircle(x, y, radius, 'rgba(0,0,0,0.8)');
                drawInventoryItemIcon(inventoryItems[index].animation, inventoryItems[index].frames, x-75, y-75);
                
                // quantity counter
                let inventoryCoord = ((radius**2)/2)**0.5;
                colorCircle(x+inventoryCoord, y+inventoryCoord, radius/3, 'rgba(225,225,225,1)');
                canvasContext.fillStyle = 'black';
                canvasContext.fillText(inventoryItems[index].quantity, x+inventoryCoord, y+inventoryCoord);
            } else {
                colorCircle(x, y, radius, 'rgba(0,0,0,0.1)');
            }
        }
    }
}

function drawInfoPanel(startX, startY, invItem){
    let width = 240;
    let padding = 10;
    fillRoundedRectangle(canvasContext, startX, startY, 240, 330, 'rgba(0,0,0,0.8)', 5)
    canvasContext.fillStyle = '#f7f6f2';
    canvasContext.fillText(invItem.name, startX+10, startY+30, width-2*padding);
    
    // handle wrapping text into the info panel box later
    canvasContext.fillText(invItem.flavor, startX+10, startY+60, width-2*padding);
}