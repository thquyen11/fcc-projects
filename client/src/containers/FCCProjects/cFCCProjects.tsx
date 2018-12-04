import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { QuoteMachine } from "../../containers/QuoteMachine/cQuoteMachine";


// const listProjects = [
//   { id: "quote-machine", name: "Quote Machine", picture: "" },
//   { id: "markdown-previewer", name: "Markdown Previewer", picture: "" },
//   { id: "drum-machine", name: "Drum Machine", picture: "" },
//   { id: "javascript-calculator", name: "Javascript Calculator", picture: "" },
//   { id: "pomodoro-clock", name: "Pomodoro Clock", picture: "" }
// ];

// const cardProjects = listProjects.map((project: any, index: number) => {
//   const linkTo = "/fcc-projects/" + project.id;
//   return (
//     <Link to={linkTo} key={index}>
//       <div className="card col-md-3 m-4" style={{ width: "18rem" }}>
//         <img
//           className="card-img-top"
//           src={project.picture}
//           alt="Card image cap"
//         />
//         <div className="card-body">
//           <h5 className="card-title">{project.name}</h5>
//         </div>
//       </div>
//     </Link>
//   );
// });

export class FCCProjects extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="container p-4">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={QuoteMachine} />
            {/* <Route exact path="/fcc-projects/quote-machine" component={QuoteMachine} /> */}
            {/* <Route path="/fcc-projects/markdown-previewer" component={MarkdownPreviewer} />
                            <Route path="/fcc-projects/drum-machine" component={DrumMachine} />
                            <Route path="/fcc-projects/javascript-calculator" component={JavascriptCalculator} />
                            <Route path="/fcc-projects/pomodoro-clock" component={PomodoroClock} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
