import React from "react";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const LineChart = ({ data }) => {
  let retailSalesArray = data.map((item) => {
    let moneyString = item.retailSales;
    let numericString = moneyString.replace(/[^0-9]/g, "");
    let numericValue = parseInt(numericString, 10) / 100;
    return numericValue;
  });

  let wholesaleSalesArray = data.map((item) => {
    let moneyString = item.wholesaleSales;
    let numericString = moneyString.replace(/[^0-9]/g, "");
    let numericValue = parseInt(numericString, 10) / 100;
    return numericValue;
  });

  console.log("retailSalesArray, ", retailSalesArray);
  //console.log(numericValue); // Output: 348123

  const [data1] = useState([...retailSalesArray]);
  const [data2] = useState([...wholesaleSalesArray]);
  const svgRef = useRef();
  useEffect(() => {
    const w = 1400;
    const h = 600;
    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%") 
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("background", "#FFFFFF");


    const xScale = d3.scaleLinear().domain([0, 53]).range([0, w]);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const yScale = d3.scaleLinear().domain([0, 1000000]).range([h, 0]);

    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
    // .curve(d3.curveCardinal);

    const xAxis = d3.axisBottom(xScale)
  .tickValues(d3.range(0, 54, 4)) 
  .tickFormat((d, i) => monthNames[i % 12]); 


    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);


    svg
      .selectAll(".line")
      .data([data1])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "#636e72")
      .attr("stroke-width", 3);

    svg
      .selectAll(".line")
      .data([data2])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "#74b9ff")
      .attr("stroke-width", 3);

    svg
      .append("text")
      .attr("x", w - 20)
      .attr("y", yScale(data1[data1.length - 1].value) - 20)
      .attr("dy", "2.5em")
      .style("text-anchor", "end")
      .style("fill", "#636e72")
      .text("Retail Sales");

    svg
      .append("text")
      .attr("x", w - 20)
      .attr("y", yScale(data2[data2.length - 1].value)) 
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .style("fill", "#74b9ff")
      .text("Whole Sales");


    /*
   svg.append("line")
  .attr("x1", w - 30)
  .attr("y1", yScale(data2[data2.length - 1].value)-10)
  .attr("x2", w)
  .attr("y2", yScale(data2[data2.length - 1].value))
  .style("stroke", "#74b9ff")
  .style("stroke-width", 2);*/
  }, []);
  return (
    <div>
      <svg ref={svgRef} style={{ marginLeft: "100px", marginBottom:"50px", 
      marginTop:"50px", display: "block" }}></svg>
    </div>
  );
};

export default LineChart;
