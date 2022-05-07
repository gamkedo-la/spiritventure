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
        text: "Hello.",
        nextPage: 1,
        choices: null,

        position: {x: -53, y: -2642}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "...",
        nextPage: 2,
        choices: null,

        position: {x: 489, y: -2639}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["Hello?", 3], ["Excuse me, is something the matter?", 3]],

        position: {x: 1088, y: -2634}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "...How dare you enter here without my permission?",
        nextPage: 4,
        choices: null,

        position: {x: 664, y: -2278}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["I-I'm sorry?", 5], ["The door was open, and I did not know what I'd run into it honestly. Now I do.", 5]],

        position: {x: 664, y: -1988}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "... State your purpose of visit.",
        nextPage: 6,
        choices: null,

        position: {x: 644, y: -1623}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "You know, why I'm here.",
        nextPage: 7,
        choices: null,

        position: {x: 644, y: -1353}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "You really think you quell the fury that resides within me?",
        nextPage: 8,
        choices: null,

        position: {x: 644, y: -1082}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["Correction: Your host's fury, not yours. But that's not why I'm here.", 9], ["It seems to me that my presence is my bothering you.", 14]],

        position: {x: 755, y: -802}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I'm not here to fix you.",
        nextPage: 10,
        choices: null,

        position: {x: 218, y: -432}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "Why are you, here then?",
        nextPage: 11,
        choices: null,

        position: {x: 217, y: -161}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I'm here to listen.",
        nextPage: 12,
        choices: null,

        position: {x: 118, y: 106}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "Isn't the first time I've heard that. ",
        nextPage: 13,
        choices: null,

        position: {x: 239, y: 378}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "Your sentiments are pitiful.",
        nextPage: 24,
        choices: null,

        position: {x: 10, y: 658}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I shall make my way to the exit then.",
        nextPage: 15,
        choices: null,

        position: {x: 963, y: -425}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "No! wait.",
        nextPage: 16,
        choices: null,

        position: {x: 963, y: -135}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: 17,
        choices: null,

        position: {x: 963, y: 135}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "As much as I'd like to deny it, I need your help. For the sake my host.",
        nextPage: 18,
        choices: null,

        position: {x: 964, y: 403}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "And I can't hold this on much longer.",
        nextPage: 19,
        choices: null,

        position: {x: 964, y: 713}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "How can I help?",
        nextPage: 20,
        choices: null,

        position: {x: 1477, y: 464}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "Understand me.",
        nextPage: 21,
        choices: null,

        position: {x: 1477, y: 734}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "And in extension, understand the being in whose domain we reside in.",
        nextPage: 22,
        choices: null,

        position: {x: 1119, y: 1032}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["This isn't easy for me.", 23], ["I do want to, but everything I say is just... caustic at this point.", 23]],

        position: {x: 654, y: 1357}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "I know it isn't easy. ",
        nextPage: 24,
        choices: null,

        position: {x: 200, y: 1671}
    },
    {
        scene: "",
        who: "Tripa",
        nameCol: "undefined",
        voice: undefined,
        text: "But...",
        nextPage: 17,
        choices: null,

        position: {x: 508, y: 672}
    },
];