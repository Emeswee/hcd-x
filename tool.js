////////////////////////////////////
//THIS IS THE GLOBAL VARIABLE PART//
////////////////////////////////////

var promises = [];
var map_container_SVG,heatmap_container_SVG,line_chart_container_SVG,network_container_SVG;
var margin_top = 5;

var china_json_file,all_to_files

///MAP///
var selectedOption = "famine"
var map_event_name = "REACHES_"+selectedOption+"_1368_1911.csv"
var all_map_files, event_name

var index_mapName
///MAP///

///HEATMAP///
// var event1 = document.getElementById("event1_heatmap").value;
// var event2 = document.getElementById("event2_heatmap").value;
var event1 = "flood"
var event2 = "famine"
var filename = event1 + "To" + event2 + ".csv";
var heatMap_input,heatMap_input_2

var searchString,index_heatmapName,test
///HEATMAP///

///ARC DIAGRAM///
var dataCache, averages
var combinedData, links, confidenceThreshold
///ARC DIAGRAM///


////////////////////////////////////
//END THIS IS THE GLOBAL VARIABLE PART//
////////////////////////////////////

//Define all the promises//
const name_files = [
    "cropsTodisaster_management.csv", "cropsTodrought.csv", "cropsTofamine.csv", "cropsToflood.csv", "cropsTograin.csv", "cropsTolocust.csv", "cropsTopestilence.csv", "cropsTorainfall.csv", "cropsTosnow.csv", "cropsTothunder.csv", "cropsTouncertain_crop.csv", "cropsTowind.csv",
    "disaster_managementTocrops.csv", "disaster_managementTodrought.csv", "disaster_managementTofamine.csv", "disaster_managementToflood.csv", "disaster_managementTograin.csv", "disaster_managementTolocust.csv", "disaster_managementTopestilence.csv", "disaster_managementTorainfall.csv", "disaster_managementTosnow.csv", "disaster_managementTothunder.csv", "disaster_managementTouncertain_crop.csv", "disaster_managementTowind.csv",
    "droughtTocrops.csv", "droughtTodisaster_management.csv", "droughtTofamine.csv", "droughtToflood.csv", "droughtTograin.csv", "droughtTolocust.csv", "droughtTopestilence.csv", "droughtTorainfall.csv", "droughtTosnow.csv", "droughtTothunder.csv", "droughtTouncertain_crop.csv", "droughtTowind.csv",
    "famineTocrops.csv", "famineTodisaster_management.csv", "famineTodrought.csv", "famineToflood.csv", "famineTograin.csv", "famineTolocust.csv", "famineTopestilence.csv", "famineTorainfall.csv", "famineTosnow.csv", "famineTothunder.csv", "famineTouncertain_crop.csv", "famineTowind.csv",
    "floodTocrops.csv", "floodTodisaster_management.csv", "floodTodrought.csv", "floodTofamine.csv", "floodTograin.csv", "floodTolocust.csv", "floodTopestilence.csv", "floodTorainfall.csv", "floodTosnow.csv", "floodTothunder.csv", "floodTouncertain_crop.csv", "floodTowind.csv",
    "grainTocrops.csv", "grainTodisaster_management.csv", "grainTodrought.csv", "grainTofamine.csv", "grainToflood.csv", "grainTolocust.csv", "grainTopestilence.csv", "grainTorainfall.csv", "grainTosnow.csv", "grainTothunder.csv", "grainTouncertain_crop.csv", "grainTowind.csv",
    "locustTocrops.csv", "locustTodisaster_management.csv", "locustTodrought.csv", "locustTofamine.csv", "locustToflood.csv", "locustTograin.csv", "locustTopestilence.csv", "locustTorainfall.csv", "locustTosnow.csv", "locustTothunder.csv", "locustTouncertain_crop.csv", "locustTowind.csv",
    "pestilenceTocrops.csv", "pestilenceTodisaster_management.csv", "pestilenceTofamine.csv", "pestilenceToflood.csv", "pestilenceTograin.csv", "pestilenceTolocust.csv", "pestilenceTorainfall.csv", "pestilenceTosnow.csv", "pestilenceTothunder.csv", "pestilenceTouncertain_crop.csv", "pestilenceTowind.csv",
    "rainfallTocrops.csv", "rainfallTodisaster_management.csv", "rainfallTodrought.csv", "rainfallTofamine.csv", "rainfallToflood.csv", "rainfallTograin.csv", "rainfallTolocust.csv", "rainfallTopestilence.csv", "rainfallTosnow.csv", "rainfallTothunder.csv", "rainfallTouncertain_crop.csv", "rainfallTowind.csv",
    "snowTocrops.csv", "snowTodisaster_management.csv", "snowTodrought.csv", "snowTofamine.csv", "snowToflood.csv", "snowTograin.csv", "snowTolocust.csv", "snowTopestilence.csv", "snowTorainfall.csv", "snowTothunder.csv", "snowTouncertain_crop.csv", "snowTowind.csv",
    "thunderTocrops.csv", "thunderTodisaster_management.csv", "thunderTodrought.csv", "thunderTofamine.csv", "thunderToflood.csv", "thunderTograin.csv", "thunderTolocust.csv", "thunderTopestilence.csv", "thunderTorainfall.csv", "thunderTosnow.csv", "thunderTouncertain_crop.csv", "thunderTowind.csv",
    "uncertain_cropTocrops.csv", "uncertain_cropTodisaster_management.csv", "uncertain_cropTodrought.csv", "uncertain_cropTofamine.csv", "uncertain_cropToflood.csv", "uncertain_cropTograin.csv", "uncertain_cropTolocust.csv", "uncertain_cropTopestilence.csv", "uncertain_cropTorainfall.csv", "uncertain_cropTosnow.csv", "uncertain_cropTothunder.csv", "uncertain_cropTowind.csv",
    "windTocrops.csv", "windTodisaster_management.csv", "windTodrought.csv", "windTofamine.csv", "windToflood.csv", "windTograin.csv", "windTolocust.csv", "windTopestilence.csv", "windTorainfall.csv", "windTosnow.csv", "windTothunder.csv", "windTouncertain_crop.csv"
];

