function uploadFile() {
  /* lets user upload a file and updates chart s*/
  let audioElement;
  // substract variables from html
  const realFileButton = document.getElementById("real-file");
  const customButton = document.getElementById("upload-btn");
  const customText = document.getElementById("custom-text");
  // const playButton = document.getElementById("play-btn");

  // activate realfilebutton when custombutton is clicked
  customButton.addEventListener("click", function () {
    realFileButton.click();
    console.log("clicked");
    // pause music
    togglePlaying();
  });

  // if value realfilebutton changes
  realFileButton.addEventListener("change", function (e) {
    // pause audio again
    changeButtonText("wait");
    // playButton.textContent = "play";
    // playOnClick(false);
    // if a file is chosen
    if (realFileButton.value) {
      // stop audio
      // show filename
      customText.innerHTML = document
        .getElementById("real-file")
        .files[0].name.split(".mp3");
      var file = e.target.files[0];

      // Open the database connection.
      var open = indexedDB.open("blob-test");
      open.onupgradeneeded = function () {
        // Define the database schema if necessary.
        var db = open.result;
        var store = db.createObjectStore("files");
      };
      open.onsuccess = function () {
        var db = open.result;
        var key = 1;

        // Write file to DB
        var tx = db.transaction("files", "readwrite");
        var store = tx.objectStore("files");
        store.put(file, key);

        // Later, read file back out of DB
        var tx2 = db.transaction("files");
        var store2 = tx2.objectStore("files");
        var request = store2.get(key);
        request.onsuccess = function (e) {
          // Got the file!
          var file = request.result;
          // Construct a URL for it
          var url = URL.createObjectURL(file);
          // Update audio element with the URL
          if (!audioElement) {
            audioElement = document.querySelector("audio");
            // loader
            // changeButtonText("wait");
            audioElement.addEventListener("canplaythrough", () => {
              togglePlaying();
              // delete loader
            });
          }
          audioElement.src = url;
          // togglePlaying();
        };

        // update chart with new data
        var properties = playAudio(customText.innerHTML);

        // substract properties audio file
        context = properties[0];
        source = properties[1];
        analyserNode = properties[2];

        // create frequencyArray and fill it
        frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(frequencyArray);

        // create frequency barchart
        createBarChart(analyserNode);

        // create circle chart
        createCircleChart(analyserNode, false);

        // create linegraph
        startLineContext(analyserNode);

        // run synthesizer
        synthesizer(context, source);

        // stop audio
        // audio.pause();
        // isPlaying = false;
        // playButton.textContent = "play";
      };
      // if file is not chosen yet
    } else {
      // show
      customText.innerHTML = "File not chosen";
    }
  });
}
