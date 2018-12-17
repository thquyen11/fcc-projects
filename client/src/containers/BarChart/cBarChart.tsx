import * as React from "react";
import * as d3 from "d3";
import "./BarChart.scss";



export class BarChart extends React.Component {
    constructor(props: any) {
        super(props);
    }

    drawChar = () => {
        const dataAPI = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
        fetch(dataAPI)
            .then(resp => resp.json())
            .then(result => {
                const dataset = result.data;
                const w = 1000;
                const h = 500;
                const padding=50;

                //Scale X Y
                const arrayYear = dataset.map((data:any[],index:number)=> {
                    const date=new Date(data[0]);
                    return date.getTime();
                }).sort((a:number,b:number)=>(a-b));
                const minYear = arrayYear[0];
                const maxYear = arrayYear[arrayYear.length-1];
                // const xScale = d3.scaleLinear().domain([minYear, maxYear]).range([padding, w-padding]);
                const xScale = d3.scaleTime().domain([minYear, maxYear]).range([padding, w-padding]);

                const arrayGDP = dataset.map((data:any[],index:number)=> data[1]).sort((a:number, b:number)=>(a-b));
                // const minGDP = arrayGDP[0];
                const maxGDP = arrayGDP[arrayGDP.length-1];
                const yScale = d3.scaleLinear().domain([0, maxGDP]).range([h-padding, padding]);

                //Draw rect
                const svg = d3.select("#page-wrapper-barchart").append("svg").attr("width", w).attr("height", h).attr("class", "container mx-auto");
                svg.selectAll("rect").data(dataset).enter()
                    .append("rect")
                        .attr("x", d=> {
                            const date = new Date(d[0]);
                            return xScale(date.getTime());
                        }).attr("y", d=> {
                            return yScale(d[1])
                        }).attr("width", 5)
                        .attr("height", d=> h-padding - yScale(d[1]))
                        .attr("fill", "#33adff")
                        .attr("class", "bar")
                
                //Title, axises
                svg.append("text").attr("x", w/2).attr("y", 20).text("UNITED STATES GDP");
                svg.append("text").attr("x", padding+10).attr("y", padding + 150).text("Gross Dosmetic Product");

                const xAxis: any = d3.axisBottom(xScale);
                const yAxis: any = d3.axisLeft(yScale);
                svg.append("g").call(xAxis).attr("id", "x-axis").attr("transform", "translate(0 "+(h-padding)+")");
                svg.append("g").call(yAxis).attr("id", "y-axis").attr('transform', "translate("+padding+", 0)");
                
                //tooltip
                document.querySelector("svg")!.addEventListener("mouseover", (event)=>{
                    if(event.target.nodeName==="RECT"){
                        
                    }
                });
                   
               
                // d3.select("#page-wrapper-barchart").append("div")
                //     .attr("id","tooltip")
                //     .
                //     .html("<h3>tooltip</h3>")
                        
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        //only load chart after components mounted to speed up page loading time
        this.drawChar();
    }

    render() {
        return (
            <div className="container mx-auto" id="page-wrapper-barchart">
            </div>
        )
    }
}