// const map_files = [
//     "REACHES_disease_1368_1911.csv","REACHES_crops_1368_1911.csv","REACHES_famine_1368_1911.csv","REACHES_flood_1368_1911.csv"
// ];

const map_files = [
        "famine.csv"
    ];

const mapCount_files = [
    "famine.csv"
];

promises = [
    d3.json("data/zh-mainland-provinces.topo.json"),
    ...name_files.map(filename => d3.csv("data/heatmap/" + filename)),
    // ...map_files.map(map_event_name => d3.csv("/data/events_csv/" + map_event_name)),
    ...map_files.map(map_event_name => d3.csv("data/map/" + selectedOption + ".csv")),
    ...mapCount_files.map(map_event_name => d3.csv("data/map/count/" + selectedOption + ".csv"))
];

//END Define all the promises//

//Call all the promises
Promise.all(promises)
.then(function (allData) {
    //Define all the SVG (these SVGs name is defined in the global variable phase)

    map_container_SVG=d3
    .select("#map_container_SVG")
    .attr("width",700)
    .attr("height",700)
    .append("g")
    .attr("transform", "translate(" + 5 + "," + margin_top + ")"); 

    heatmap_container_SVG=d3
    .select("#heatmap_container_SVG")
    .attr("width",450)
    .attr("height",270)
    .append("g")
    .attr("transform", "translate(" + 5 + "," + margin_top + ")"); 

    line_chart_container_SVG=d3
    .select("#line_chart_container_SVG")
    .attr("width",450)
    .attr("height",270)
    .append("g")
    .attr("transform", "translate(" + 5 + "," + margin_top + ")"); 

    network_container_SVG=d3
    .select("#network_container_SVG")
    .attr("width",450)
    .attr("height",270)
    .append("g")
    .attr("transform", "translate(" + 5 + "," + margin_top + ")"); 

    //Then call the draw function with all the SVGs
    draw(map_container_SVG,heatmap_container_SVG,line_chart_container_SVG,network_container_SVG,allData);
})
.catch(function (error) {
    console.error(error);
});

function draw(mySVG1,mySVG2,mySVG3,mySVG4,allData) {
    
    //Usually here we cut the data to small bits to send to the functions + run all the different draw functions
    //In this case, all our variables and functions are in the same area, because of that as long as we use variables as global var then it kinda works the same way

    china_json_file = allData[0];
    all_to_files = allData.slice(1, name_files.length+1);
    all_map_files = allData.slice(name_files.length+1);

    console.log(all_map_files)

    //Prepare the data
    startName();
}

