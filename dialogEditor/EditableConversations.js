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
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Hello, I am here to… I’m not sure why I’m here.",
        nextPage: 1,
        choices: null,

        position: {x: 701, y: -204}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Another lost soul seeking eternal damnation…",
        nextPage: 2,
        choices: null,

        position: {x: 533, y: 48}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "…It’s certainly not that. I know that you’re important, and this strong sense that you can guide me on what to do next.",
        nextPage: 3,
        choices: null,

        position: {x: 682, y: 292}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: " Guide you? Let me tell you why you’re here.",
        nextPage: 4,
        choices: null,

        position: {x: 1168, y: -205}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "You’re here to guide me. Not the other way around.You’re here to help me get out of this miserable pit by exploring those forsaken doors.Others have tried, and failed utterly.Don’t think you’re too special. You will fail too.",
        nextPage: 5,
        choices: null,

        position: {x: 1184, y: 65}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "",
        nextPage: null,
        choices: [["That’s a nice way to get someone’s help.", 6], ["I’m not sure how I can help, but I can try. Besides, I have nothing else to here. ", 7]],

        position: {x: 1184, y: 335}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "I never asked for this,I have no choice here.",
        nextPage: 8,
        choices: null,

        position: {x: 883, y: 627}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Then help. Go through those doors, and be wary of what may greet you.",
        nextPage: 10,
        choices: null,

        position: {x: 1394, y: 632}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I...I'll do whatI can.",
        nextPage: 9,
        choices: null,

        position: {x: 928, y: 912}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "How reassruing.",
        nextPage: 10,
        choices: null,

        position: {x: 1313, y: 1111}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "See you around.",
        nextPage: 11,
        choices: null,

        position: {x: 1708, y: 896}
    },
];
//CONVERSATIONS.push(ATestDialog);