// 1. Use the D3 library to read in samples.json from the URL
// https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

// Setting the endpoint url
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetching the JSON data
const urlDataPromise = d3.json(url);
console.log("Data promise: ", urlDataPromise);
d3.json(url).then(function(urlData) {
    //console.log(urlData);

    // Displaying default plots/info using test subject no. 940
    function init() {

        let i = 0;
        let defaultData = urlData.samples[i];
        let defaultMetadata = urlData.metadata[i];
        //console.log(defaultMetadata.wfreq);
    
        let topTenIds = defaultData.otu_ids.slice(0, 10).map(j => 'OTU ' + j).reverse();
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
        }

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
                    axis: {range: [0, 9]}//,
                    //steps: [
                      //  {range: [0, 4.5], color: "red"},
                        //{range: [4.5, 9], color: "green"}
                    //]
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

        // Rendering the plot to the div with id "bubble"
        Plotly.newPlot("gauge", data3, layout3);

    };

    init();

});