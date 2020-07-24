function playAudio(song) {
  /* returns audio-element, context and analyserNode */
  function playOnClick() {
    let isPlaying = false;
    const playButton = document.getElementById("play-btn");
    playButton.addEventListener("click", function () {
      isPlaying = !isPlaying;
      if (isPlaying) {
        audio.play();
        playButton.textContent = "pause";
      } else {
        playButton.textContent = "play";
        audio.pause();
      }
    });
  }

  // initialize audio element
  var audio = new Audio();

  // make sure CODS are set to None
  audio.crossOrigin = "anonymous";
  audio.hidden = true;
  // use uploaded song
  if (song == "schwarzes_gold.mp3") {
    audio.src = "audio/" + song;
    // audio.play();
    playOnClick();
  } else {
    var reader = new FileReader();
    reader.onload = function (e) {
      audio.src = this.result;
      audio.controls = true;
      playOnClick();
      // audio.play();
    };
    reader.readAsDataURL(this.files[0]);
  }
  // let it play
  audio.controls = true;
  audio.loop = true;
  audio.autoplay = false;

  // if audio changes
  audio.onchange = function () {
    // create files in this
    var files = this.files;

    // store objecturl
    var file = URL.createObjectURL(files[0]);

    // set objecturl to audioplayer
    audio_player.src = file;

    audio_player.resume();

    // play audio
    audio_player.play();
  };

  // replace audio element in the audio box on the page
  var audioElement = document.getElementById("audio-box");

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