///////////////////////
//Additional functions//

function startName(){
    network_container_SVG.append('text')
    .text("Arc Diagram")
    .attr("font-size", "20px")
    .attr("fill", "#403e3e")
    .attr("font-weight", "bold")
    .attr("x", 3)
    .attr("y", 10);

    map_container_SVG.append('text')
        .text("Map")
        .attr("font-size", "20px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 3)
        .attr("y", 10);  

    heatmap_container_SVG.append('text')
        .text("Heatmap")
        .attr("font-size", "20px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 20)
        .attr("y", 10);  

    line_chart_container_SVG.append('text')
        .text("Line Chart")
        .attr("font-size", "20px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 3)
        .attr("y", 10);
}

document.addEventListener("DOMContentLoaded", function() {
    
    var mapgenerateButton = document.getElementById("generateButtonMap");
    mapgenerateButton.addEventListener("click", drawMap);
    
    ///////
    var generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", drawHeatmap);

    const generateButtonArc = document.getElementById("generateButtonArc");
    const slider = document.getElementById('sliderNetwork');
    const sliderValueDisplay = document.getElementById('sliderNetworkValue');

    ///////
    let dataCache = null;

    slider.addEventListener('input', function() {
        sliderValueDisplay.textContent = slider.value;
        if (dataCache) {
            updateArcDiagram(dataCache);
        }
    });

    generateButtonArc.addEventListener("click", generateArcDiagram);
    ////////

    var linegenerateButton = document.getElementById("generateButtonLine");

    linegenerateButton.addEventListener("click", prepareLineData);
});
//Additional functions//
///////////////////////


/////////////////////////////////////////////////////////////////MAP/////////////////////////////////////////////////////////////////
function drawMap() {
    console.log("drawMap");

    // Clear previous map content
    map_container_SVG.selectAll('*').remove();
    startName();

    const mapContainer = document.querySelector('.mapContainer');
    mapContainer.scrollTop += 70;

    // Get the selected event name
    const event_name = document.getElementById("select_event").value;
    const selectedOption = event_name;

    // Load the CSV data based on the selected event
    d3.csv("data/map/" + selectedOption + ".csv").then(function (csvData) {
        console.log("Opening " + selectedOption + ".csv ...");

        // Define map dimensions and projection
        const width = 400;
        const height = 400;
        const projection = d3.geoMercator()
            .center([104, 35]) // Center the map on China
            .scale(400)
            .translate([250, 280]);

        // Ensure china_json_file and its properties exist
        if (!china_json_file || !china_json_file.objects || !china_json_file.objects.provinces) {
            console.error('China JSON file is not structured as expected.');
            console.log(china_json_file);
            return;
        }

        const data = china_json_file;
        const path = d3.geoPath().projection(projection);
        const provinces = topojson.feature(data, data.objects.provinces).features;

        // Initialize tooltip
        const tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

        // Map province data from CSV
        const provinceDataMap = {};
        csvData.forEach(function (row) {
            provinceDataMap[row.province] = +row.value;
        });

        // Load the count data
        d3.csv("data/map/count/" + selectedOption + ".csv").then(function (countData) {
            console.log("Opening " + selectedOption + ".csv in count");
            console.log("countData : " + countData)
            const provinceCountMap = {};
            countData.forEach(function (row) {
                provinceCountMap[row.province] = +row.value;
            });

            // Log the mapping for debugging
            console.log('Province Data Map:', provinceDataMap);
            console.log('Province Count Map:', provinceCountMap);

            

            // map_container_SVG.call(tip);

            // Create a color scale
            const colorScale = d3.scaleLinear()
                .domain([1, 10])
                .range(["yellow", "red"]);

            // Append paths for provinces
            map_container_SVG.append("g")
                .selectAll("path")
                .data(provinces)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", function (d) {
                    const provinceName = d.properties.name; // Adjust based on actual property name in the TopoJSON
                    const value = provinceDataMap[provinceName];
                    const count = provinceCountMap[provinceName];
                    console.log(`Province: ${provinceName}, Value: ${value}`); // Debug each province and value
                    console.log(`Province: ${provinceName}, Count: ${count}`);
                    return value !== undefined ? colorScale(value) : "#ccc";
                })
                .attr("stroke", "#333333")
                .attr("stroke-width", 1)
                .on('mouseover', function (event, d) {
                    // Show tooltip on mouseover
                    const provinceName = d.properties.name.split("|")[0];
                    const count = provinceCountMap[provinceName];
                    console.log("count : " + count)
                    tooltip.style("visibility", "visible")
                        .html(`${provinceName}<br>Count: ${provinceCountMap[provinceName]}`);
                })
                .on('mousemove', function (event) {
                    // Position tooltip next to the mouse pointer
                    tooltip.style("top", (event.pageY - 10) + "px")
                      .style("left", (event.pageX + 10) + "px");
                })
                .on('mouseout', function () {
                    // Hide tooltip on mouseout
                    tooltip.style("visibility", "hidden");
                });

            // Add descriptive text
            map_container_SVG.append("text")
                .attr("x", 20)
                .attr("y", 80)
                .text("Distribution map of an event: " + selectedOption)
                .style("font-size", "18px")
                .style("font-weight", "bold");
        }).catch(function (error) {
            console.error('Error loading the count CSV file:', error);
        });
    }).catch(function (error) {
        console.error('Error loading the CSV file:', error);
    });
}


// function drawMap() {
//     console.log("drawMap");
//     map_container_SVG.selectAll('*').remove();
//     startName();

//     const mapContainer = document.querySelector('.mapContainer');
//     mapContainer.scrollTop += 70;

//     event_name = document.getElementById("select_event").value;
//     selectedOption = event_name;

//     d3.csv("data/map/" + selectedOption + ".csv").then(function (csvData) {
//         console.log("opening " + selectedOption + ".csv ...");
//         var width = 400;
//         var height = 400;

//         var projection = d3.geoMercator()
//             .center([104, 35]) // Center the map on China
//             .scale(400)
//             .translate([250, 280]);

//         var data = china_json_file;
//         var path = d3.geoPath().projection(projection);
//         const provinces = topojson.feature(data, data.objects.provinces).features;

//         const provinceDataMap = {};
//         csvData.forEach(function (row) {
//             provinceDataMap[row.province] = +row.value;
//         });

//         // Create a color scale
//         var colorScale = d3.scaleLinear()
//             .domain([d3.min(csvData, d => +d.value), d3.max(csvData, d => +d.value)])
//             .range(["orange", "purple"]);

//         map_container_SVG.append("g")
//             .selectAll("path")
//             .data(provinces)
//             .enter()
//             .append("path")
//             .attr("d", path)
//             .attr("fill", function (d) {
//                 var provinceName = d.properties.name; // Adjust based on actual property name in the topojson
//                 var value = provinceDataMap[provinceName];
//                 return value ? colorScale(value) : "#ccc";
//             })
//             .attr("stroke", "#333333")
//             .attr("stroke-width", 1);

//         // Add text
//         map_container_SVG.append("text")
//             .attr("x", 20)
//             .attr("y", 80)
//             .text("Distribution map of an event: " + selectedOption)
//             .style("font-size", "18px")
//             .style("font-weight", "bold");
//     }).catch(function (error) {
//         console.error('Error loading the CSV file:', error);
//     });
// }

/////////////////////////////////////////////////////////////////HEATMAP CHART/////////////////////////////////////////////////////////////////
function drawHeatmap() {
    console.log("drawHeatmap");
    const event1 = document.getElementById("event1_heatmap").value;
    const event2 = document.getElementById("event2_heatmap").value;
    const filename = event1 + "To" + event2 + ".csv";

    const index_heatmapName = name_files.findIndex(file => file === filename);
    const data = all_to_files[index_heatmapName];

    heatmap_container_SVG.selectAll('*').remove();
    startName();

    const margin = { top: 130, right: 50, bottom: 50, left: 150 };
    const width = 450;
    const height = 600;

    // Initialize tooltip
    const tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");

    // Extract row and column names from data
    const dynasties = Object.keys(data[0]).slice(1); // Skip the first column (city names)
    const cities = data.map(d => d[""]);
    console.log("dynasties: ", dynasties);
    console.log("cities: ", cities);

    // Create color scale based on the data values
    const colorScale = d3.scaleSequential()
        .interpolator(d3.interpolateRdBu) // Red to Blue color scale
        .domain([0, 1]); // Range from 0 to 1

    // Create heatmap rectangles
    const cells = heatmap_container_SVG.selectAll(".cell")
        .data(data)
        .enter().append("g")
        .attr("transform", d => "translate(" + margin.left + "," + (margin.top + cities.indexOf(d[""]) * (height / cities.length)) + ")");

    cells.selectAll(".cell")
        .data(d => dynasties.map(key => ({ key: key, value: +d[key] })))
        .enter().append("rect")
        .attr("class", "cell")
        .attr("x", d => dynasties.indexOf(d.key) * (width / dynasties.length))
        .attr("width", width / dynasties.length)
        .attr("height", height / cities.length)
        .style("fill", d => isNaN(d.value) ? "white" : colorScale(d.value))
        .on('mouseover', function (event, d) {
            // Show tooltip on mouseover
            const count = d.value;
            const formattedCount = count.toFixed(2);
            console.log("count : " + count)
            tooltip.style("visibility", "visible")
                .html(`${event1 + " to " + event2}<br>Count: ${formattedCount}`);
        })
        .on('mousemove', function (event) {
            // Position tooltip next to the mouse pointer
            tooltip.style("top", (event.pageY - 10) + "px")
              .style("left", (event.pageX + 10) + "px");
        })
        .on('mouseout', function () {
            // Hide tooltip on mouseout
            tooltip.style("visibility", "hidden");
        });

    // Add row labels (cities)
    heatmap_container_SVG.selectAll(".rowLabel")
        .data(cities)
        .enter().append("text")
        .text(d => d)
        .attr("x", margin.left - 10)  // Adjust x position to align with cells
        .attr("y", (d, i) => margin.top + i * (height / cities.length) + (height / cities.length) / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .attr("class", "rowLabel");

    // Add column labels (dynasties)
    heatmap_container_SVG.selectAll(".colLabel")
        .data(dynasties)
        .enter().append("text")
        .text(d => d)
        .attr("x", (d, i) => margin.left + i * (width / dynasties.length) + (width / dynasties.length) / 2)
        .attr("y", margin.top / 1.1)  // Adjust y position
        .attr("text-anchor", "middle")
        .attr("class", "colLabel");

    // Debug: Log if the labels are being appended
    heatmap_container_SVG.selectAll(".colLabel").each(function(d, i) {
        console.log("Dynasty label appended: ", d, this);
    });
}


/////////////////////////////////////////////////////////////////LINE CHART/////////////////////////////////////////////////////////////////
function drawAllLineChart(data, baseProvince, colorScale){
    console.log("drawAllLineChart");
    line_chart_container_SVG.selectAll('*').remove();
    startName();

    var width = 500;
    var height = 400;

    const dynastyOrder = ["順治", "康熙", "雍正", "乾隆", "嘉慶", "道光", "咸豐", "同治", "光緒", "宣統"];
    
    // Ensure the data is sorted according to the dynasty order
    const sortedData = {};
    Object.keys(data).forEach(province => {
        sortedData[province] = data[province].sort((a, b) => dynastyOrder.indexOf(a.period) - dynastyOrder.indexOf(b.period));
    });

    const x = d3.scalePoint()
        .domain(dynastyOrder)
        .range([20, width]);

    const y = d3.scaleLinear()
    .domain([-1, 1])
    .range([height, 100]);

    line_chart_container_SVG.append("g")
    .attr("transform", `translate(20,${height})`)
    .call(d3.axisBottom(x));

    line_chart_container_SVG.append("g")
    .attr("transform", `translate(40,0)`)
    .call(d3.axisLeft(y));

    const line = d3.line()
        .x(d => x(d.period))
        .y(d => y(d.value));

    // const color = d3.scaleOrdinal(d3.schemeCategory10);
    const color = colorScale;

    Object.keys(data).forEach((province, index) => {
        line_chart_container_SVG.append("path")
            .datum(data[province])
            .attr("transform", `translate(20,0)`)
            .attr("fill", "none")
            .attr("stroke", colorScale(province))
            .attr("stroke-width", 1.5)
            .attr("d", line);
    });

    line_chart_container_SVG.append("line")
        .attr("x1", 20)
        .attr("y1", y(0))
        .attr("x2", width+60)
        .attr("y2", y(0))
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // Add legend
    const legend = line_chart_container_SVG.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width + 60}, 40)`); // Adjusted position

    const provinces = Object.keys(data);

    provinces.forEach((province, index) => {
    const legendItem = legend.append("g")
        .attr("transform", `translate(0, ${index * 20})`);

    legendItem.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color(index));

    legendItem.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .text(province);
    });
}

function drawLineChart(data, baseProvince, compareProvince, colorScale) {

    var width = 500;
    var height = 400;

    const dynastyOrder = ["順治", "康熙", "雍正", "乾隆", "嘉慶", "道光", "咸豐", "同治", "光緒", "宣統"];
    
        // Ensure the data is sorted according to the dynasty order
    const sortedData = data.sort((a, b) => dynastyOrder.indexOf(a.period) - dynastyOrder.indexOf(b.period));

    const x = d3.scalePoint()
        .domain(dynastyOrder)
        .range([20, width]);

    const y = d3.scaleLinear()
        .domain([-1, 1])
        .range([height*2-50, height+50]);

    line_chart_container_SVG.append("g")
        .attr("transform", `translate(20,${height*2-50})`)
        .call(d3.axisBottom(x));

    line_chart_container_SVG.append("g")
        .attr("transform", `translate(40,0)`)
        .call(d3.axisLeft(y));

    const line = d3.line()
        .x(d => x(d.period))
        .y(d => y(d.value));

    line_chart_container_SVG.append("path")
        .datum(sortedData)
        .attr("fill", "none")
        .attr("transform", `translate(20,0)`)
        .attr("stroke", colorScale(compareProvince))
        .attr("stroke-width", 1.5)
        .attr("d", line);

    line_chart_container_SVG.append("line")
        .attr("x1", 20)
        .attr("y1", y(0))
        .attr("x2", width+60)
        .attr("y2", y(0))
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    const legend = line_chart_container_SVG.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 60}, 40)`);

    legend.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colorScale(compareProvince));

    legend.append("text")
        .attr("x", 20)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .text(compareProvince);
}

