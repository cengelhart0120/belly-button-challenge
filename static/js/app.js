// Setting the endpoint url
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Creating an empty global object to hold the .json data
var data = {};

// Fetching .json data and defining the "init()" function
async function init() {
  data = await d3.json(url);

  // Calling loadDropdownList (defined below, outsided of init())
  loadDropdownList(data);

  // Displaying default plots/info using the first test subject (index = 0)
  let defaultData = data.samples[0];
  let defaultMetadata = data.metadata[0];
   
  // Top 10 slices for bar chart, reveresed to account for Plotly defaults
  let topTenIds = defaultData.otu_ids.slice(0, 10).map(i => 'OTU ' + i).reverse();
  let topTenVals = defaultData.sample_values.slice(0, 10).reverse();
  let topTenLabels = defaultData.otu_labels.slice(0, 10).reverse();

  // Trace for bar chart
  let trace1 = {
    x: topTenVals,
    y: topTenIds,
    text: topTenLabels,
    type: 'bar',
    orientation: 'h'
  };

  // Data array for bar chart
  let data1 = [trace1];

  // Rendering the plot to the div tag with id "bar"
  Plotly.newPlot("bar", data1);

  // Trace for bubble chart
  let trace2 = {
    x: defaultData.otu_ids,
    y: defaultData.sample_values,
    text: defaultData.otu_labels,
    mode: "markers",
    marker: {
      color: defaultData.otu_ids,
      size: defaultData.sample_values
    }
  };

  // Data array for bubble chart
  let data2 = [trace2];

  // Applying a title to the x-axis
  let layout2 = {
      xaxis: {
        title: "OTU ID"
      }
  };

  // Rendering the plot to the div with id "bubble"
  Plotly.newPlot("bubble", data2, layout2);

  // Function to display sample metadata key-value pairs
  function displaySampleMetadata() {
    var displayDiv = document.getElementById("sample-metadata");
    displayDiv.innerHTML = ""; // Clearing previous content

    for (var key in defaultMetadata) {
      if (defaultMetadata.hasOwnProperty(key)) {
        var keyValueDiv = document.createElement("div");
        keyValueDiv.textContent = key + ": " + defaultMetadata[key];
        displayDiv.appendChild(keyValueDiv);
      }
    }
  };

  // Calling the function to display sample metadata
  displaySampleMetadata();

  // Data array for gauge chart
  let data3 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: defaultMetadata.wfreq,
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [0, 9]}
      }
    }
  ];

  // Layout options for gauge chart
  let layout3 = {
    title: "Belly Button Washing Frequency",
    annotations: [
      {
        text: "Scrubs per Week",
        showarrow: false,
        x: 0.5,
        y: 1.1,
        xref: 'paper',
        yref: 'paper',
        xanchor: 'center',
        yanchor: 'top',
        font: {size: 14}
      }
    ]
  };

  // Rendering the plot to the div with id "gauge"
  Plotly.newPlot("gauge", data3, layout3);

};

// Defining loadDropdownList function
function loadDropdownList(data){
  var select = document.getElementById("selDataset");
  data.samples.forEach((element) => {
    var el = document.createElement("option");
    el.textContent = element.id;
    el.value = element.id;
    select.appendChild(el);
  });
};

// Defining optionChanged function
async function optionChanged(incomingId){
  let sample = data.samples.find((f) => f.id === incomingId);
  let index = data.samples.findIndex((f) => f.id === incomingId);
  let sampleMetadata = data.metadata[index];

  let topTenIds = sample.otu_ids.slice(0, 10).map(i => 'OTU ' + i).reverse();
  let topTenVals = sample.sample_values.slice(0, 10).reverse();
  let topTenLabels = sample.otu_labels.slice(0, 10).reverse();

  // Trace for bar chart
  let trace1 = {
    x: topTenVals,
    y: topTenIds,
    text: topTenLabels,
    type: 'bar',
    orientation: 'h'
  };

  // Data array for bar chart
  let data1 = [trace1];

  // Rendering the plot to the div tag with id "bar"
  Plotly.newPlot("bar", data1);

  // Trace for bubble chart
  let trace2 = {
    x: sample.otu_ids,
    y: sample.sample_values,
    text: sample.otu_labels,
    mode: "markers",
    marker: {
      color: sample.otu_ids,
      size: sample.sample_values
    }
  };

  // Data array for bubble chart
  let data2 = [trace2];

  // Applying a title to the x-axis
  let layout2 = {
    xaxis: {
      title: "OTU ID"
    }
  };

  // Rendering the plot to the div with id "bubble"
  Plotly.newPlot("bubble", data2, layout2);

  // Function to display sample metadata key-value pairs
  function displaySampleMetadata() {
    var displayDiv = document.getElementById("sample-metadata");
    displayDiv.innerHTML = ""; // Clearing previous content

    for (var key in sampleMetadata) {
      if (sampleMetadata.hasOwnProperty(key)) {
        var keyValueDiv = document.createElement("div");
        keyValueDiv.textContent = key + ": " + sampleMetadata[key];
        displayDiv.appendChild(keyValueDiv);
      }
    }
  }

  // Calling the function to display sample metadata
  displaySampleMetadata();

  // Data array for gauge chart
  let data3 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: sampleMetadata.wfreq,
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [0, 9]}
      }
    }
  ];

  // Layout options for gauge chart
  let layout3 = {
    title: "Belly Button Washing Frequency",
    annotations: [
      {
        text: "Scrubs per Week",
        showarrow: false,
        x: 0.5,
        y: 1.1,
        xref: 'paper',
        yref: 'paper',
        xanchor: 'center',
        yanchor: 'top',
        font: {size: 14}
      }
    ]
  };

  // Rendering the plot to the div with id "gauge"
  Plotly.newPlot("gauge", data3, layout3);

};

init();