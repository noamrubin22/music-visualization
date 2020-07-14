window.onload = function () {
  // hide all elements before start button is clicked
  document.getElementById("upload-file").style.visibility = "hidden";
  document.getElementById("synthesizer").style.visibility = "hidden";

  // play audio
  const startButton = document.getElementById("start-btn");
  startButton.addEventListener("click", function () {
    // remove button
    startButton.style.display = "none";

    document.getElementById("upload-file").style.visibility = "visible";
    document.getElementById("synthesizer").style.visibility = "visible";
    // call uploadFile function;
    uploadFile();

    var properties = playAudio("schwarzes_gold.mp3");

    // substract properties audio file
    context = properties[0];
    source = properties[1];
    analyserNode = properties[2];

    // create frequency barchart
    createBarChart(analyserNode);

    // create circle chart
    createCircleChart(analyserNode);

    // create line graph
    startLineContext(analyserNode);

    // run synthesizer
    synthesizer(context, source);
  });
};
