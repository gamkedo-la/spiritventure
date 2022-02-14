var dialogConvoStep = 0;

var dialogActiveConvo = null;
var dialogX = 0;
var dialogY = 0;
var dialogW = 300;
var dialogH = 100;
var dialogPanelColor1 = "#CD853F";
var dialogPanelColor2 = "#FFF8DCDD";
var dialogOutlineColor = "#000000FF";
var dialogTextColor = "#000000FF";
var dialogFontSize = 24;
var dialogTextOffset = 4;
var dialogTextCharDelay = 16;
var dialogLerpSpeed = 0.2;
var dialogChoiceOffsetX = 240;
var dialogChoiceOffsetY = 120;
var dialogChoiceWidth = 160;
var dialogChoiceHeight = dialogFontSize + (dialogTextOffset*2);

var dialogCurrentX = 0;
var dialogCurrentY = 0;
var dialogCurrentW = 0;
var dialogCurrentH = 0;
var dialogCurrentText = "";
var dialogCurrentTextIndex = 0;
var dialogTextCharTimer = 0;

function advanceDialog() {
    if(dialogActiveConvo != null && dialogActiveConvo[dialogConvoStep].choices == null) {
        if(dialogCurrentText.length < dialogActiveConvo[dialogConvoStep].text.length) {
            dialogCurrentText = dialogActiveConvo[dialogConvoStep].text;
        }
        else
        {
            dialogConvoStep = dialogActiveConvo[dialogConvoStep].nextPage;
            resetDialogText();
            if(dialogConvoStep == null) {
                dialogConvoStep = 0;
                dialogActiveConvo = null;
            }
        }
    }
}

function selectDialogChoice(key) {
    if(dialogActiveConvo == null || dialogActiveConvo[dialogConvoStep].choices == null) return;
    var option = keyToNumber(key);
    if(option != -1 && option <= dialogActiveConvo[dialogConvoStep].choices.length) {
        dialogConvoStep = dialogActiveConvo[dialogConvoStep].choices[option - 1][1];
        resetDialogText();
    }
}

function resetDialogText() {
    dialogCurrentText = "";
    dialogCurrentTextIndex = 0;
    dialogTextCharTimer = 0;
}

function setupDialog(convoObj, posX, posY) {
    dialogActiveConvo = convoObj;
    dialogConvoStep = 0;
    dialogX = posX;
    dialogY = posY;
    
    dialogCurrentX = posX + dialogW/2;
    dialogCurrentY = posY + dialogH/2;
    dialogCurrentW = dialogCurrentH = 0;
    resetDialogText();
}

function processDialog() {
    if(dialogActiveConvo == null) return;

    dialogCurrentX = lerp(dialogCurrentX, dialogX, dialogLerpSpeed);
    dialogCurrentY = lerp(dialogCurrentY, dialogY, dialogLerpSpeed);
    dialogCurrentW = lerp(dialogCurrentW, dialogW, dialogLerpSpeed);
    dialogCurrentH = lerp(dialogCurrentH, dialogH, dialogLerpSpeed);

    if(dialogTextCharTimer <= 0 && dialogCurrentW > dialogW / 1.25)
    {
        if(dialogCurrentText.length < dialogActiveConvo[dialogConvoStep].text.length)
        {
            dialogCurrentText += dialogActiveConvo[dialogConvoStep].text[dialogCurrentTextIndex];
            dialogCurrentTextIndex++;
            dialogTextCharTimer = dialogTextCharDelay;
        }
    }
    else
    {
        dialogTextCharTimer -= deltaTime;
    }
}

