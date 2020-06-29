// global variables
var svgShaper, svgShaper2, svg1Height, svg1Width, svg2Height, svg2Width;

function createCircleChart(analyserNode) {
  /*creates svg environment and calls visualization function*/

  // initialize properties
  (svg1Height = 1700), (svg1Width = 2300);
  // (svg2Height = 200), (svg2Width = 200);

  // append svg to div first svg
  svgShaper = d3
    .select(".circle-chart")
    .append("svg")
    .attr("id", "shape-svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 5600 4000")
    .classed("svg-content", true);
  // .attr("height", svg1Height)
  // .attr("width", svg1Width);

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

  // scale for radius
  var scaleRadius = d3
    .scaleLinear()
    .domain([0, d3.max(waveLengthArray)])
    .range([0, svg2Height]);

  // first colorscale
  var scaleHue1 = d3
    .scaleLinear()
    .domain([0, d3.max(waveLengthArray)])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#b4585d"), d3.rgb("FFB16A")]);
  177, 147, 123;

  // second colorscale
  var scaleHue2 = d3
    .scaleLinear()
    .domain([0, d3.max(waveLengthArray)])
    .range([300, 400]);

  // update first cirlce chart with data
  var circles = svgShaper
    .selectAll("circle")
    .data(waveLengthArray)
    .enter()
    .append("circle")
    .attr("r", function (d) {
      return d * 7;
    })
    .attr("cx", svg1Width - 100)
    .attr("cy", svg1Height - 100)
    .attr("fill", "none")
    .attr("stroke-width", 0.2)
    .attr("stroke-opacity", 0.6)
    // .attr("stroke", function (d) {
    //   return d3.hsl(scaleHue1(d), 1.2, 3);
    // });
    .style("stroke", "black");
}
