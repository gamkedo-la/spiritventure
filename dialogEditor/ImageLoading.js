//Image Loading
let imageList = [];
const billboardSprites = [];

let picsToLoad = 0;

const despond = document.createElement("img");
const satah = document.createElement("img");
const tripa = document.createElement("img");
const gemini = document.createElement("img");
const soul = document.createElement("img");


function imageForString(string) {
	switch(string) {
		case "despond":
			return despond;
		case "satah":
			return satah;
		case "tripath":
			return tripath;
		case "gemini":
			return gemini;
		case "soul":
			return soul;
	}
}

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	fillRectangle(canvasContext, 0, 0, canvas.width, canvas.height, 'red');
	colorText(canvasContext, "LOADING", canvas.width / 2, canvas.height / 2, 'white', 34, 'center', opacity = 1);
	const numberText = "Remaining Images: " + picsToLoad.toString();
	colorText(canvasContext, numberText, canvas.width / 2, 2 * canvas.height / 3, 'white', 30, 'center', opacity = 1);
	if (picsToLoad == 0) { // last image loaded?
		loadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;	
	imgVar.src = "images/" + fileName;
}

function loadImages() {
	imageList = [
	   //PORTRAITS
	    {imgName: despond, theFile: "soul.png", speaker:Speaker.Despond},
	    {imgName: satah, theFile: "spotwall.png", speaker:Speaker.Satah},
	    {imgName: tripa, theFile: "warrior.png", speaker:Speaker.Tripa},
		{imgName: gemini, theFile: "world_door.png", speaker:Speaker.Gemini},
		{imgName: soul, theFile: "world_key", speaker:Speaker.Soul}, 
		
	];

	picsToLoad = imageList.length;
	countLoadedImageAndLaunchIfReady();

	for (let i = 0; i < imageList.length; i++) {
		beginLoadingImage(imageList[i].imgName, imageList[i].theFile);
	}
}