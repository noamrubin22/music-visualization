function startLineContext(analyserNode) {
  /* creates svg and calls linegraph function */

  // graph dimensions
  (margin = { top: 30, right: 20, bottom: 30, left: 50 }),
    (width = 450 - margin.left - margin.right),
    (height = 280 - margin.top - margin.bottom);

  // append svg
  svg_div = d3
    .select(".svgLine")
    .append("svg")
    .attr("id", "line-graph")
    .attr("width", width)
    .attr("height", height);

  createLinegraph(analyserNode);
}

function createLinegraph(analyserNode) {
  /* creates line that changes with wavelength*/

  // update circlechart constantly
  window.requestAnimationFrame(function () {
    createLinegraph(analyserNode);
  });

  // remove line
  d3.select(".line").remove();

  // substract frequencies
  wavelengthArray = new Uint8Array(analyserNode.frequencyBinCount);

  // copy frequency data into array
  analyserNode.getByteTimeDomainData(wavelengthArray);

  // Set scale ranges
  var x = d3
    .scaleLinear()
    .domain([0, wavelengthArray.length])
    .range([0, width]);

  var y = d3.scaleLinear().domain([0, 255]).range([height, 0]);

  // define the line
  var line = d3
    .line()
    .x(function (d, i) {
      return x(i);
    })
    .y(function (d) {
      return y(d);
    })
    .curve(d3.curveMonotoneX);

  // append line
  svg_div.append("path").attr("class", "line").attr("d", line(wavelengthArray));
}
