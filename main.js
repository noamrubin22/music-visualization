window.onload = function () {
  // call uploadFile function
  uploadFile();

  // play audio
  var properties = playAudio("raga.mp3");

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
};
