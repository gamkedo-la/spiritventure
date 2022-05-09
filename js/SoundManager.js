/**
 * Sound Manger
 * 
 * volume control: {@link volumeControl}
 * 
 * play bg music: {@link startBGM}
 * 
 * play sfx sound: {@link playSound}
 * 
 */

/** Holds all Audio objects for easy looping. */
let currentSFX = [];

/**
 * Volume Manger.
 * Controls volume levels of various categories (currently: master, bgm, sfx) independantly
 * 
 * to set volume use:
 * - masterVol(value)
 * - bgmVol(value)
 * - sfxVol(value)
 * 
 * values acepted are between 0 and 1
 * 
 * to toggle Mute use:
 * - toggleMute()
 */
let volumeControl = {
  // volume levels for query
  master: 1,
  bgm: 0.8,
  sfx: 0.5,

  // clamp revieved values
  checkVolumeValue(value) {
    if (value > 1) value = 1;
    if (value < 0) value = 0;

    return value;
  },

  get masterVol() {
    return this.master;
  },

  // sets master volume level and updates all audio tracks
  set masterVol(value) {
    this.master = this.checkVolumeValue(value);

    for (let track in currentSFX) {
      currentSFX[track].volume = this.setVolume(track);
    }
  },

  get bgmVol() {
    return this.bgm;
  },

  // sets background sound volume and updates "bgm" category tracks
  set bgmVol(value) {
    this.bgm = this.checkVolumeValue(value);

    for (let track in currentSFX) {
      if (currentSFX[track].category == "bgm") {
        currentSFX[track].volume = this.setVolume(track);
      }
    }
  },

  get sfxVol() {
    return this.sfx;
  },

  // sets sound fx volume and updates "sfx" category tracks
  set sfxVol(value) {
    this.sfx = this.checkVolumeValue(value);

    for (let track in currentSFX) {
      if (currentSFX[track].category == "sfx") {
        currentSFX[track].volume = this.setVolume(track);
      }
    }
  },

  toggleMute() {
    for (let track in currentSFX) {
      currentSFX[track].muted = !(currentSFX[track].muted);
  
      if (currentSFX[track].category == "bgm") {
        if (currentSFX[track].muted == true) {
          currentSFX[track].pause();
        }
        else {
          currentSFX[track].play();
        }
      }
    }
  },

  /** sets volume based on category */
  setVolume(track) {
    var volumeResult = 1;
  
    if (currentSFX[track].category == "bgm") {
      volumeResult = volumeControl.bgm;
    }
    else if (currentSFX[track].category == "sfx") {
      volumeResult = volumeControl.sfx;
    }
  
    return volumeResult * this.master;
  },
}

/**
 * Loads Audio objects into currentSFX[] on demand,
 * plays sound when/if loaded.
 * 
 * TODO: some error catching
 */
function sfx(fileName, loop = false, vol=1) {
  if (!currentSFX[fileName]) {
    // download the file once only
    currentSFX[fileName] = new Audio("sound/" + fileName);
  }

  try { currentSFX[fileName].play(); }
  catch(e) { console.log('sound error ignored.'); }
  
  currentSFX[fileName].volume = vol;
  currentSFX[fileName].loop = loop;
}

/**
 * Play looping track, on "bgm" category volume levels.
 * Only allows one bgm track.
 */
function startBGM(track = Sound.ShrillNights) {
    // pause all previous bgm tracks
    for (var thing in currentSFX) {
      if (currentSFX[thing].category == "bgm") {
        currentSFX[thing].currentTime = 0;
        currentSFX[thing].pause();
      }
  }

    sfx(track, true);
    currentSFX[track].category = "bgm";
    currentSFX[track].volume = volumeControl.setVolume(track)*roomSongVol[roomIndex];
}

/**
 * Play looping track, on "sfx" category volume levels.
 * Waits for track to finish before playing next.
 */
function playSound(track) {
  if (!currentSFX[track]) {
    sfx(track, false);
    currentSFX[track].category = "sfx";
    currentSFX[track].volume = volumeControl.setVolume(track)
  }
  else if (currentSFX[track].ended) {
    currentSFX[track].play();
  }
}





// what is all this below?
// ******************************************* //

// var audioFormat;

// function setFormat() {
//   var audio = new Audio();
//   if (audio.canPlayType("audio/mp3")) {
//       audioFormat = ".mp3";
//   } else {
//     audioFormat = ".ogg";
//   }
// }

// function BackgroundMusicClass() {

//   var musicSound = null;
    
//   this.loopSong = function(filenameWithPath) {
//     setFormat(); // calling this to ensure that audioFormat is set before needed
    
//     if(musicSound != null) {
//       musicSound.pause();
//       musicSound = null;
//     }
//     musicSound = new Audio(filenameWithPath+audioFormat);
//     musicSound.loop = true;
//     musicSound.play(); // this causes an error if the user didn't just click
//   }
  
//   this.startOrStopMusic = function() {
//     if(musicSound.paused) {
//       musicSound.play();
//     } else {
//       musicSound.pause();
//     }
//   }
// }

// function SoundOverlapsClass(filenameWithPath) { // accepting argument for constructor
  
//   setFormat(); // calling this to ensure that audioFormat is set before needed
  
//   // All variables here are "private", hidden to outside. Use "var " - not "this."
//   var mainSound = new Audio(filenameWithPath+audioFormat);
//   var altSound = new Audio(filenameWithPath+audioFormat);

//   var altSoundTurn = false;
  
//   this.play = function() { // not "var ", keeping "this.", as we need it exposed!
//     if(altSoundTurn) { // note: no "this." before altSoundTurn since "var" local/private
//       altSound.currentTime = 0;
//       altSound.play();
//     } else {
//       mainSound.currentTime = 0;
//       mainSound.play();
//     }
//     altSoundTurn = !altSoundTurn; // toggle between true and false
//   }

// }