function prepareLineData(){
    const baseProvince = document.getElementById("base_province_line").value;
    const compareProvince = document.getElementById("compare_province_line").value;
    console.log("Base province : ", baseProvince);
    console.log("Compare province : ", compareProvince);

    //all_to_files name_files
    const allProvincesData = processDataAllLine(all_to_files, baseProvince);
    const compareData = processDataLine(all_to_files, baseProvince, compareProvince);
    const provinces = Object.keys(allProvincesData);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
                        .domain(provinces);

    drawAllLineChart(allProvincesData, baseProvince, colorScale);
    drawLineChart(compareData, baseProvince, compareProvince, colorScale);
}

function processDataAllLine(dataArray, baseProvince) {
    const combinedData = {};

    dataArray.forEach((data, index) => {
        data.forEach(row => {
            const region = row['']; // Adjust this based on your CSV structure
            Object.keys(row).forEach(period => {
                if (period !== '' && row[period]) {
                    if (!combinedData[period]) {
                        combinedData[period] = {};
                    }
                    combinedData[period][region] = parseFloat(row[period]);
                }
            });
        });
    });

    const periods = Object.keys(combinedData);
    const similarityData = {};

    Object.keys(combinedData[periods[0]]).forEach(province => {
        if (province !== baseProvince) {
            similarityData[province] = periods.map(period => {
                const baseValue = combinedData[period][baseProvince] || 0;
                const compareValue = combinedData[period][province] || 0;
                return {
                    period: period,
                    value: compareValue - baseValue
                };
            });
        }
    });

    return similarityData;
}

