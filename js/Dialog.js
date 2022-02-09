var dialogConvoStep = 0;

function advanceDialog(){
    dialogConvoStep++;
    if(dialogConvoStep>=convo.length){
        dialogConvoStep = 0;
        console.log("Dialog finished, to do exit dialog");
    }
    document.getElementById("debugText").innerHTML = convo[dialogConvoStep].text;
}



let convo = [
    {
        scene: "neutral",
        who: "Despond",
        nameCol: "undefined",
        voice: undefined,
        text: "hello hi",
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
        nextPage: 0,
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
];
