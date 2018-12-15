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
                const w = 500;
                const h = 500;
                const padding=50;

                const arrayYear = dataset.map((data:any[],index:number)=> {
                    const date=new Date(data[0]);
                    return date.getTime();
                }).sort((a:number,b:number)=>(a-b));
                const minYear = arrayYear[0];
                const maxYear = arrayYear[arrayYear.length-1];
                const xScale = d3.scaleLinear().domain([minYear, maxYear]).range([padding, w-padding]);

                const arrayGDP = dataset.map((data:any[],index:number)=> data[1]).sort((a:number, b:number)=>(a-b));
                const minGDP = arrayGDP[0];
                const maxGDP = arrayGDP[arrayGDP.length-1];
                // const yScale = d3.scaleLinear().domain([minGDP, maxGDP]).range([padding, h-padding]);
                const yScale = d3.scaleLinear().domain([minGDP, maxGDP]).range([h-padding, padding]);

                const svg = d3.select("#page-wrapper-barchart").append("svg").attr("width", w).attr("height", h);
                svg.selectAll("rect").data(dataset).enter()
                    .append("rect").attr("x", d=> {
                        const date = new Date(d[0]);
                        console.log("xScale "+xScale(date.getTime()));
                        return xScale(date.getTime());
                    }).attr("y", d=> {
                        console.log("yScale "+yScale(d[1]));
                        return yScale(d[1])
                    }).attr("width", 25).attr("fill", "navy").attr("class", "bar");
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        //only load chart after components mounted to speed up page loading time
        this.drawChar();
    }

    render() {
        return (
            <div className="container mx-auto" id="page-wrapper-barchart"></div>
        )
    }
}