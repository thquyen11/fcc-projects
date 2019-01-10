import * as React from "react";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import QuoteMachine from "../QuoteMachine/cQuoteMachine";
import MarkdownPreviewer from "../MarkdownPreviewer/cMarkdownPreviewer";
import Calculator from "../Calculator/cCalculator";
import Drum from "../Drum/cDrum";
import {BarChart} from "../D3-BarChart/cBarChart";
import {ScatterPlot} from "../D3-ScatterPlot/cScatterPlot";
import {HeatMap} from "../D3-HeatMap/cHeatMap";
import { Choropleth } from 'containers/D3-ChoroplethMap/cChoropleth';
import { Navbar } from "../../components/Navbar/Navbar";
import { SignIn } from '../../components/Authenticate/SignIn';
// import { Register } from '../../components/Authenticate/Register';
import Clock from "../Clock/cClock";
import { TreeMap } from 'containers/D3-TreeMap/cTreeMap';
import { connect } from "react-redux";
import { onSignedIn, loadUser } from './aFCCProjects';


interface StateProps{
  isSignedIn: boolean;
  user: any;
}

const mapStateToProps = (state: any): StateProps => {
  return{
    isSignedIn: state.Authenticate.isSignedIn,
    user: state.Authenticate.user,
  }
}

interface DispatchProps{
  onSignedIn: typeof onSignedIn;
  loadUser: typeof loadUser;
}

const mapDispatchToProps = (dispatch:any): DispatchProps => {
  return{
    onSignedIn: ()=> dispatch(onSignedIn()),
    loadUser: (user:any)=> dispatch(loadUser(user))
  }
}

interface Props extends StateProps, DispatchProps{

}

class FCCProjects extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  //Check if user session already signin?
  componentDidMount(){
    const token:string = window.localStorage.getItem('token');
    if(token){
      fetch('/api/fcc-projects/signin', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then((resp:any)=> resp.json())
      .then((user:any)=> {
        if(user.status===200){
          this.props.loadUser(user);
          this.props.onSignedIn();
        }
      })
      .catch((err:any)=> console.log(err));
    }
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
      { id: "choro-map", name: "Choro Map", picture: "" },
      { id: "tree-map", name: "Tree Map", picture: "" },
    ];

    return (
      <BrowserRouter>
        <Switch>
          <div className="container">
            <Navbar isSignedIn={this.props.isSignedIn}/>
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
              <Route exact path="/fcc-projects/choro-map" component={Choropleth} />
              <Route exact path="/fcc-projects/tree-map" component={TreeMap} />
              <Route exact path='/fcc-projects/signin' render={()=> <SignIn isSignedIn={this.props.isSignedIn} onSignedIn={this.props.onSignedIn}/>} />
              {/* <Route exact path='/fcc-projects/register' render={()=> <Register isSignedIn={this.props.isSignedIn} />} /> */}
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FCCProjects);