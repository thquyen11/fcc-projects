import * as React from "react";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import QuoteMachine from "../QuoteMachine/cQuoteMachine";
import MarkdownPreviewer from "../MarkdownPreviewer/cMarkdownPreviewer";
import Calculator from "../Calculator/cCalculator";
import Drum from "../Drum/cDrum";
import {BarChart} from "../D3-BarChart/cBarChart";
import {ScatterPlot} from "../D3-ScatterPlot/cScatterPlot";
import {HeatMap} from "../D3-HeatMap/cHeatMap";
import { Navbar } from "../../components/Navbar/Navbar";
import Clock from "../Clock/cClock";



export class FCCProjects extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const listProjects = [
      { id: "quote-machine", name: "Quote Machine", picture: "" },
      { id: "markdown-previewer", name: "Markdown Previewer", picture: "" },
      { id: "drum-machine", name: "Drum Machine", picture: "" },
      { id: "javascript-calculator", name: "Javascript Calculator", picture: "" },
      { id: "pomodoro-clock", name: "Pomodoro Clock", picture: "" },
      { id: "bar-chart", name: "Bar Chart", picture: "" },
      { id: "scatter-plot", name: "Scatter Plot", picture: "" },
      { id: "heat-map", name: "Heat Map", picture: "" },
    ];

    return (
      <BrowserRouter>
        <Switch>
          <div className="container">
            <Navbar/>
            <div className="row justify-content-center">
              <Route exact path="/" render={() => listProjects.map((project: any, index: number) => {
                  const linkTo = "/fcc-projects/" + project.id;
                  return (
                    <Link to={linkTo} key={index}>
                      <div className="card col-sx-4" style={{ width: "10rem", margin: "2rem 1rem" }}>
                        <img className="card-img-top" src={project.picture} alt="Card image cap"/>
                        <div className="card-body">
                          <h5 className="card-title">{project.name}</h5>
                        </div>
                      </div>
                    </Link>)}
                  )} />
            </div>
            <div className="container">
              <Route exact path="/fcc-projects/quote-machine" component={(QuoteMachine)} />
              <Route exact path="/fcc-projects/markdown-previewer" component={MarkdownPreviewer} />
              <Route exact path="/fcc-projects/drum-machine" component={Drum} />
              <Route exact path="/fcc-projects/javascript-calculator" component={Calculator} />
              <Route exact path="/fcc-projects/pomodoro-clock" component={Clock} />
              <Route exact path="/fcc-projects/bar-chart" component={BarChart} />
              <Route exact path="/fcc-projects/scatter-plot" component={ScatterPlot} />
              <Route exact path="/fcc-projects/heat-map" component={HeatMap} />
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    )
  }
}
