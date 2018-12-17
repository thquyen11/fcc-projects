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
                const rect_w = (w-2*padding)/dataset.length;

                //Scale X Y
                const arrayYear = dataset.map((data:any[],index:number)=> {
                    const date=new Date(data[0]);
                    return date.getTime();
                }).sort((a:number,b:number)=>(a-b));
                const minYear = arrayYear[0];
                const maxYear = arrayYear[arrayYear.length-1];
                const xScale = d3.scaleTime().domain([minYear, maxYear]).range([padding, w-padding]);

                const arrayGDP = dataset.map((data:any[],index:number)=> data[1]).sort((a:number, b:number)=>(a-b));
                const maxGDP = arrayGDP[arrayGDP.length-1];
                const yScale = d3.scaleLinear().domain([0, maxGDP]).range([h-padding, padding]);

                //tooltip
                const tooltip:any = document.createElement("div");
                        tooltip.setAttribute("id", "tooltip");
                        tooltip.setAttribute("class", "container");

                //Draw rect
                const svg = d3.select("#page-wrapper-barchart").append("svg").attr("width", w+"px").attr("height", h+"px").attr("class", "container mx-auto");
                svg.selectAll("rect").data(dataset).enter()
                    .append("rect")
                        .attr("x", (d:any)=> {
                            const date = new Date(d[0]);
                            return xScale(date.getTime());
                        }).attr("y", (d:any)=> {
                            return yScale(d[1])
                        }).attr("width", rect_w+"px")
                        .attr("height", (d:any) => h-padding - yScale(d[1]))
                        .attr("class", "bar")
                    .on("mouseover", (d:any, i:number)=>{
                        const yearmonth= d[0].slice(0,7);
                        const tooltipContent:string= `<div class="row justify-content-center">` + yearmonth +`</div><div class="row justify-content-center">$`+d[1]+ " Billions</div>";

                        tooltip.setAttribute("style", "position: absolute; visibility: visible; top: 350px; left: "+(i*rect_w+padding+70)+"px");
                        tooltip.innerHTML= tooltipContent;
                        
                        document.querySelector("#page-wrapper-barchart")!.appendChild(tooltip);
                    })
                    .on("mouseout", (d:any, i:number)=>{
                        tooltip.setAttribute("style", "visibility: hidden");
                    })
                
                //Title, axises
                svg.append("text").attr("x", w/3).attr("y", 50).attr("style", "font-size: 36px").text("UNITED STATES GDP");
                svg.append("text").attr("transform", "rotate(90deg)").attr("x", padding+10).attr("y", padding + 150).text("Gross Dosmetic Product");

                const xAxis: any = d3.axisBottom(xScale);
                const yAxis: any = d3.axisLeft(yScale);
                svg.append("g").call(xAxis).attr("id", "x-axis").attr("transform", "translate(0 "+(h-padding)+")");
                svg.append("g").call(yAxis).attr("id", "y-axis").attr('transform', "translate("+padding+", 0)");
                
                
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