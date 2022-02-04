//Conversations for Editing

//________________
//Only listed to prevent errors, not used in Dialog Editor
const voiceHigh1 = null;
const voiceHigh2 = null;
const voiceLow1 = null;
const voiceLow2 = null;
//_________________

let editableDialogString ="";

let ATestDialog = [
    {
        scene: "neutral",
        who: "Despond",
        nameCol: "lightBlue",
        voice: voiceLow1,
        text: "Hi there.",
        nextPage: 1,
        leftPic: despond,
        rightPic: null,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 472.5, y: 133}
    },/*
    {
        scene: "neutral",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "Hi! How are you?",
        nextPage: 2,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 472.5, y: 433}
    },
    {
        scene: "neutral",
        who: "Despond",
        nameCol: "lightBlue",
        voice: voiceLow1,
        text: "",
        nextPage: null,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: [["Good, how about you?", "Good end"], ["Meh", "Bad end"], ["I like tortles", "Tortle end"]],

        position: {x: 472.5, y: 733}
    },
    {
        scene: "Good end",
        who: "Despond",
        nameCol: "lightBlue",
        voice: voiceLow1,
        text: "I'm good. So how've you been?",
        nextPage: 4,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 63.5, y: 965}
    },
    {
        scene: "Good end",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "I'm fine.",
        nextPage: 5,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 64.5, y: 1226}
    },
    {
        scene: "Good end",
        who: "Despond",
        nameCol: "lightBlue",
        voice: voiceLow1,
        text: "Oh that's great.",
        nextPage: 6,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 67.5, y: 1489}
    },
    {
        scene: "Good end",
        who: "Despond",
        nameCol: "lightBlue",
        voice: voiceLow1,
        text: "Hold on, let me just show the player that I also have an angry face portrait.",
        nextPage: 7,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 70.5, y: 1758}
    },
    {
        scene: "Good end",
        who: "Despond",
        nameCol: "lightBlue",
        voice: voiceLow1,
        text: "GRRR",
        nextPage: 8,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 78.5, y: 2067}
    },
    {
        scene: "Good end",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "Uhh, oK, see ya",
        nextPage: 9,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 85.5, y: 2340}
    },
    {
        scene: "Good end",
        who: "Despond",
        nameCol: "lightBlue",
        voice: voiceLow1,
        text: "Hey, wait!",
        nextPage: 10,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: true,

        choices: null,

        position: {x: 88.5, y: 2614}
    },
    {
        scene: "Good end",
        who: "Despond",
        nameCol: "lightBlue",
        voice: voiceLow1,
        text: "...",
        nextPage: 11,
        leftPic: despond,
        rightPic: null,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 91.5, y: 2887}
    },
    {
        scene: "Good end",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "Just kidding!",
        nextPage: 12,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 94.5, y: 3171}
    },
    {
        scene: "Good end",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "Do you want to talk some more?",
        nextPage: 13,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 99.5, y: 3445}
    },
    {
        scene: "Good end",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "",
        nextPage: null,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: [["Yes", "Talk more"], ["No", "Really?"]],

        position: {x: 102.5, y: 3725}
    },
    {
        scene: "Talk more",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "Yay! Too bad, I have to go though",
        nextPage: 15,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 542.5, y: 3862}
    },
    {
        scene: "Talk more",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "Let's talk later!",
        nextPage: 16,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 545.5, y: 4138}
    },
    {
        scene: "Really?",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "Really, are you sure?",
        nextPage: 17,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 99.5, y: 4030}
    },
    {
        scene: "Really?",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "",
        nextPage: null,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: [["no", "Bad end"], ["actually, yes", "Talk more"]],

        position: {x: 536.5, y: 3554}
    },
    {
        scene: "Bad end",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "Yeah, I feel you.",
        nextPage: 19,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 880.5, y: 3101}
    },
    {
        scene: "Bad end",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "Welp, gotta go!",
        nextPage: 20,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 952.5, y: 3379}
    },
    {
        scene: "Tortle end",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "JONATHAN IS THAT YOU",
        nextPage: 21,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 1299.5, y: 2876}
    },
    {
        scene: "Tortle end",
        who: "incense",
        nameCol: "pink",
        voice: voiceHigh2,
        text: "BOI",
        nextPage: 22,
        leftPic: despond,
        rightPic: incense,

        leftPicLeave: false,
        rightPicLeave: false,

        choices: null,

        position: {x: 1373.5, y: 3155}
    }*/
];

//CONVERSATIONS.push(ATestDialog);