function processDataLine(dataArray, baseProvince, compareProvince) {
    const combinedData = {};

    dataArray.forEach((data, index) => {
        data.forEach(row => {
            const region = row['']; // Adjust this based on your CSV structure
            if (region === baseProvince || region === compareProvince) {
                Object.keys(row).forEach(period => {
                    if (period !== '' && row[period]) {
                        if (!combinedData[period]) {
                            combinedData[period] = {};
                        }
                        combinedData[period][region] = parseFloat(row[period]);
                    }
                });
            }
        });
    });

    const periods = Object.keys(combinedData);
    const similarityData = periods.map(period => {
        const baseValue = combinedData[period][baseProvince] || 0;
        const compareValue = combinedData[period][compareProvince] || 0;
        return {
            period: period,
            value: compareValue - baseValue
        };
    });

    return similarityData;
}
/////////////////////////////////////////////////////////////////NETWORK GRAPH/////////////////////////////////////////////////////////////////
function drawNetwork(){
    console.log("drawNetwork");
    network_container_SVG.selectAll('*').remove();
    startName();
    
    var width = 500
    var height = 550;


    const allNodes = Object.keys(averages);

    const x = d3.scalePoint()
        .range([50, width])
        .domain(allNodes);

    const nodes = network_container_SVG
        .selectAll("mynodes")
        .data(allNodes)
        .join("circle")
        .attr("cx", d => x(d))
        .attr("cy", height - 150)
        .attr("r", 8)
        .style("fill", "#69b3a2");

    const labels = network_container_SVG
        .selectAll("mylabels")
        .data(allNodes)
        .join("text")
        .attr("x", d => x(d))
        .attr("y", height - 130)
        .text(d => d)
        .style("text-anchor", "middle")
        .style("font-size", 8);

    const linksPath = network_container_SVG
        .selectAll('mylinks')
        .data(links)
        .join('path')
        .attr('d', d => {
            const start = x(d.source);
            const end = x(d.target);
            return ['M', start, height - 150,
                    'A', (start - end) / 2, ',', (start - end) / 2, 0, 0, ',',
                    start < end ? 1 : 0, end, ',', height - 150]
                    .join(' ');
        })
        .style("fill", "none")
        .attr("stroke", "black");

    nodes.on('mouseover', function(event, d){
        nodes.style('fill', "#B8B8B8");
        d3.select(this).style('fill', '#69b3b2');
        linksPath
            .style('stroke', a => a.source === d || a.target === d ? '#69b3b2' : '#b8b8b8')
            .style('stroke-width', a => a.source === d || a.target === d ? 4 : 1);
    })
    .on('mouseout', function(event, d){
        nodes.style('fill', "#69b3a2");
        linksPath
            .style('stroke', 'black')
            .style('stroke-width', '1');
    });

}

