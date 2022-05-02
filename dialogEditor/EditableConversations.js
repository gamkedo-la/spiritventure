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
        text: "Hello, I am here to... I'm not sure why I'm here.",
        nextPage: 1,
        choices: null,

        position: {x: 567, y: -1878}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Another lost soul seeking eternal damnation...",
        nextPage: 2,
        choices: null,

        position: {x: 567, y: -1588}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...It's certainly not that. I know that you're important, and this strong sense that you can guide me on what to do next.",
        nextPage: 4,
        choices: null,

        position: {x: 567, y: -1298}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "...Go through those doors, and be wary of what may greet you.",
        nextPage: 11,
        choices: null,

        position: {x: 483, y: -407}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Guide you? Let me tell you why you’re here.",
        nextPage: 5,
        choices: null,

        position: {x: 116, y: -939}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "You’re here to guide me. Not the other way around.",
        nextPage: 6,
        choices: null,

        position: {x: 547, y: -934}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Why? A cruel fate. You’re here to help me get out of this miserable pit by exploring those forsaken doors.",
        nextPage: 7,
        choices: null,

        position: {x: 983, y: -1022}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Others have tried, and failed utterly.",
        nextPage: 8,
        choices: null,

        position: {x: 973, y: -611}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Don’t think you’re too special. You will fail too.",
        nextPage: 9,
        choices: null,

        position: {x: 554, y: -655}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["That's a nice way to get someone's help.", 10], ["I’m not sure how I can help, but I can try.", 3]],

        position: {x: 44, y: -608}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "I have no choice. I didn't ask for this.",
        nextPage: 3,
        choices: null,

        position: {x: 44, y: -266}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "You'll find my not-so-lovely emotions throwing a tantrum.",
        nextPage: 12,
        choices: null,

        position: {x: 992, y: -222}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Which doors correspond to what? I do not know.",
        nextPage: 13,
        choices: null,

        position: {x: 1415, y: -215}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "What will you do in there? I don't care.",
        nextPage: 14,
        choices: null,

        position: {x: 1415, y: 75}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["You do care.", 15], ["Mighty fine guidance there.", 15]],

        position: {x: 700, y: 97}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I'll be seeing you around at the end of this.",
        nextPage: 16,
        choices: null,

        position: {x: 700, y: 419}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Take-",
        nextPage: 17,
        choices: null,

        position: {x: 1215, y: 470}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "What?",
        nextPage: 18,
        choices: null,

        position: {x: 1215, y: 740}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Nevermind, go.",
        nextPage: 19,
        choices: null,

        position: {x: 1215, y: 1010}
    },
];
//CONVERSATIONS.push(ATestDialog);