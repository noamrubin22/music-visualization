let audio;
let playButton;
let isPlaying = false;
let context, source, analyserNode;

function changeButtonText(text) {
  playButton.textContent = text;
}

function togglePlaying() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    audio.play();
    changeButtonText("pause");
  } else {
    changeButtonText("play");
    audio.pause();
  }
}
function playAudio(song) {
  /* returns audio-element, context and analyserNode */

  if (!playButton) {
    playButton = document.getElementById("play-btn");
    playButton.addEventListener("click", function () {
      togglePlaying();
    });
  }
  // initialize audio element
  if (!audio) {
    audio = new Audio();
    audio.controls = true;
    audio.loop = true;
    audio.autoplay = false;
    audio.crossOrigin = "anonymous";
    audio.hidden = true;
    audio.addEventListener("canplaythrough", () => {
      if (audio.paused) {
        togglePlaying();
      }
    });
    var audioElement = document.getElementById("audio-box");
    if (audioElement.hasChildNodes()) {
      audioElement.replaceChild(audio, audioElement.childNodes[0]);
    } else {
      audioElement.appendChild(audio);
    }

    context = new AudioContext();

    analyserNode = context.createAnalyser();
    // re-route audio playback into the processing graph of the Audio context
    source = context.createMediaElementSource(audio);
  }

  source.connect(analyserNode);

  // connect visualizationdata to destination
  analyserNode.connect(context.destination);

  // use uploaded song
  if (song == "schwarzes_gold.mp3") {
    audio.src = "audio/" + song;
    togglePlaying();
  }

  return [context, source, analyserNode];
}