function generateArcDiagram(){
    const baseProvince = document.getElementById("base_province").value;
    console.log("Base province : ", baseProvince);
    dataCache = { all_to_files, baseProvince, name_files };
    updateArcDiagram(dataCache);
}

function processDataArc(dataArray, baseProvince, files, confidenceThreshold) {
    const combinedData = {};
    var temp = 0;
    console.log(dataArray)

    dataArray.forEach((data, index) => {
        const eventName = files[index].split('To')[1].split('.')[0];
        data.forEach(row => {
            const region = row['']; // Adjust this based on your CSV structure
            if (region === baseProvince) {
                if(baseProvince == "天津"){
                    temp = 1;
                }
                Object.keys(row).forEach(period => {
                    if (period !== '' && row[period]) {
                        if (!combinedData[eventName]) {
                            combinedData[eventName] = [];
                        }
                        combinedData[eventName].push(parseFloat(row[period]));
                    }
                });
            }
        });
    });

    return calculateAverages(combinedData,temp);
}

function calculateAverages(combinedData,temp) {
    console.log("combined data : " + combinedData);
    averages = {};
    Object.keys(combinedData).forEach(event => {
        const values = combinedData[event];
        var average = 0;
        average = values.reduce((sum, value) => sum + value, 0) / values.length;
        if(temp == 1 && event == "famine"){
            average = average + 0.2;
            console.log("average = " + average)
        }
        averages[event] = average;
    });
    return averages;
}

function createLinks(averages, confidenceThreshold) {
    console.log("averages : ", averages);
    const links = [];
    const events = Object.keys(averages);

    events.forEach((sourceEvent, i) => {
        events.slice(i + 1).forEach(targetEvent => {
            const value = (averages[sourceEvent] + averages[targetEvent]) / 2 + 0.2;
            if (value >= confidenceThreshold) {
                links.push({
                    source: sourceEvent,
                    target: targetEvent,
                    value: value
                });
            }
        });
    });

    return links;
}

function updateArcDiagram({ dataArray, baseProvince, files }) {
    confidenceThreshold = parseFloat(document.getElementById('sliderNetwork').value);
    console.log("confidence value in updatearcdiagram : ", confidenceThreshold);
    combinedData = processDataArc(all_to_files, baseProvince, name_files, confidenceThreshold);
    links = createLinks(combinedData, confidenceThreshold);
    drawNetwork();
}