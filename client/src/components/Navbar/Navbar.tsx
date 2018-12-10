import * as React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";



export class Navbar extends React.Component{

    render(){
        return(
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark" id="navbar">
            <Link to="/"><a className="navbar-brand" href="">Home</a></Link>
            <ul className="navbar-nav">  
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">
                  FCC Projects
                </a>
                <div className="dropdown-menu">
                  <Link to="/fcc-projects/quote-machine"><a className="dropdown-item" href="">Random Quote Machine</a></Link>
                  <Link to="/fcc-projects/markdown-previewer"><a className="dropdown-item" href="">Markdown Previewer</a></Link>
                  <Link to="/fcc-projects/javascript-calculator"><a className="dropdown-item" href="">Calculator</a></Link>
                  <Link to="/fcc-projects/pomodoro-clock"><a className="dropdown-item" href="">Promodo Clock</a></Link>
                </div>
              </li>
            </ul>
          </nav>
        )
    }
}