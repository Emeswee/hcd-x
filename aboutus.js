var promises = [];
var aboutUs_SVG;
var margin_top = 5;


promises = [
    d3.json("data/zh-mainland-provinces.topo.json")
];

Promise.all(promises)
.then(function (allData) {
    //Define all the SVG (these SVGs name is defined in the global variable phase)

    aboutUs_SVG=d3
    .select("#aboutUs_SVG")
    .attr("width",1800)
    .attr("height",700)
    .append("g")
    .attr("transform", "translate(" + 5 + "," + margin_top + ")"); 

    //Then call the draw function with all the SVGs
    draw_aboutUs();
})
.catch(function (error) {
    console.error(error);
});

function draw_aboutUs(){

    aboutUs_SVG.append('text')
        .text("About Us")
        .attr("font-size", "35px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 3)
        .attr("y", 40);
    
    aboutUs_SVG.append('text')
        .text("This tool and website is created for 2023-2024 大三專題 project from National Taiwan Normal University.")
        .attr("font-size", "20px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 3)
        .attr("y", 75);

    aboutUs_SVG.append('text')
        .text("Special thanks to Professor 王科植 as our 專題 advisor.")
        .attr("font-size", "20px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 3)
        .attr("y", 105);
}