function uploadFile() {
  /* lets user upload a file and updates chart s*/
  // storage variables
  const realFileButton = document.getElementById("real-file");
  const customButton = document.getElementById("upload-btn");
  const customText = document.getElementById("custom-text");
  const breatheButton = document.getElementById("breathe-btn");

  customButton.addEventListener("click", function () {
    if (!audio.paused) {
      togglePlaying();
    }
    realFileButton.click();
  });

  realFileButton.addEventListener("change", function (e) {
    changeButtonText("wait");
    if (realFileButton.value) {
      customText.innerHTML = document
        .getElementById("real-file")
        .files[0].name.split(".mp3");
      let file = e.target.files[0];

      // open the database connection.
      let open = indexedDB.open("db");
      open.onupgradeneeded = function () {
        // define the database schema if necessary.
        let db = open.result;
        let store = db.createObjectStore("files");
      };
      open.onsuccess = function () {
        let db = open.result;
        let key = 1;

        // Write file to DB
        let tx = db.transaction("files", "readwrite");
        let store = tx.objectStore("files");
        store.put(file, key);

        // later, read file back out of DB
        var tx2 = db.transaction("files");
        var store2 = tx2.objectStore("files");
        var request = store2.get(key);
        request.onsuccess = function (e) {
          var file = request.result;
          // construct a URL for file
          var url = URL.createObjectURL(file);
          // update audio element with the URL
          audio.src = url;
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

        createBarChart(analyserNode);
        createCircleChart(analyserNode, false);
        synthesizer(context, source);
      };
    }
  });
}
