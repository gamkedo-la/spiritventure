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

        position: {x: 639, y: -7350}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Did you have a jolly good time meeting the various inhabitants?",
        nextPage: 2,
        choices: null,

        position: {x: 639, y: -7080}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["Yes, they were quite delightful.", 3], ["They weren't the most... civilised, but are important nonetheless.", 4]],

        position: {x: 812, y: -6816}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "How congenial of you.",
        nextPage: 5,
        choices: null,

        position: {x: 193, y: -6519}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Typical.",
        nextPage: 5,
        choices: null,

        position: {x: 1158, y: -6492}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "How... how were they?",
        nextPage: 6,
        choices: null,

        position: {x: 685, y: -6171}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["They were fine! Nothing to worry about you. Your stress is quite suprising actually, considering there's no real source?", 8], ["Under considerable distress.", 7]],

        position: {x: 653, y: -5875}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "What a suprise.",
        nextPage: 11,
        choices: null,

        position: {x: 1159, y: -5526}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Re...Really?",
        nextPage: 9,
        choices: null,

        position: {x: 147, y: -5641}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "What do you think?",
        nextPage: 10,
        choices: null,

        position: {x: 59, y: -5390}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Of course not... no.",
        nextPage: 11,
        choices: null,

        position: {x: 42, y: -5134}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Hmph. Let me guess. Those fools had concern for me, handed you an item that's infinetesimely close to the limit of zero.",
        nextPage: 12,
        choices: null,

        position: {x: 678, y: -5043}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Your naivety is astounding. What did I tell you? A worthless effort.",
        nextPage: 13,
        choices: null,

        position: {x: 681, y: -4689}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "There is no respite for a thing such as I.",
        nextPage: 14,
        choices: null,

        position: {x: 681, y: -4399}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "And those items that you hold, what, did you think that you fiive some magical aura to",
        nextPage: 15,
        choices: null,

        position: {x: 680, y: -4109}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["It's interesting to note that you had concern for what resides in you. You asked me how they were.", 16], ["Those items are keepsakes. A reminder of you.", 18]],

        position: {x: 633, y: -3810}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "I asked out of courtesy.",
        nextPage: 17,
        choices: null,

        position: {x: 152, y: -3542}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Wrong. You asked because you care.",
        nextPage: 20,
        choices: null,

        position: {x: 108, y: -3268}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "N",
        nextPage: 19,
        choices: null,

        position: {x: 1083, y: -3520}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "There's this... knowing gnawing at me. I know you, even outside of this space.",
        nextPage: 22,
        choices: null,

        position: {x: 1083, y: -3250}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "And somewhere, this care had once been transformed into magnificance.",
        nextPage: 21,
        choices: null,

        position: {x: 108, y: -2978}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Touching, poetic. But you could be wrong.",
        nextPage: 24,
        choices: null,

        position: {x: 21, y: -2662}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Or maybe you don't.",
        nextPage: 23,
        choices: null,

        position: {x: 1045, y: -2948}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Or maybe I don't. Who cares? This, right now is real.",
        nextPage: 25,
        choices: null,

        position: {x: 1045, y: -2678}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Could be, my alternative sounds more... pleasing. Foolish, but possible.",
        nextPage: 25,
        choices: null,

        position: {x: 516, y: -2753}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Your faith is poisonous.",
        nextPage: 26,
        choices: null,

        position: {x: 626, y: -2368}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "... You don't have a name, do you?",
        nextPage: 27,
        choices: null,

        position: {x: 626, y: -2098}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Let's call you... Spinian.",
        nextPage: 28,
        choices: null,

        position: {x: 626, y: -1828}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Ok. Not gonna question where that came from.",
        nextPage: 29,
        choices: null,

        position: {x: 626, y: -1558}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Yes, don't. Arbitary processes of the network.",
        nextPage: 30,
        choices: null,

        position: {x: 626, y: -1266}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "... I must say that your efforts have been slightly amusing. Slightly admirable.",
        nextPage: 31,
        choices: null,

        position: {x: 626, y: -976}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "But not enough.",
        nextPage: 32,
        choices: null,

        position: {x: 626, y: -666}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["I'll live with that.", 34], ["That's the most I could ask for.", 35], ["I sad.", 33]],

        position: {x: 676, y: -407}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Aw. Tough luck.",
        nextPage: 36,
        choices: null,

        position: {x: 1134, y: -160}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "You do.",
        nextPage: 36,
        choices: null,

        position: {x: 210, y: -91}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Good.",
        nextPage: 36,
        choices: null,

        position: {x: 685, y: -53}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "What do we do now?",
        nextPage: 37,
        choices: null,

        position: {x: 685, y: 217}
    },
    {
        scene: "",
        who: "Gemini",
        nameCol: "undefined",
        voice: undefined,
        text: "Wait until the bell beckons.",
        nextPage: 38,
        choices: null,

        position: {x: 686, y: 488}
    },
];