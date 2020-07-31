//////////////////////////////////////////////////////////
// Minor Programmeren Finalproject Music visualization  //
//                                                      //
var globalFilterValue;

function synthesizer(context, source) {
  /* gives possibilty to modify audio context and returns analyserNode*/

  // get elements from html
  const selectedDistortion = document.getElementById("distortion");
  const selectedFilter = document.getElementById("filter");
  const selectedBassBooster = document.getElementById("lowpassfilter");

  // create audio context elements
  let analyserNode = context.createAnalyser();
  let distortion = context.createWaveShaper();
  let gainNode = context.createGain();
  let biquadFilter = context.createBiquadFilter();

  // connect nodes
  source.connect(distortion);
  distortion.connect(biquadFilter);
  biquadFilter.connect(gainNode);
  gainNode.connect(analyserNode);
  analyserNode.connect(context.destination);

  // initialize slider values variables
  let changedDistortion = selectedDistortion.value;
  let changedFilter = selectedFilter.value;
  let changedBass = selectedBassBooster.value;

  // and a reset button variable
  const resetButton = document.getElementsByClassName("button")[0];

  function filterChange() {
    /* filters the low frequencies */
    let newFilterValue = selectedFilter.value * 10000;
    biquadFilter.type = "highpass";
    globalFilterValue = newFilterValue;
    biquadFilter.frequency.setTargetAtTime(
      newFilterValue,
      context.currentTime,
      0
    );
    biquadFilter.gain.setTargetAtTime(30, context.currentTime, 0);
  }

  function bassChange() {
    /* increases the low frequency sounds */
    let newFilterValue = selectedBassBooster.value * 100;
    biquadFilter.type = "lowshelf";
    biquadFilter.frequency.setTargetAtTime(
      newFilterValue,
      context.currentTime,
      0
    );
    biquadFilter.gain.setTargetAtTime(30, context.currentTime, 0);
  }

  function distortionChange() {
    /*adds a distortion to the sound*/
    changedDistortion = selectedDistortion.value * 800;
    distortion.curve = Distortion(changedDistortion);
  }

  // when sliders are used song-properties change and needs to be updated
  selectedFilter.onchange = function () {
    filterChange(selectedFilter.value);
  };

  selectedBassBooster.onchange = function () {
    bassChange(selectedBassBooster.value);
  };

  selectedDistortion.onchange = function () {
    distortionChange(selectedDistortion.value);
  };

  resetButton.onclick = function () {
    selectedFilter.value = selectedFilter.defaultValue;
    filterChange(selectedFilter.defaultValue);
    selectedBassBooster.value = selectedBassBooster.defaultValue;
    bassChange(selectedBassBooster.defaultValue);
    selectedDistortion.value = selectedDistortion.defaultValue;
    distortionChange(selectedDistortion.defaultValue);
  };

  // visualizations needs to receive new data from analyserNode
  createBarChart(analyserNode);
  shapeVisualization(analyserNode);
  return analyserNode;
}

// the function for the distortion curve is taken from stackoverflow
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

function Distortion(amount) {
  var k = typeof amount === "number" ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for (; i < n_samples; ++i) {
    x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}
