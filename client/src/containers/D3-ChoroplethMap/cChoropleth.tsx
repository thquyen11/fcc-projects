import * as React from "react";
import * as d3 from "d3";
import "./cChoropleth.scss";



export class Choropleth extends React.Component{
    constructor(props:any){
        super(props);
    }

    private drawChoropleth=()=>{

    }

    componentDidMount(){
        this.drawChoropleth();
    }

    render(){
        return(
            <div className="container" id="pagewrapper-choro">
                
            </div>
        )
    }

}