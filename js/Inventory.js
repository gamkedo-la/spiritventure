const INVENTORY_ANIM_FRAME_WAIT = 15;
const INVENTORY_ITEM_W = 50;
const INVENTORY_ITEM_H = 50;

var showingInventory = false;
var inventoryAnimFrame = 0; //use for all inventory animations
var inventoryAnimFrameDelay = INVENTORY_ANIM_FRAME_WAIT;

var inventoryMargin = 50;

function drawAnimatedInventory(){
    // TODO: Make inventory items an external variable that can get manipulated by other code to handle events where new items get added to inventory
    var inventoryItems = [
        {
            "name": "Teardrop",
            "frames": 3,
            "visible": true,
            "animation": teardropAnim,
            "x": 40,
            "y": 65,
            "flavor": "Some flavor text can go here later"
        },
        {
            "name": "Boxing Glove",
            "frames": 1,
            "visible": true,
            "animation": boxingGlove,
            "x": 180,
            "y": 65,
            "flavor": "Some flavor text can go here later"
        }
    ]

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
    let inventoryStartX = 100;
    let inventoryStartY = 100;

    drawGrid(inventoryStartX, inventoryStartY, 30, 
        0, //strokeWidth 
        10, rows, columns, inventoryItems);

    //items 
    // for(let i = 0; i < inventoryItems.length; i++){
    //     drawInventoryItemIcon(inventoryItems[i].animation, inventoryItems[i].frames, inventoryItems[i].x, inventoryItems[i].y);
    //     drawInventoryItemLabel(inventoryItems[i].name, inventoryItems[i].x, inventoryItems[i].y, "#424554", canvasContext.fillStyle);
    // }
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
    for (let i=0; i < rows; i++){
        for (let j=0; j < cols; j++){
            if( i > 0 ){
                index = j + i
            } else {
                index = j
            }
            index =  i*j + j;
            console.log(index);
            x = startX + j*(padding + 2*radius);
            y = startY + i*(padding + 2*radius);
            // colorCircle(x, y, radius, 'grey');
            // outlineCircle(canvasContext, x, y, radius, 'black', strokeWidth);

            if(inventoryItems.length > index){
                colorCircle(x, y, radius, 'grey');
                drawInventoryItemIcon(inventoryItems[index].animation, inventoryItems[index].frames, x-100, y-100);
            }
        }
    }
}
