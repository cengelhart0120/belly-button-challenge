// 1. Use the D3 library to read in samples.json from the URL
// https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

// Setting the endpoint url
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetching the JSON data and console logging it
d3.json(url).then(function(samples) {
    console.log(samples);
});

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // Use `sample_values` as the values for the bar chart.
    // Use `otu_ids` as the labels for the bar chart.
    // Use `otu_labels` as the hovertext for the chart.

// Sorting the data by `sample_values` results descending
//let sortedByGreekSearch = searchResults.sort((a, b) => b.greekSearchResults - a.greekSearchResults);

// Reversing the array to accommodate Plotly's defaults
//slicedData.reverse();

// Trace1 for the Greek Data
//let trace1 = {
//  x: slicedData.map(object => object.greekSearchResults),
//  y: slicedData.map(object => object.greekName),
//  text: slicedData.map(object => object.greekName),
//  name: "Greek",
//  type: "bar",
//  orientation: "h"
//};

// Data array
//let data = [trace1];

// Apply a title to the layout
//let layout = {
//  title: "Greek gods search results",
//  margin: {
//    l: 100,
//    r: 100,
//    t: 100,
//    b: 100
//  }
//};

// Render the plot to the div tag with id "plot"
//Plotly.newPlot("plot", data, layout);