;(function () {
    const margin = { top: 20, right: 50, bottom: 50, left: 90 }

    const width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    let dots;
    let label;

    const svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const xPositionScale = d3.scaleLinear().domain([40000, 160000]).range([0, width]); // Adjusted for income range
    const yPositionScale = d3.scaleLinear().domain([0, 320000]).range([height, 0]); // Adjusted for max crimes

    var url = "data.json"; // Update this to the path where your data is stored
    
    d3.json(url)
    .then(ready)
    .catch(function (error) {
      console.log("Failed with", error);
    });

    var counties = []
    function ready(datapoints) {
    console.log("Data is", datapoints);

    counties = datapoints; // Assuming data is an array of objects directly

    const yAxis = d3.axisLeft(yPositionScale);
    svg.append("g").attr("class", "axis y-axis").call(yAxis);

    const xAxis = d3.axisBottom(xPositionScale);
    svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", width - 300)
    .attr("y", height + 50)
    .text("Median Household Income")
    .style("font-size", "18px");

    svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", "20px")
    .attr("transform", "rotate(-90)")
    .text("Total Crimes")
    .style("font-size", "18px");

    label = svg.append('text')
    .text("Merced")
    .attr('x', xPositionScale(56772)) // Income
    .attr('y', yPositionScale(18070)) // Crime
    .attr('class', 'label hidden');

    label_2 = svg.append('text')
    .text("Los Angeles")
    .attr('x', xPositionScale(77411))
    .attr('y', yPositionScale(286302))
    .attr('class', 'label hidden');

    label_3 = svg.append('text')
    .text("San Joaquin")
    .attr('x', xPositionScale(83837))
    .attr('y', yPositionScale(30057))
    .attr('class', 'label hidden');

    label_4 = svg.append('text')
    .text("Fresno")
    .attr('x', xPositionScale(63756))
    .attr('y', yPositionScale(45954))
    .attr('class', 'label hidden');
    
    label_5 = svg.append('text')
    .text("Stanislaus")
    .attr('x', xPositionScale(69072))
    .attr('y', yPositionScale(23457))
    .attr('class', 'label hidden');


    // // Adding circles for counties
    // svg.selectAll("circle")
    // .data(counties)
    // .enter()
    // .append("circle")
    // .attr("cx", (d) => xPositionScale(d.TotalCrimes))
    // .attr("cy", (d) => yPositionScale(d.MedianIncome))
    // .attr("r", 5)
    // .attr("fill", "#4F5D75")
    // .attr("opacity", 0.75);

   }

    // Scroll-triggered updates should be implemented based on your webpage setup
    // Example scrolling logic is not included here as it requires specific webpage setup

 // Do stuff to the chart here
// Depending on what step you are at
const updateChart = (step_index, direction) => {
    console.log('We are at step', step_index);

    // Example assumes you've added ids or a way to select specific county circles
    if (step_index === 0) {
        if (direction === 'forward') {
            svg.selectAll("circle")
               .data(counties)
               .enter()
               .append("circle")
               .attr('id', (d, i) => 'circle-' + i)
               .attr("cx", (d) => xPositionScale(d.MedianIncome))
               .attr("cy", (d) => yPositionScale(d.TotalCrimes))
               .attr("fill", "#4F5D75")
               .attr("opacity", 0.5)
               .attr("r", 0)
               .transition()
               .duration(2000)
               .ease(d3.easeElastic)
               .attr("r", 8);
        } else {
            svg.selectAll("circle")
               .transition()
               .duration(500)
               .attr("r", 8)
               .attr("fill", "#4F5D75")
               .attr("opacity", 0.5);
        }
    }

    // Los Angeles County
    if (step_index === 1) {
        if (direction === 'forward') {
            d3.select('#circle-1') // Assuming Merced is id 0, adjust as necessary
               .raise()
               .transition()
               .duration(500)
               .style("fill", "#d34727")
               .style("opacity", 1)
               .attr("r", 10);
        } else {
            d3.select('#circle-1')
               .transition()
               .duration(500)
               .style("fill", "#4F5D75")
               .style("opacity", 0.5)
               .attr("r", 8);
            label_2.classed('hidden', true)
            label_2.classed('hidden', true)
            label_3.classed('hidden', true)
            label_4.classed('hidden', true)
            label_5.classed('hidden', true);
        }
    }

    // San Joaquin County
    if (step_index === 2) {
        if (direction === 'forward') {
            d3.select('#circle-37')
               .raise()
               .transition()
               .duration(500)
               .style("fill", "#f2b221")
               .style("opacity", 1)
               .attr("r", 10);
        } else {
            d3.select('#circle-37')
               .transition()
               .duration(500)
               .style("fill", "#4F5D75")
               .style("opacity", 0.5)
               .attr("r", 8);
            label.classed('hidden', true)
            label_2.classed('hidden', true)
            label_3.classed('hidden', true)
            label_4.classed('hidden', true)
            label_5.classed('hidden', true);
        }
    }

    // Fresno County
    if (step_index === 3) {
        if (direction === 'forward') {
            d3.select('#circle-11')
               .raise()
               .transition()
               .duration(500)
               .style("fill", "#0b4874")
               .style("opacity", 1)
               .attr("r", 10);
        } else {
            d3.select('#circle-11')
               .transition()
               .duration(500)
               .style("fill", "#4F5D75")
               .style("opacity", 0.5)
               .attr("r", 8);
            label.classed('hidden', true)
            label_2.classed('hidden', true)
            label_3.classed('hidden', true)
            label_4.classed('hidden', true)
            label_5.classed('hidden', true);
        }
    }

      // Stanislaus County
      if (step_index === 4) {
        if (direction === 'forward') {
            d3.select('#circle-48')
               .raise()
               .transition()
               .duration(500)
               .style("fill", "#4C642C")
               .style("opacity", 1)
               .attr("r", 10);
        } else {
            d3.select('#circle-48')
               .transition()
               .duration(500)
               .style("fill", "#4F5D75")
               .style("opacity", 0.5)
               .attr("r", 8);
            label.classed('hidden', true)
            label_2.classed('hidden', true)
            label_3.classed('hidden', true)
            label_4.classed('hidden', true)
            label_5.classed('hidden', true);
        }
    }

        // Merced County
        if (step_index === 5) {
            if (direction === 'forward') {
                d3.select('#circle-0')
                   .raise()
                   .transition()
                   .duration(500)
                   .style("fill", "#239199")
                   .style("opacity", 1)
                   .attr("r", 10);
            } else {
                d3.select('#circle-0')
                   .transition()
                   .duration(500)
                   .style("fill", "#4F5D75")
                   .style("opacity", 0.5)
                   .attr("r", 8);
                label.classed('hidden', true)
                label_2.classed('hidden', true)
                label_3.classed('hidden', true)
                label_4.classed('hidden', true)
                label_5.classed('hidden', true);
            }
        }


        // Conclusion
    if (step_index === 6) {
        if (direction === 'forward') {
            label.classed('hidden', false)
            label_2.classed('hidden', false)
            label_3.classed('hidden', false)
            label_4.classed('hidden', false)
            label_5.classed('hidden', false);
        } else {
            label.classed('hidden', true)
            label_2.classed('hidden', true)
            label_3.classed('hidden', true)
            label_4.classed('hidden', true)
            label_5.classed('hidden', true);
        }
    }

};

// Select the steps
let steps = d3.selectAll('.step');

enterView({
    selector: steps.nodes(),
    offset: 0.2,
    enter: el => {
        const index = +d3.select(el).attr('data-index');
        updateChart(index, 'forward');
    },
    exit: el => {
        let index = +d3.select(el).attr('data-index');
        index = Math.max(0, index - 1);
        updateChart(index, 'back');
    }
});





})()
