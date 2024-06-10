export function downloadCSV(file) {
    const link = document.createElement('a');
    link.href = file;
    link.download = file;
    link.click();
}


var promises = [];
var left_container_SVG, right_container_SVG;

var margin_top = 5;


promises = [
    
    d3.json("data/zh-mainland-provinces.topo.json")
];

Promise.all(promises)
.then(function (allData) {
    //Define all the SVG (these SVGs name is defined in the global variable phase)

    left_container_SVG=d3
    .select("#left_container_SVG")
    .attr("width",800)
    .attr("height",700)
    .append("g")
    .attr("transform", "translate(" + 5 + "," + margin_top + ")"); 

    right_container_SVG=d3
    .select("#right_container_SVG")
    .attr("width",800)
    .attr("height",1050)
    .append("g")
    .attr("transform", "translate(" + 5 + "," + margin_top + ")"); 

    //Then call the draw function with all the SVGs
    draw_menu(left_container_SVG,right_container_SVG);
})
.catch(function (error) {
    console.error(error);
});

function draw_menu(){

    left_container_SVG.append('text')
        .text("REACHES Historical Climate Data")
        .attr("font-size", "35px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 3)
        .attr("y", 40);

    var reaches_def = "The REACHES Historical Climate Data is a comprehensive dataset capturing climate-related variables and phenomena over a specified historical time period in China. This dataset encompasses a wide range of climatic factors, including temperature, precipitation, humidity, wind patterns, and atmospheric pressure, recorded across various geographical locations."
    writeParagraph(10,115,1700,reaches_def,25)

    var copyright = " © 2024. The REACHES Historical Climate Dataset is owned by Academia Sinica Institute of Geography, Taipei, Taiwan. All rights reserved."
    writeParagraph(10,300,1700,copyright,15)

    var HCDX = "Historical Climate Data Explorer or HCD-X is a tool we created to explore the REACHES dataset more easily. It includes a map, arc diagram, linechart and heatmap to assist user in exploring the data and gaining new important insights into the dataset."
    writeParagraph(10,450,1700,HCDX,25)

    left_container_SVG.append('text')
        .text("What is HCD-X?")
        .attr("font-size", "35px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 3)
        .attr("y", 400);

    right_container_SVG.append('text')
        .text("Events Definition")
        .attr("font-size", "30px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 3)
        .attr("y", 30);  

    drawIcon("Famine",0,"Famine represent data related to periods of extreme food scarcity or shortages in a particular region or time period. It include information on crop failures, famines, or other factors contributing to food insecurity.")
    drawIcon("Disease",1,"Disease represent data on the prevalence and spread of diseases related to climate conditions. It include information on diseases that are influenced by climate factors like temperature and precipitation.")
    drawIcon("Flood",2,"Flood represent data on flooding events, including their frequency, severity, and impact on communities and ecosystems. It include information on riverine flooding, flash floods, coastal flooding, and associated damages.")
    drawIcon("Rain",3,"Rain represent data on rainfall patterns, including total precipitation amounts, distribution over time, and seasonal variations. It include data on extreme rainfall events and their impacts, such as landslides or soil erosion.")
    drawIcon("Crop",4,"Crop represent data related to agricultural productivity and crop yields. It include information on crop types, planting and harvesting dates and yields per hectare.")
    drawIcon("Drought",5,"Drought represent data on drought events and their impacts on agriculture, water resources, and ecosystems. It include indices measuring drought severity and duration.")
    drawIcon("Thunder",6,"Thunder represent data on thunderstorm activity, including the frequency, intensity, and duration of thunderstorms. It include data on lightning strikes, hail events, and associated damages.")


}

function drawIcon(event_to_draw,i,text_to_write){
    right_container_SVG.append('rect')  
        .attr('width', 830)     
        .attr('height', 120)   
        .attr('x', 20)      
        .attr('y', 140*i + 65)
        .attr("fill",'none')  
        .attr("stroke", "black")  
        .attr("stroke-width", 2); 
    
    right_container_SVG.append('image')
        .attr('xlink:href', 'pictures/'+event_to_draw+'.png')  
        .attr('width', 100)      
        .attr('height', 100)    
        .attr('x', 50)      
        .attr('y', 140*i+75); 
    
    right_container_SVG.append('text')
        .text(event_to_draw)
        .attr("font-size", "40px")
        .attr("fill", "#403e3e")
        .attr("font-weight", "bold")
        .attr("x", 165)
        .attr("y", 140*i + 140); 

    const lineHeight = 1.2; // Line height multiplier
    const maxWidth =900; // Max width of the text block
    const x = 360; // X position
    let y = 140 * i+110; // Initial Y position

    const text = right_container_SVG.append('text')
        .attr("font-size", "15px")
        .attr("fill", "#403e3e")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "start"); // Align text to the start

    // Split text into lines
    const words = text_to_write.split(/\s+/);
    let line = '';
    words.forEach(word => {
        const testLine = line + ' ' + word;
        const testLength = testLine.length * 15; // Assuming font-size is 50px
        if (testLength > maxWidth) {
            text.append('tspan')
                .attr('x', x)
                .attr('y', y)
                .text(line);
            line = word;
            y += lineHeight * 15; // Increase Y position for the next line
        } else {
            line = testLine;
        }
    });
    // Add the last line
    text.append('tspan')
        .attr('x', x)
        .attr('y', y)
        .text(line);
}

function writeParagraph(x,y,maxWidth,text_to_write,size_font){
    const lineHeight = 1.2; // Line height multiplier

    const text = left_container_SVG.append('text')
        .attr("font-size", size_font+"px")
        .attr("fill", "#403e3e")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "start"); // Align text to the start

    // Split text into lines
    const words = text_to_write.split(/\s+/);
    let line = '';
    words.forEach(word => {
        const testLine = line + ' ' + word;
        const testLength = testLine.length * size_font; // Assuming font-size is 50px
        if (testLength > maxWidth) {
            text.append('tspan')
                .attr('x', x)
                .attr('y', y)
                .text(line);
            line = word;
            y += lineHeight * size_font; // Increase Y position for the next line
        } else {
            line = testLine;
        }
    });
    // Add the last line
    text.append('tspan')
        .attr('x', x)
        .attr('y', y)
        .text(line);
}