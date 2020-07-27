// global variables
let svgShaper, svgShaper2, svg1Height, svg1Width, svg2Height, svg2Width;
let ratio = 6.5;

const MOBILE_RATIO = 1.7;
const DESKTOP_RATIO = 5.5;

function setDimensions() {
  svg1Height = window.outerHeight;
  svg1Width = window.outerWidth;
}
function setRatio() {
  let windowWidth = window.outerWidth;
  if (windowWidth < 600) {
    ratio = MOBILE_RATIO;
  } else {
    ratio = DESKTOP_RATIO;
  }
}

window.addEventListener("resize", function () {
  setDimensions();
  setRatio();
});

setRatio();
setDimensions();
function createCircleChart(analyserNode) {
  /*creates svg environment and calls visualization function*/
  // append svg to div first svg
  svgShaper = d3
    .select(".circle-chart")
    .append("svg")
    .attr("id", "shape-svg")
    // .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("height", svg1Height)
    .attr("width", svg1Width)
    .attr("viewBox", `0 0 ${svg1Width} ${svg1Height}`)
    .classed("svg-content", true)
    .attr("height", svg1Height)
    .attr("width", svg1Width);

  // call create shapechart function
  shapeVisualization(analyserNode);
}

/*creates two wavelength visualizations*/
function shapeVisualization(analyserNode) {
  // remove drawn circles
  d3.selectAll("circle").remove();

  // update circlechart constantly
  window.requestAnimationFrame(function () {
    shapeVisualization(analyserNode);
  });

  // substract frequencies
  waveLengthArray = new Uint8Array(analyserNode.frequencyBinCount);

  // copy wavelength data to array
  analyserNode.getByteTimeDomainData(waveLengthArray);

  // update first cirlce chart with data
  var circles = svgShaper
    .selectAll("circle")
    .data(waveLengthArray)
    .enter()
    .append("circle")
    .attr("r", function (d) {
      return d * ratio;
    })
    .attr("cx", svg1Width)
    .attr("cy", svg1Height / 2)
    .attr("fill", "none")
    .attr("stroke-width", 0.4)
    .attr("stroke-opacity", 0.2)
    // .attr("stroke", function (d) {
    //   return d3.hsl(scaleHue1(d), 1.2, 3);
    // });
    .style("stroke", "yellow");
}
