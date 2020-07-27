let audio;
let playButton;
let isPlaying = false;

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
      console.log("clicked");
      togglePlaying();
    });
  }
  // initialize audio element
  audio = new Audio();

  // make sure CODS are set to None
  audio.crossOrigin = "anonymous";
  audio.hidden = true;
  // use uploaded song
  if (song == "schwarzes_gold.mp3") {
    audio.src = "audio/" + song;
    togglePlaying();
  } else {
    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   audio.src = this.result;
    //   audio.controls = true;
    //   // console.log("audioochanged");
    //   // playButton.textContent = "play";
    //   // audio.play();
    //   console.log("2");
    //   reader.readAsDataURL(this.files[0]);
    //   togglePlaying();
    // };
  }
  // let it play
  audio.controls = true;
  audio.loop = true;
  audio.autoplay = false;

  // if audio changes
  audio.onchange = function () {
    // create files in this
    var files = this.files;
    console.log("3");
    // store objecturl
    var file = URL.createObjectURL(files[0]);

    // set objecturl to audioplayer
    audio_player.src = file;

    audio_player.resume();

    // playButton.textContent = "play";
    // audio.pause();
    // playOnClick(isPlaying);

    // play audio
    audio_player.play();
  };

  // replace audio element in the audio box on the page
  var audioElement = document.getElementById("audio-box");
  console.log("4");
  if (audioElement.hasChildNodes()) {
    audioElement.replaceChild(audio, audioElement.childNodes[0]);
  } else {
    audioElement.appendChild(audio);
  }

  var context = new AudioContext();

  var analyserNode = context.createAnalyser();

  // re-route audio playback into the processing graph of the Audio context
  var source = context.createMediaElementSource(audio);
  source.connect(analyserNode);

  // connect visualizationdata to destination
  analyserNode.connect(context.destination);

  return [context, source, analyserNode];
}
