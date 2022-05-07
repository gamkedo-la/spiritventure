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
        text: "Hello-",
        nextPage: 1,
        choices: null,

        position: {x: -770, y: -5835}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "GAH stay away from me",
        nextPage: 2,
        choices: null,

        position: {x: -127, y: -5828}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I-I just want to tal-",
        nextPage: 3,
        choices: null,

        position: {x: 321, y: -5805}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "No stop stop stop",
        nextPage: 4,
        choices: null,

        position: {x: 833, y: -5819}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "I am going to die why am I here help please ",
        nextPage: 5,
        choices: null,

        position: {x: 1361, y: -5818}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["You are not going to die. I am right here, nothing bad is going happen.", 7], ["...I-I want to help but I ca-", 6]],

        position: {x: 1434, y: -5546}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "Help? DId I just hear that, ahhh those sweet words",
        nextPage: 10,
        choices: null,

        position: {x: 1742, y: -5244}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "Bu-But there's always something bad that happens. Always. Always. I must be prepared.",
        nextPage: 8,
        choices: null,

        position: {x: 1011, y: -5287}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I do agree, you should always be prepared. That's a smart move. Howeve-",
        nextPage: 9,
        choices: null,

        position: {x: 811, y: -4998}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "Smart? You call that smart? That's the first time someone has said that to me... but but the pain the crunch it's too mu-",
        nextPage: 12,
        choices: null,

        position: {x: 1006, y: -4685}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...Can we slow down, I'm finding it really hard to keep up...",
        nextPage: 11,
        choices: null,

        position: {x: 1737, y: -4949}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "How do I slow down what's inside? This piece of machinery, so utterly indescipherable.",
        nextPage: 12,
        choices: null,

        position: {x: 1735, y: -4659}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "*inhales sharply* I'm sorry... oh my that was so bad of me. How could I lash out on you like that-",
        nextPage: 13,
        choices: null,

        position: {x: 1398, y: -4354}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["Take your time.", 14], ["You don't have to apologise. Caught you in the wrong time, is all.", 20], ["I'm going to speak now, if for nothing else, for you take a break.", 21]],

        position: {x: 1810, y: -4142}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "Yes, I will.",
        nextPage: 15,
        choices: null,

        position: {x: 800, y: -3782}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "...",
        nextPage: 16,
        choices: null,

        position: {x: 799, y: -3512}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "You're here to help my host, yes? And in extension, bring peace to me.",
        nextPage: 17,
        choices: null,

        position: {x: 799, y: -3242}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I can't promise either of things.",
        nextPage: 18,
        choices: null,

        position: {x: 799, y: -2932}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "I understand. That's... that's a lot of responsibility for one person.",
        nextPage: 19,
        choices: null,

        position: {x: 799, y: -2662}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "There is... there is room to help however.",
        nextPage: 26,
        choices: null,

        position: {x: 799, y: -2372}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "Right, long time indeed...",
        nextPage: 15,
        choices: null,

        position: {x: 1376, y: -3651}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "That'd be nice... yes.",
        nextPage: 22,
        choices: null,

        position: {x: 2067, y: -3818}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I'm here to help, or atleast I think I am. From what I know, your host seems to in distress which is putting it lightly really.",
        nextPage: 23,
        choices: null,

        position: {x: 1801, y: -3471}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "You're living proof of that. I want to understand more.",
        nextPage: 24,
        choices: null,

        position: {x: 1801, y: -3141}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "This space, is desolate.",
        nextPage: 25,
        choices: null,

        position: {x: 1438, y: -2646}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "Empty.",
        nextPage: 26,
        choices: null,

        position: {x: 1438, y: -2376}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "Nobody has visited my host's domain in a long, long time. Excruciatingly long.",
        nextPage: 48,
        choices: null,

        position: {x: 1440, y: -2107}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "You are here because... because of a connection.",
        nextPage: 28,
        choices: null,

        position: {x: 2374, y: -1990}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Wonderfully vague.",
        nextPage: 29,
        choices: null,

        position: {x: 1916, y: -1854}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "I don't step out of my quarters, if you'd call it that. I hear voices adjacent, but I can't step out lest this crumbles.",
        nextPage: 30,
        choices: null,

        position: {x: 1390, y: -1688}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Why would this crumble? Sounds like you're... afraid. A delusion. Harsh?",
        nextPage: 31,
        choices: null,

        position: {x: 1143, y: -1338}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "No, you're bang on with that-",
        nextPage: 32,
        choices: null,

        position: {x: 1905, y: -1455}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Bang on, heh.",
        nextPage: 33,
        choices: null,

        position: {x: 1912, y: -1184}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "What? It's the new lingo I hear.",
        nextPage: 34,
        choices: null,

        position: {x: 1903, y: -914}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I just was not expecting... those choice of words. Interesting, so you're able to hear outside voices...",
        nextPage: 35,
        choices: null,

        position: {x: 949, y: -1025}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "... my host is scared of the other beings that reside here. I can't wander too, my host trusts me the most.",
        nextPage: 36,
        choices: null,

        position: {x: 1391, y: -665}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Presumptous, no?",
        nextPage: 37,
        choices: null,

        position: {x: 1869, y: -604}
    },
    {// id: 37
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "In other words, this feeling is the most... familiar to them. It gives them... comfort.",
        nextPage: 38,
        choices: null,

        position: {x: 2126, y: -290}
    },
    {// id: 38
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["Fear gives your host comfort... I can relate to that.", 39], ["...How does that even work?", 42]],

        position: {x: 1436, y: -201}
    },
    {// id: 39
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "I see... then you would know what to do with this newfound knowledge?",
        nextPage: 40,
        choices: null,

        position: {x: 988, y: 207}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I-I... do not.",
        nextPage: 41,
        choices: null,

        position: {x: 988, y: 517}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "It looks like your fear is talking now.",
        nextPage: 44,
        choices: null,

        position: {x: 1225, y: 787}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "I understand if you can't wrap your head around it. And I know you're trying, so that's all I can ask for. For my host's sake and mine.",
        nextPage: 43,
        choices: null,

        position: {x: 1974, y: 250}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "I-I'll do my best to consider what you've told me.",
        nextPage: 44,
        choices: null,

        position: {x: 1972, y: 580}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...Farewell.",
        nextPage: 45,
        choices: null,

        position: {x: 1603, y: 1084}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "I sure hope someone is looking out for you too.",
        nextPage: null,
        choices: null,

        position: {x: 1601, y: 1397}
    },
    {
        scene: "",
        who: "Satah",
        nameCol: "undefined",
        voice: undefined,
        text: "...",
        nextPage: 29,
        choices: null,

        position: {x: 2907, y: -2089}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "Kidding.",
        nextPage: 46,
        choices: null,

        position: {x: 2714, y: -2381}
    },
    {
        scene: "",
        who: "Soul",
        nameCol: "yellow",
        voice: undefined,
        text: "...",
        nextPage: null,
        choices: [["No wonder, this place is atrocious.", 47], ["Why am I here then?", 27]],

        position: {x: 2164, y: -2353}
    },
];
//CONVERSATIONS.push(ATestDialog);