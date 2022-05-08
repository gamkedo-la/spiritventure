//Conversations for Editing

//________________
//Only listed to prevent errors, not used in Dialog Editor
const voiceHigh1 = null;
const voiceHigh2 = null;
const voiceLow1 = null;
const voiceLow2 = null;
//_________________

let editableDialogString ="";

let Gemini1 = [
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "So, you finally made it.",
        nextPage: 1,
        choices: null,

        position: {x: 538, y: -461}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Did you have a jolly good time meeting the various inhabitants?",
        nextPage: 2,
        choices: null,

        position: {x: 538, y: -191}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["Yes, they were quite delightful.", 3], ["They weren't the most... civilised, but are important nonetheless.", ]],

        position: {x: 549, y: 79}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "",
        nextPage: 4,
        choices: null,

        position: {x: 92, y: 370}
    },
];