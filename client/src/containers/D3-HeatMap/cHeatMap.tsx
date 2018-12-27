import * as React from "react";
import * as d3 from "d3";
import "./cHeatMap.scss";



export class HeatMap extends React.Component{
    constructor(props:any){
        super(props);
    }

    drawHeatMap=()=>{
        const width:number = 900;
        const height:number = 400;
        const margin:any={
            left: 100,
            right:20,
            top:40,
            bottom:100,
        }
        
        const svg = d3.select("#visHolder").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        const groupChart = svg.append("g")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate("+margin.left+" "+margin.top+")");

        const dataAPI:string = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
        fetch(dataAPI)
            .then(resp=> resp.json())
            .then(data => {
                const monthlyVariance = data.monthlyVariance;
                const minTemp:number = Math.min(...monthlyVariance.map((d:any)=> d.variance+data.baseTemperature));
                const maxTemp:number = Math.max(...monthlyVariance.map((d:any)=> d.variance+data.baseTemperature));

                const xScale = d3.scaleLinear()
                    .domain([Math.min(...monthlyVariance.map((d:any)=> d.year)), Math.max(...monthlyVariance.map((d:any)=>d.year))])
                    .range([0, width]);
                const xAxis:any = d3.axisBottom(xScale)
                    .tickValues(xScale.domain().filter((year:number)=> year%10===0))
                    .tickFormat((year:number)=> {
                        let date = new Date(0);
                        date.setUTCFullYear(year);
                        return date.getUTCFullYear.toString();
                    });

                const months:string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const yScale = d3.scaleBand()
                    .domain(months)
                    .range([0, height])
                const yAxis:any= d3.axisLeft(yScale);

                const barWidth:number = width/(monthlyVariance.length/12);
                const barHeight:number=height/12;

                const colorScheme:string[] = ["rgb(49, 54, 149)", "rgb(69, 117, 180)", "rgb(116, 173, 209)", "rgb(171, 217, 233)", "rgb(224, 243, 248)", "rgb(255, 255, 191)", "rgb(254, 224, 144)", "rgb(253, 174, 97)", "rgb(244, 109, 67)", "rgb(215, 48, 39)", "rgb(165, 0, 38)"];
                const colorScale:any = d3.scaleQuantize<string>()
                    .domain([minTemp, maxTemp])
                    .range(colorScheme);

                const tooltip:any = d3.select("body").append("div")
                    .attr("id", "tooltip")
                    .attr("class", "container text-center")
                    .style("visibility", "hidden")
                    .style("position", "absolute")
                    .style("opacity", "0.7")

                groupChart.selectAll("rect").data(monthlyVariance).enter()
                    .append("rect")
                        .attr("class", "cell")
                        .attr("data-month", (d:any)=> d.month)
                        .attr("data-year", (d:any)=> d.year)
                        .attr("data-temp", (d:any)=> d.variance)
                        .attr("x", (d:any)=> xScale(d.year))
                        .attr("y", (d:any)=> yScale(months[d.month-1]))
                        .attr("width", barWidth)
                        .attr("height", barHeight)
                        .style("fill", (d:any)=>{
                            return colorScale(d.variance+data.baseTemperature);
                        })
                        .on("mouseover", (d:any)=>{
                            tooltip
                                .attr("data-year", d.year)
                                .style("left", (d3.event.pageX)+"px")
                                .style("top", (d3.event.pageY-barHeight*3)+"px")
                                .html("Year "+d.year+" - Month "+d.month+"</br>"+ Math.round((data.baseTemperature+d.variance)*100)/100 +"oC"+"</br>"+ Math.round((data.baseTemperature-d.variance)*100)/100+"oC")
                                .style("visibility", "visible")
                        })
                        .on("mouseout", ()=>{
                            tooltip
                                .style("visibility", "hidden")
                        })

                groupChart.append("g")
                    .call(xAxis.ticks(20))
                    .attr("id", "x-axis")
                    .attr("transform", "translate(0 "+height+")")
                
                groupChart.append("g")
                    .call(yAxis)
                    .attr("id", "y-axis")

                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", margin.left/3)
                    .attr("x", -(margin.top+height/2))
                    .text("Months")
                
                svg.append("text")
                    .attr("x", margin.left + width/2)
                    .attr("y", margin.top + height + margin.bottom/2)
                    .text("Years")
                
                // Color Legend
                const groupLegend = svg.append("g")
                    .attr("id", "legend")
                    .attr("transform", "translate("+ margin.left+" "+(margin.top+height+margin.bottom/2)+")")

                const legendWidth:number = 300;
                const colorbrew:string[]=['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'];
                const legendRectWidth:number = legendWidth/colorbrew.length;

                const array:number[]=[];
                for(let i=minTemp; i<=maxTemp; i+= (maxTemp-minTemp)/(colorbrew.length)){
                    array.push(i);
                }

                const xScaleLegend:any = d3.scaleLinear()
                    .domain([minTemp, maxTemp])
                    .range([0, legendWidth])
                    
                const xAxisLegend:any = d3.axisBottom(xScaleLegend).tickValues(array).tickFormat(d3.format(".1f"));

                groupLegend.append("g")
                    .attr("transform", "translate("+legendRectWidth+" "+legendRectWidth+")")
                    .call(xAxisLegend)
                
                const scaleLegendColor:any = d3.scaleThreshold<number,string>()
                    .domain(array)
                    .range(colorbrew.reverse())

                groupLegend.selectAll("rect").data(array).enter()
                    .append("rect")
                        .attr("class", "bar")
                        .attr("x", (color:any,index:number)=> index*legendRectWidth)
                        .attr("y", 0)
                        .attr("color", (d:any)=> d)
                        .style("width", legendRectWidth)
                        .style("height", legendRectWidth)
                        .style("fill", (color:any)=> scaleLegendColor(color))

            })
        
    }

    componentDidMount(){
        this.drawHeatMap();
    }

    render(){
        return(
            <div className="container text-center" id="pagewrapper-heatmap">
                <h3 id="title">Monthly Global Land-Surface Temperature</h3>
                <h5 id="description">1753 - 2015: base temperature 8.66℃</h5>
                <div className="row justify-content-center" id="visHolder"></div>
            </div>
        )
    }
}