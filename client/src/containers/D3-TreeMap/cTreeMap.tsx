import * as React from "react";
import * as d3 from "d3";
import "./cTreeMap.scss";



export class TreeMap extends React.Component{
    constructor(props:any){
        super(props);
    }

    componentDidMount(){
        const width:number=800;
        const height:number=600;
        const margin:any={
            top: 20 as number,
            bottom: 40 as number,
            left: 40 as number,
            right: 20 as number,
        }

        const svg:any = d3.select("#visHolder").append("svg")
            .attr("width", width+margin.left + margin.right)
            .attr("height", height+margin.top + margin.bottom)
        
        const group:any = svg.append("g")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate("+margin.left+" "+margin.top+")")
        console.log(group);

        (async ()=>{
            try{
                const gameFile:any = await fetch('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json').then(resp=> resp.json());

                const treemap:any = d3.treemap()
                    .size([width, height])
                    .paddingInner(1);
            
                const root:any = d3.hierarchy(gameFile);
                treemap(root);
                console.log(treemap);
            }
            catch(err){
                console.log(err);
            }
        })()
    }

    render(){
        return(
            <div className="container" id="pagewrapper-treemap">
                <h2 id="title">Video Game Sales</h2>
                <h5 id="description">Top 100 Most Sold Video Games Grouped by Platform</h5>
                <div className="row" id="visHolder"></div>
            </div>
        )
    }
}