function drawDialog() {
    if(dialogActiveConvo == null) return;

    var dialogPanelGrad = canvasContext.createLinearGradient(dialogCurrentX + camX, dialogCurrentY + camY, dialogCurrentX + camX + dialogW/2, dialogCurrentY + camY + dialogH*2);
    dialogPanelGrad.addColorStop(0, dialogPanelColor1);
    dialogPanelGrad.addColorStop(1, dialogPanelColor2);
    canvasContext.fillStyle = dialogPanelGrad;
    canvasContext.fillRect(dialogCurrentX + camX, dialogCurrentY + camY, dialogCurrentW, dialogCurrentH);
    canvasContext.fillRect(dialogCurrentX + camX - dialogFontSize - dialogTextOffset*2, dialogCurrentY + camY - dialogFontSize - dialogTextOffset*2, dialogCurrentW/3, dialogCurrentH/3);
    if(dialogActiveConvo[dialogConvoStep].choices != null)
        for(let i = 0; i < dialogActiveConvo[dialogConvoStep].choices.length; i++)
            canvasContext.fillRect(dialogCurrentX + camX + dialogChoiceOffsetX, dialogCurrentY + camY + dialogChoiceOffsetY + (dialogChoiceHeight * i), dialogChoiceWidth, dialogChoiceHeight);

    canvasContext.strokeStyle = dialogOutlineColor;
    canvasContext.strokeRect(dialogCurrentX + camX, dialogCurrentY + camY, dialogCurrentW, dialogCurrentH);
    canvasContext.strokeRect(dialogCurrentX + camX - dialogFontSize - dialogTextOffset*2, dialogCurrentY + camY - dialogFontSize - dialogTextOffset*2, dialogCurrentW/3, dialogCurrentH/3);
    if(dialogActiveConvo[dialogConvoStep].choices != null)
        for(let i = 0; i < dialogActiveConvo[dialogConvoStep].choices.length; i++)
            canvasContext.strokeRect(dialogCurrentX + camX + dialogChoiceOffsetX, dialogCurrentY + camY + dialogChoiceOffsetY + (dialogChoiceHeight * i), dialogChoiceWidth, dialogChoiceHeight);

    canvasContext.fillStyle = dialogTextColor;
    canvasContext.fillText(dialogActiveConvo[dialogConvoStep].who, dialogCurrentX + camX - dialogFontSize - dialogTextOffset, dialogCurrentY + camY + dialogFontSize - dialogFontSize - dialogTextOffset);
    canvasContext.fillText(dialogCurrentText, dialogCurrentX + camX + dialogTextOffset, dialogCurrentY + camY + dialogFontSize + dialogTextOffset);
    if(dialogActiveConvo[dialogConvoStep].choices != null)
        for(let i = 0; i < dialogActiveConvo[dialogConvoStep].choices.length; i++)
            canvasContext.fillText((i+1).toString() + ". " + dialogActiveConvo[dialogConvoStep].choices[i][0], dialogCurrentX + camX + dialogChoiceOffsetX + dialogTextOffset, dialogCurrentY + camY + dialogChoiceOffsetY + dialogFontSize + dialogTextOffset + (dialogChoiceHeight * i), dialogChoiceWidth, dialogChoiceHeight);
}

let testConvo = [
    {
        scene: "neutral",
        who: "Despond",
        nameCol: "undefined",
        voice: undefined,
        text: "hello hi, longer text to see what happens when text is wider than the box.",
        nextPage: 1,
        choices: null,

        position: {x: 396.5, y: 42}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "How are you",
        nextPage: 2,
        choices: null,

        position: {x: 198.5, y: 363}
    },
    {
        scene: "",
        who: "Incense",
        nameCol: "undefined",
        voice: undefined,
        text: "i ok",
        nextPage: 3,
        choices: null,

        position: {x: 682.5, y: 525}
    },
    {
        scene: "",
        who: null,
        nameCol: null,
        voice: null,
        text: "you ok",
        nextPage: 4,
        choices: null,

        position: {x: 164.5, y: 695}
    },
    {
        scene: "",
        who: null,
        nameCol: null,
        voice: null,
        text: "",
        nextPage: null,
        choices: [["To 'hello hi'", 0], ["To 'How are you'", 1], ["Proceed", 5]],

        position: {x: 164.5, y: 895}
    },
    {
        scene: "",
        who: null,
        nameCol: null,
        voice: null,
        text: "that's the end!",
        nextPage: null,
        choices: null,

        position: {x: 164.5, y: 895}
    },
];
