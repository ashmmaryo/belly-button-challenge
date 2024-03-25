# belly-button-challenge

In this repository, we delve into the Belly Button Biodiversity Database, an investigation into one of the most diverse and enigmatic ecosystems on the planet: the human belly button. The research leverages taxonomic data obtained from belly button swabs of 152 individuals to analyze the populations of different microorganisms. It aims to determine how variables like the frequency of belly button washing per week influence the diversity and distribution of these microbes. The JSON dataset can be found on index.html.

By using a dropdown menu, users can select a research subject's ID number to view specific data, including:

Demographic information like ethnicity, age, gender, location, and belly button type (innie/outie), along with how often they wash their belly buttons.
A bar graph showing the top 10 microbes found in the sample by population.
A bubble chart displaying all observed microbes, with the size and color of bubbles indicating their population and taxonomy.
A gauge chart depicting the subjects' belly button wash frequency.

Summary:

This analysis uses JavaScript, D3.js, and Plotly to create interactive charts and facilitate data exploration via the website. The code for this project is contained in the index.html and app.js files, with CSS adapted from provided code.

Method:

The app.js file begins by defining a constant for the URL of the JSON file from the biodiversity database. It includes functions such as init, getMetaData, drawBar, drawBubble, drawGauge, and optionChanged. The init function initializes the page, populating a dropdown menu with sample IDs. The getMetaData function retrieves metadata for the selected sample, while drawBar, drawBubble, and drawGauge generate corresponding visualizations based on the selected sample.

Function Details:

The getMetaData function filters the JSON data based on the selected sample ID and displays the metadata. drawBar generates a horizontal bar chart displaying the top ten OTUs (Operational Taxonomic Units) for the selected sample. drawBubble creates a bubble chart showing all OTUs observed in the sample, with marker size and color representing sample values and IDs. drawGauge produces a gauge chart illustrating the washing frequency of the selected sample.

Interactivity:

The optionChanged function enables user interaction by updating visualizations based on the selected sample ID from the dropdown menu. It refreshes metadata and all visualizations when a new sample is chosen, enhancing the exploratory experience.
