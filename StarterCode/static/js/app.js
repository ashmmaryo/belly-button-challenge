// Import data from url
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

// Display the default plots
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        // An array of id names
        let names = data.names;
        // Iterate through the names Array
        names.forEach((name) => {
            // Append each name as an option to the drop down menu
            // This is adding each name to the html file as an option element with value = a name in the names array
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // Assign the first name to name variable
        let name = names[0];
        // Call the functions to make the demographic panel, bar chart, and bubble chart
        demo(name);
        bar(name);
        bubble(name);
        gauge(name);
    });
}


// Make the demographics info
function demo(selectValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        // An array of metadata objects
        let metadata = data.metadata;
        // Filter data where id = selected value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.id == selectValue);
        // Assign the first object to obj variable
        let obj = filteredData[0]
        // Clear the child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
        // Object.entries() is a built-in method in JavaScript 
        // This returns an array of a given object's own enumerable property [key, value]
        let entries = Object.entries(obj);
        // Iterate through the entries array
        // Add a h5 child element for each key-value pair to the div with id sample-metadata
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(entries);
    });
  }

  
/// Making of chartss///
// function for creating bar chart
function bar(selectValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of sample objects
        let samples = data.samples;

        // Filter data where id = select value 
        let filteredData = samples.filter((sample) => sample.id === selectValue);

        // Assign the first object to obj variable
        let obj = filteredData[0];
        
        // Trace for the data for the horizontal bar chart
        let trace = [{
            // Slice the top 10 otus
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(0, 102, 204)"
            },
            orientation: "h"
        }];

        //set labels for chart and axes
        let layout = {
            title: {
                text: `<b>Top 10 OTU_IDS for Sample #${selectValue}`, font: {size: 24}
            },
            xaxis: {
                title: {
                    text: "Count"
                }
            }
        }

        // Data array
        let barData = [trace]
        
        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", trace, layout);
    });
}
  


// Make the bubble chart
function bubble(selectValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {

        // An array of sample objects
        let samples = data.samples;
    
        // Filter data where id = select value 
        let filteredData = samples.filter((sample) => sample.id === selectValue);
    
        // Assign the first object to obj variable
        let obj = filteredData[0];
        
        // Trace for the data for the bubble chart
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Jet"
            }
        }];
    
        // Apply the x-axis lengend to the layout
        let layout = {
            title: {
                text: `<b>Microbial Belly Button Population for Sample #${selectValue}`
            },
            xaxis: {title: "OTU ID"},
            yaxis: {title: "COUNT"},
        };
    
        // Use Plotly to plot the data in a bubble chart
        Plotly.newPlot("bubble", trace, layout);
    });
}

// Make the gauge chart 
function gauge(selectValue) {
    // Fetch the JSON data and console log it 
    d3.json(url).then((data) => {
        // An array of metadata objects
        let metadata = data.metadata;
        
        // Filter data where id = select value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.id == selectValue);
      
        // Assign the first object to obj variable
        let obj = filteredData[0]

        // Define a function to create a gradient
        function interpolateColor(value) {
            // Use d3.interpolate to create a color gradient from white to green
            return d3.interpolateRgb("white", "green")(value / 10);
        }

        // Trace for the data for the gauge chart
        let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
            type: "indicator", 
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 10] },
                bar: { color: "rgb(0, 100, 0)" },
                steps: Array.from({ length: 10 }, (_, i) => ({
                    range: [i, i + 1],
                    color: interpolateColor(i + 0.7) // Use midpoint for better gradient
                }))
            },
            threshold: {
                line: { color: "red", width: 3 },
                thickness: .75,
                value: selectValue[0].wfreq,
                visible: true,
            }
        }];

         // Use Plotly to plot the data in a gauge chart
         Plotly.newPlot("gauge", trace);
    });
}

// Toggle to new plots when option changed
function optionChanged(selectValue) {
    demo(selectValue);
    bar(selectValue);
    bubble(selectValue);
    gauge(selectValue)
}

init();